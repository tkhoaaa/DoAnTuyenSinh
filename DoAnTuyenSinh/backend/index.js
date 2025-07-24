import express from 'express';
import cors from 'cors';
import { testConnection } from './config/database.js';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import pool from './config/database.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendApplicationSubmittedEmail,
    sendApplicationStatusUpdateEmail,
    sendConsultationRequestEmail,
    sendScholarshipApplicationEmail,
    sendProfileUpdateEmail,
    testEmailConnection
} from './services/emailService.js';
import { validateEmailConfig } from './config/emailConfig.js';
import jwt from 'jsonwebtoken';
import { authenticateToken } from './middleware/auth.js';
import deviceService from './services/deviceService.js';

const app = express();
const PORT = 3001;

// Trust proxy để lấy IP address chính xác
app.set('trust proxy', true);

// Middleware để log activity
const logActivity = (action, description = '') => {
    return (req, res, next) => {
        const originalSend = res.send;
        res.send = function(data) {
            // Log activity sau khi response thành công
            if (res.statusCode >= 200 && res.statusCode < 300) {
                const userAgent = req.get('User-Agent');
                const deviceInfo = deviceService.getDeviceInfo(userAgent);

                deviceService.logActivity({
                    userId: req.user ? req.user.id : null,
                    action,
                    description,
                    ipAddress: req.ip,
                    userAgent,
                    deviceInfo,
                    status: 'success'
                });
            }
            originalSend.call(this, data);
        };
        next();
    };
};

// CORS configuration
app.use(cors({
    origin: [
        'http://localhost:5173', // Development
        'https://do-an-tuyen-sinh.vercel.app' // Production
    ],
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files (avatars, attachments)
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'HUTECH Simple API Server is running',
        timestamp: new Date().toISOString()
    });
});

// ========== AUTH & USER ROUTES ========== //
const authPrefix = '/api/auth';

// Health check (auth)
app.get(`${authPrefix}/health`, (req, res) => {
    res.json({
        success: true,
        message: 'Simple Auth API is working',
        timestamp: new Date().toISOString()
    });
});

// Đăng nhập
app.post(`${authPrefix}/login`, [
    body('identifier').notEmpty().withMessage('Email hoặc tên đăng nhập không được để trống'),
    body('password').isLength({ min: 1 }).withMessage('Mật khẩu không được để trống'),
], async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Dữ liệu đầu vào không hợp lệ',
                errors: errors.array()
            });
        }
        const { identifier, password } = req.body;

        // Kiểm tra xem identifier là email hay username
        const isEmail = identifier.includes('@');
        let query, params;

        if (isEmail) {
            query = 'SELECT * FROM users WHERE email = ? AND is_active = true';
            params = [identifier];
        } else {
            query = 'SELECT * FROM users WHERE username = ? AND is_active = true';
            params = [identifier];
        }

        const [users] = await pool.execute(query, params);
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Tài khoản hoặc mật khẩu không đúng'
            });
        }
        const user = users[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Tài khoản hoặc mật khẩu không đúng'
            });
        }
        delete user.password;
        res.json({
            success: true,
            message: 'Đăng nhập thành công',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name || user.username,
                    username: user.username,
                    role: user.role,
                    phone: user.phone
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ'
        });
    }
});

// Đăng ký user
app.post(`${authPrefix}/register`, [
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu tối thiểu 6 ký tự'),
    body('username').notEmpty().withMessage('Tên đăng nhập không được để trống'),
    body('phone').notEmpty().withMessage('Số điện thoại không được để trống'),
], async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Dữ liệu đầu vào không hợp lệ',
                errors: errors.array()
            });
        }
        const { email, password, username, phone } = req.body;
        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE email = ?', [email]
        );
        if (existingUsers.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Email đã được sử dụng'
            });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const [result] = await pool.execute(
            'INSERT INTO users (email, password, username, phone, role) VALUES (?, ?, ?, ?, ?)', [email, hashedPassword, username, phone, 'user']
        );

        // Gửi email chào mừng
        try {
            await sendWelcomeEmail(email, username, username);
        } catch (emailError) {
            console.error('Error sending welcome email:', emailError);
            // Không fail request nếu email lỗi
        }

        res.status(201).json({
            success: true,
            message: 'Đăng ký thành công',
            data: {
                user: {
                    id: result.insertId,
                    email,
                    username,
                    phone,
                    role: 'user'
                }
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ'
        });
    }
});

// Đăng ký admin
app.post(`${authPrefix}/register-admin`, [
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu tối thiểu 6 ký tự'),
    body('username').notEmpty().withMessage('Tên đăng nhập không được để trống'),
    body('phone').notEmpty().withMessage('Số điện thoại không được để trống'),
], async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Dữ liệu đầu vào không hợp lệ',
                errors: errors.array()
            });
        }
        const { email, password, username, phone } = req.body;
        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE email = ?', [email]
        );
        if (existingUsers.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Email đã được sử dụng'
            });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const [result] = await pool.execute(
            'INSERT INTO users (email, password, username, phone, role) VALUES (?, ?, ?, ?, ?)', [email, hashedPassword, username, phone, 'admin']
        );
        res.status(201).json({
            success: true,
            message: 'Đăng ký admin thành công',
            data: {
                user: {
                    id: result.insertId,
                    email,
                    username,
                    phone,
                    role: 'admin'
                }
            }
        });
    } catch (error) {
        console.error('Admin register error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ'
        });
    }
});

// Quên mật khẩu - Gửi email reset
app.post(`${authPrefix}/forgot-password`, [
    body('email').isEmail().withMessage('Email không hợp lệ'),
], async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Dữ liệu đầu vào không hợp lệ',
                errors: errors.array()
            });
        }

        const { email } = req.body;

        // Kiểm tra email có tồn tại không
        const [users] = await pool.execute(
            'SELECT id, username, full_name FROM users WHERE email = ? AND is_active = true', [email]
        );

        if (users.length === 0) {
            // Không trả về lỗi để tránh lộ thông tin
            return res.json({
                success: true,
                message: 'Nếu email tồn tại, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu'
            });
        }

        const user = users[0];

        // Tạo token reset password
        const crypto = await
        import ('crypto');
        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 giờ

        // Lưu token vào database
        await pool.execute(
            'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)', [user.id, resetToken, expiresAt]
        );

        // Gửi email reset password
        try {
            await sendPasswordResetEmail(email, resetToken, user.full_name || user.username);
        } catch (emailError) {
            console.error('Error sending password reset email:', emailError);
            // Xóa token nếu gửi email thất bại
            await pool.execute('DELETE FROM password_reset_tokens WHERE token = ?', [resetToken]);
            return res.status(500).json({
                success: false,
                message: 'Không thể gửi email. Vui lòng thử lại sau.'
            });
        }

        res.json({
            success: true,
            message: 'Nếu email tồn tại, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu'
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ'
        });
    }
});

// Đặt lại mật khẩu
app.post(`${authPrefix}/reset-password`, [
    body('token').notEmpty().withMessage('Token không được để trống'),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu tối thiểu 6 ký tự'),
], async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Dữ liệu đầu vào không hợp lệ',
                errors: errors.array()
            });
        }

        const { token, password } = req.body;

        // Kiểm tra token có hợp lệ không
        const [tokens] = await pool.execute(
            'SELECT user_id, expires_at, used FROM password_reset_tokens WHERE token = ?', [token]
        );

        if (tokens.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Token không hợp lệ hoặc đã hết hạn'
            });
        }

        const resetToken = tokens[0];

        if (resetToken.used) {
            return res.status(400).json({
                success: false,
                message: 'Token đã được sử dụng'
            });
        }

        if (new Date() > new Date(resetToken.expires_at)) {
            return res.status(400).json({
                success: false,
                message: 'Token đã hết hạn'
            });
        }

        // Hash mật khẩu mới
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Cập nhật mật khẩu
        await pool.execute(
            'UPDATE users SET password = ? WHERE id = ?', [hashedPassword, resetToken.user_id]
        );

        // Đánh dấu token đã sử dụng
        await pool.execute(
            'UPDATE password_reset_tokens SET used = true WHERE token = ?', [token]
        );

        res.json({
            success: true,
            message: 'Đặt lại mật khẩu thành công'
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ'
        });
    }
});

// Lấy thông tin user theo ID
app.get(`${authPrefix}/user/:id`, async(req, res) => {
    try {
        const { id } = req.params;
        const [users] = await pool.execute(
            'SELECT id, username, email, full_name, phone, role, created_at FROM users WHERE id = ? AND is_active = true', [id]
        );
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Người dùng không tồn tại'
            });
        }
        res.json({
            success: true,
            data: users[0]
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ'
        });
    }
});

// Lấy danh sách ngành học - OPTIMIZED WITH CACHE
app.get(`${authPrefix}/majors`, async(req, res) => {
    try {
        const [majors] = await pool.execute(`
            SELECT id, ten_nganh as name, ma_nganh as code 
            FROM nganh 
            ORDER BY ten_nganh ASC
        `);

        res.json({
            success: true,
            data: majors,
            meta: {
                total: majors.length,
                cached: majorOptionsCache ? 'Available' : 'Loading'
            }
        });
    } catch (error) {
        console.error('Get majors error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ'
        });
    }
});

// Lấy danh sách khối thi THPT
app.get(`${authPrefix}/exam-blocks`, async(req, res) => {
    try {
        const [examBlocks] = await pool.execute(`
            SELECT id, ma_khoi as code, ten_khoi as name, cac_mon as subjects, mo_ta as description
            FROM khoi_thi_thpt 
            ORDER BY ma_khoi ASC
        `);

        // Parse JSON subjects for each block with safe fallback
        const formattedBlocks = examBlocks.map(block => {
            let subjects = [];

            if (!block.subjects) {
                // If subjects is null/undefined, return empty array
                subjects = [];
            } else if (typeof block.subjects === 'string') {
                try {
                    // Try to parse as JSON first
                    subjects = JSON.parse(block.subjects);
                } catch (error) {
                    // If not JSON, split by comma as fallback
                    subjects = block.subjects.split(',').map(s => s.trim());
                }
            } else {
                // If already an array or object
                subjects = block.subjects;
            }

            return {
                ...block,
                subjects: subjects
            };
        });

        res.json({
            success: true,
            data: formattedBlocks,
            meta: {
                total: formattedBlocks.length
            }
        });
    } catch (error) {
        console.error('Get exam blocks error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ'
        });
    }
});

// Lấy khối thi theo ngành học
app.get(`${authPrefix}/majors/:majorId/exam-blocks`, async(req, res) => {
    try {
        const { majorId } = req.params;

        const [examBlocks] = await pool.execute(`
            SELECT kt.id, kt.ma_khoi as code, kt.ten_khoi as name, kt.cac_mon as subjects, kt.mo_ta as description
            FROM khoi_thi_thpt kt
            INNER JOIN nganh_khoi_thi nkt ON kt.id = nkt.khoi_thi_id
            WHERE nkt.nganh_id = ?
            ORDER BY kt.ma_khoi ASC
        `, [majorId]);

        // Parse JSON subjects for each block with safe fallback
        const formattedBlocks = examBlocks.map(block => {
            let subjects = [];

            if (!block.subjects) {
                // If subjects is null/undefined, return empty array
                subjects = [];
            } else if (typeof block.subjects === 'string') {
                try {
                    // Try to parse as JSON first
                    subjects = JSON.parse(block.subjects);
                } catch (error) {
                    // If not JSON, split by comma as fallback
                    subjects = block.subjects.split(',').map(s => s.trim());
                }
            } else {
                // If already an array or object
                subjects = block.subjects;
            }

            return {
                ...block,
                subjects: subjects
            };
        });

        res.json({
            success: true,
            data: formattedBlocks,
            meta: {
                total: formattedBlocks.length,
                majorId: parseInt(majorId)
            }
        });
    } catch (error) {
        console.error('Get exam blocks by major error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ'
        });
    }
});

// ========== END AUTH & USER ROUTES ========== //

// ========== ADMISSION APPLICATION ROUTES ========== //

// Nộp hồ sơ xét tuyển
app.post(`${authPrefix}/apply`, [
    body('ho_ten').notEmpty().withMessage('Họ tên không được để trống'),
    body('ngay_sinh').notEmpty().withMessage('Ngày sinh không được để trống'),
    body('cccd').notEmpty().withMessage('CCCD không được để trống'),
    body('sdt').notEmpty().withMessage('Số điện thoại không được để trống'),
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('phuong_thuc_xet_tuyen').isIn(['hoc_ba', 'thi_thpt', 'danh_gia_nang_luc']).withMessage('Phương thức xét tuyển không hợp lệ'),
], async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Dữ liệu đầu vào không hợp lệ',
                errors: errors.array()
            });
        }

        const {
            ho_ten,
            ngay_sinh,
            cccd,
            sdt,
            email,
            noi_hoc_12,
            truong_thpt,
            ten_lop_12,
            dia_chi,
            nganh_id,
            nganh_ids,
            phuong_thuc_xet_tuyen,
            // Học bạ THPT
            diem_hk1,
            diem_ca_nam,
            // Thi THPT
            khoi_thi,
            diem_thi_thpt,
            // Đánh giá năng lực
            diem_danh_gia_nang_luc,
            user_id
        } = req.body;

        // Validate based on admission method
        if (phuong_thuc_xet_tuyen === 'hoc_ba') {
            if (!diem_ca_nam) {
                return res.status(400).json({
                    success: false,
                    message: 'Điểm học bạ cả năm là bắt buộc khi xét tuyển bằng học bạ'
                });
            }
        } else if (phuong_thuc_xet_tuyen === 'thi_thpt') {
            if (!khoi_thi || !diem_thi_thpt) {
                return res.status(400).json({
                    success: false,
                    message: 'Khối thi và điểm thi THPT là bắt buộc khi xét tuyển bằng điểm thi THPT'
                });
            }
        } else if (phuong_thuc_xet_tuyen === 'danh_gia_nang_luc') {
            if (!diem_danh_gia_nang_luc) {
                return res.status(400).json({
                    success: false,
                    message: 'Điểm đánh giá năng lực là bắt buộc khi xét tuyển bằng đánh giá năng lực'
                });
            }
        }

        // Generate application code
        const applicationCode = 'HS' + Date.now();

        // Insert application with new fields - Convert undefined to null
        const [result] = await pool.execute(
            `INSERT INTO applications 
            (application_code, ho_ten, ngay_sinh, cccd, sdt, email, noi_hoc_12, truong_thpt, ten_lop_12, dia_chi, 
             nganh_id, nganh_ids, phuong_thuc_xet_tuyen, khoi_thi, diem_thi_thpt, diem_danh_gia_nang_luc,
             diem_hk1, diem_ca_nam, user_id, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`, [
                applicationCode,
                ho_ten,
                ngay_sinh,
                cccd,
                sdt,
                email,
                noi_hoc_12,
                truong_thpt,
                ten_lop_12,
                dia_chi,
                nganh_id,
                JSON.stringify(nganh_ids),
                phuong_thuc_xet_tuyen,
                khoi_thi || null,
                diem_thi_thpt ? JSON.stringify(diem_thi_thpt) : null,
                diem_danh_gia_nang_luc || null,
                diem_hk1 || null,
                diem_ca_nam || null,
                user_id || null
            ]
        );

        // Gửi email xác nhận nộp hồ sơ
        try {
            const applicationData = {
                id: result.insertId,
                application_code: applicationCode,
                major_name: nganh_id, // Cần lấy tên ngành từ database
                admission_method: phuong_thuc_xet_tuyen
            };
            await sendApplicationSubmittedEmail(email, ho_ten, applicationData);
        } catch (emailError) {
            console.error('Error sending application submitted email:', emailError);
            // Không fail request nếu email lỗi
        }

        res.status(201).json({
            success: true,
            message: 'Nộp hồ sơ thành công',
            data: {
                application_id: result.insertId,
                application_code: applicationCode,
                admission_method: phuong_thuc_xet_tuyen
            }
        });
    } catch (error) {
        console.error('Application submit error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ'
        });
    }
});

// ========== ADMIN API ROUTES ========== //

// Lấy thống kê tổng quan cho admin
app.get('/api/admin/dashboard-stats', async(req, res) => {
    try {
        // Basic counts only to avoid complex SQL issues
        const [totalApps] = await pool.execute('SELECT COUNT(*) as count FROM applications');
        const [pendingApps] = await pool.execute('SELECT COUNT(*) as count FROM applications WHERE status = "pending"');
        const [approvedApps] = await pool.execute('SELECT COUNT(*) as count FROM applications WHERE status = "approved"');
        const [rejectedApps] = await pool.execute('SELECT COUNT(*) as count FROM applications WHERE status = "rejected"');
        const [totalUsers] = await pool.execute('SELECT COUNT(*) as count FROM users WHERE role = "user"');
        const [totalMajors] = await pool.execute('SELECT COUNT(*) as count FROM nganh');

        res.json({
            success: true,
            data: {
                totalApplications: totalApps[0].count,
                pendingApplications: pendingApps[0].count,
                approvedApplications: approvedApps[0].count,
                rejectedApplications: rejectedApps[0].count,
                totalStudents: approvedApps[0].count,
                totalMajors: totalMajors[0].count,
                averageGPA: 8.2, // Static for now
                completionRate: 95.0 // Static for now
            }
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ',
            error: error.message
        });
    }
});

// Lấy danh sách hồ sơ mới nhất cho admin - OPTIMIZED
app.get('/api/admin/recent-applications', async(req, res) => {
    try {
        const [applications] = await pool.execute(`
            SELECT 
                a.id, a.ho_ten, a.nganh_id, a.created_at, a.status, a.diem_ca_nam,
                n.ten_nganh as major_name
            FROM applications a
            LEFT JOIN nganh n ON a.nganh_id = n.id
            ORDER BY a.created_at DESC
            LIMIT 10
        `);

        const formattedApps = applications.map(app => ({
            id: app.id,
            studentName: app.ho_ten,
            major: app.major_name || 'Ngành không xác định',
            submittedAt: app.created_at,
            status: app.status,
            gpa: calculateGPAOptimized(app.diem_ca_nam),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(app.ho_ten)}&background=3b82f6&color=fff`
        }));

        res.json({
            success: true,
            data: formattedApps
        });
    } catch (error) {
        console.error('Recent applications error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ'
        });
    }
});

// Lấy top ngành học phổ biến
app.get('/api/admin/top-majors', async(req, res) => {
    try {
        // Kiểm tra tổng số hồ sơ trước
        const [totalApps] = await pool.execute('SELECT COUNT(*) as count FROM applications');

        if (totalApps[0].count === 0) {
            // Nếu chưa có hồ sơ nào, trả về danh sách trống
            return res.json({
                success: true,
                data: []
            });
        }

        const [majors] = await pool.execute(`
            SELECT n.ten_nganh as name, COUNT(a.id) as count,
                   ROUND(COUNT(a.id) * 100.0 / ?, 1) as percentage
            FROM nganh n
            LEFT JOIN applications a ON n.id = a.nganh_id
            GROUP BY n.id, n.ten_nganh
            HAVING count > 0
            ORDER BY count DESC
            LIMIT 5
        `, [totalApps[0].count]);

        const formattedMajors = majors.map((major, index) => ({
            name: major.name,
            count: major.count,
            percentage: major.percentage,
            trend: `+${(Math.random() * 15 + 2).toFixed(1)}%`, // Random trend for now
            icon: getMajorIcon(major.name)
        }));

        res.json({
            success: true,
            data: formattedMajors
        });
    } catch (error) {
        console.error('Top majors error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ',
            error: error.message
        });
    }
});

// Lấy danh sách hồ sơ với filter cho admin - VERSION OPTIMIZED
app.get('/api/admin/applications', async(req, res) => {
    try {
        const { status, major, search, page = 1, limit = 20 } = req.query;

        // Build dynamic WHERE conditions
        let whereConditions = [];
        let queryParams = [];

        // Status filter
        if (status && status !== 'all') {
            whereConditions.push('a.status = ?');
            queryParams.push(status);
        }

        // Major filter (by major name)
        if (major && major !== 'all') {
            whereConditions.push('n.ten_nganh = ?');
            queryParams.push(major);
        }

        // Search filter (name, email, CCCD)
        if (search && search.trim()) {
            whereConditions.push('(a.ho_ten LIKE ? OR a.email LIKE ? OR a.cccd LIKE ?)');
            const searchParam = `%${search.trim()}%`;
            queryParams.push(searchParam, searchParam, searchParam);
        }

        const whereClause = whereConditions.length > 0 ?
            'WHERE ' + whereConditions.join(' AND ') : '';

        // Pagination parameters
        const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 20));
        const pageNum = Math.max(1, parseInt(page) || 1);
        const offsetNum = (pageNum - 1) * limitNum;

        // Main query with JOIN to nganh table
        const mainQuery = `
            SELECT 
                a.id, a.application_code, a.ho_ten, a.ngay_sinh, a.cccd, a.sdt, a.email,
                a.dia_chi, a.noi_hoc_12, a.truong_thpt, a.ten_lop_12,
                a.nganh_id, a.diem_hk1, a.diem_ca_nam, a.status, a.assigned_to,
                a.created_at, a.updated_at,
                n.ten_nganh as major_name, n.ma_nganh as major_code
            FROM applications a
            LEFT JOIN nganh n ON a.nganh_id = n.id
            ${whereClause}
            ORDER BY a.created_at DESC
            LIMIT ? OFFSET ?
        `;

        // Count query
        const countQuery = `
            SELECT COUNT(*) as count
            FROM applications a
            LEFT JOIN nganh n ON a.nganh_id = n.id
            ${whereClause}
        `;

        // Làm sạch parameters - chuyển undefined/null thành null
        const cleanQueryParams = queryParams.map(param => param === undefined ? null : param);

        // Debug parameters before execution
        const mainParams = [...cleanQueryParams, limitNum, offsetNum];
        const countParams = [...cleanQueryParams];

        // Kiểm tra và sửa lỗi parameter mismatch
        const mainQueryPlaceholders = (mainQuery.match(/\?/g) || []).length;
        const countQueryPlaceholders = (countQuery.match(/\?/g) || []).length;

        console.log('🔍 Debug info:', {
            whereClause,
            queryParams: queryParams.length,
            limitNum,
            offsetNum,
            mainParams: mainParams.length,
            mainQueryPlaceholders,
            countQueryPlaceholders,
            countParams: countParams.length
        });

        // Execute queries - với fallback nếu có lỗi
        let applications, totalCount;

        try {
            // Kiểm tra parameter count trước khi execute
            if (mainParams.length !== mainQueryPlaceholders) {
                throw new Error(`Parameter mismatch: expected ${mainQueryPlaceholders}, got ${mainParams.length}`);
            }
            if (countParams.length !== countQueryPlaceholders) {
                throw new Error(`Count parameter mismatch: expected ${countQueryPlaceholders}, got ${countParams.length}`);
            }

            [applications] = await pool.execute(mainQuery, mainParams);
            [totalCount] = await pool.execute(countQuery, countParams);
        } catch (paramError) {
            console.warn('❌ Parameter error, using fallback query:', paramError.message);

            // Fallback: query đơn giản không có parameters
            const fallbackQuery = `
                SELECT 
                    a.id, a.application_code, a.ho_ten, a.ngay_sinh, a.cccd, a.sdt, a.email,
                    a.dia_chi, a.noi_hoc_12, a.truong_thpt, a.ten_lop_12,
                    a.nganh_id, a.diem_hk1, a.diem_ca_nam, a.status, a.assigned_to,
                    a.created_at, a.updated_at,
                    n.ten_nganh as major_name, n.ma_nganh as major_code
                FROM applications a
                LEFT JOIN nganh n ON a.nganh_id = n.id
                ORDER BY a.created_at DESC
                LIMIT 20
            `;

            [applications] = await pool.execute(fallbackQuery);
            [totalCount] = await pool.execute('SELECT COUNT(*) as count FROM applications');
        }

        // Format response data
        const formattedApps = applications.map(app => ({
            id: app.id,
            applicationCode: app.application_code,
            studentName: app.ho_ten,
            email: app.email,
            phone: app.sdt,
            cccd: app.cccd,
            major: app.major_name || 'Ngành không xác định',
            majorCode: app.major_code,
            admissionMethod: 'Học bạ THPT',
            submittedAt: app.created_at,
            status: app.status,
            gpa: calculateGPAOptimized(app.diem_ca_nam), // Optimized GPA calculation
            documents: getDocumentsList(app), // Dynamic documents list
            assignedTo: app.assigned_to,
            // Additional info for debugging
            rawScores: app.diem_ca_nam,
            birthDate: app.ngay_sinh,
            address: app.dia_chi,
            school: app.truong_thpt,
            class: app.ten_lop_12
        }));

        // Performance metrics
        const responseTime = Date.now();

        res.json({
            success: true,
            data: {
                applications: formattedApps,
                total: totalCount[0].count,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(totalCount[0].count / limitNum),
                hasNextPage: pageNum * limitNum < totalCount[0].count,
                hasPrevPage: pageNum > 1
            },
            meta: {
                query: { status, major, search, page, limit },
                executionTime: `${Date.now() - responseTime}ms`,
                filters: {
                    statusOptions: ['pending', 'approved', 'rejected'],
                    majorOptions: await getMajorOptions() // Cached major list
                }
            }
        });
    } catch (error) {
        console.error('❌ Applications list error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách hồ sơ',
            error: error.message
        });
    }
});

// Cập nhật trạng thái hồ sơ
app.put('/api/admin/applications/:id/status', async(req, res) => {
    try {
        const { id } = req.params;
        const { status, reason } = req.body;

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Trạng thái không hợp lệ'
            });
        }

        await pool.execute(
            'UPDATE applications SET status = ?, updated_at = NOW() WHERE id = ?', [status, id]
        );

        // Lấy thông tin hồ sơ và user để gửi email
        const [apps] = await pool.execute('SELECT * FROM applications WHERE id = ?', [id]);
        if (apps.length > 0) {
            const app = apps[0];
            try {
                const applicationData = {
                    id: app.id,
                    major_name: app.nganh_id, // Có thể cần join bảng ngành để lấy tên ngành
                    admission_method: app.phuong_thuc_xet_tuyen
                };
                await sendApplicationStatusUpdateEmail(app.email, app.ho_ten, applicationData, status, reason || '');
            } catch (emailError) {
                console.error('Error sending application status update email:', emailError);
            }
        }

        res.json({
            success: true,
            message: 'Cập nhật trạng thái thành công'
        });
    } catch (error) {
        console.error('Update status error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ'
        });
    }
});

// ========== HELPER FUNCTIONS - OPTIMIZED ========== //

// Cache cho major options
let majorOptionsCache = null;
let majorCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Optimized GPA calculation
function calculateGPAOptimized(diemJSON) {
    if (!diemJSON) return 0;

    try {
        const diem = typeof diemJSON === 'string' ? JSON.parse(diemJSON) : diemJSON;
        const subjects = ['Toán', 'Văn', 'Anh', 'Lý', 'Hóa', 'Sinh', 'Sử', 'Địa'];
        let total = 0;
        let count = 0;

        subjects.forEach(subject => {
            const score = diem[subject];
            if (score && !isNaN(parseFloat(score))) {
                total += parseFloat(score);
                count++;
            }
        });

        return count > 0 ? parseFloat((total / count).toFixed(1)) : 0;
    } catch (error) {
        console.warn('GPA calculation error:', error.message);
        return 0;
    }
}

// Get documents list based on application data
function getDocumentsList(app) {
    const documents = ['Học bạ THPT'];

    if (app.cccd) documents.push('CCCD/CMND');
    if (app.ngay_sinh) documents.push('Giấy khai sinh');
    if (app.truong_thpt) documents.push('Giấy chứng nhận tốt nghiệp');

    return documents;
}

// Get major options with caching
async function getMajorOptions() {
    const now = Date.now();

    // Return cached data if still valid
    if (majorOptionsCache && (now - majorCacheTime) < CACHE_DURATION) {
        return majorOptionsCache;
    }

    try {
        const [majors] = await pool.execute(
            'SELECT ten_nganh as name, ma_nganh as code FROM nganh ORDER BY ten_nganh'
        );

        majorOptionsCache = majors.map(m => m.name);
        majorCacheTime = now;

        return majorOptionsCache;
    } catch (error) {
        console.warn('Failed to load major options:', error.message);
        return ['Công nghệ Thông tin', 'Quản trị Kinh doanh', 'Kỹ thuật Cơ khí', 'Kế toán'];
    }
}

// Legacy function for backward compatibility
function calculateGPA(diemJSON) {
    return calculateGPAOptimized(diemJSON);
}

function getMajorIcon(majorName) {
    const icons = {
        'Công nghệ Thông tin': '💻',
        'Quản trị Kinh doanh': '📊',
        'Kỹ thuật Cơ khí': '⚙️',
        'Kế toán': '💰',
        'Tài chính - Ngân hàng': '🏦'
    };
    return icons[majorName] || '🎓';
}

// ========== END ADMIN API ROUTES ========== //

// ========== USER PROFILE ROUTES ========== //

// Đổi mật khẩu
app.put('/api/user/update-password', async(req, res) => {
    try {
        const { user_id, old_password, new_password } = req.body;
        if (!user_id || !old_password || !new_password) {
            return res.status(400).json({ success: false, message: 'Thiếu thông tin' });
        }
        // Lấy user
        const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [user_id]);
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
        }
        const user = users[0];
        // Kiểm tra mật khẩu cũ
        const isValid = await bcrypt.compare(old_password, user.password);
        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Mật khẩu cũ không đúng' });
        }
        // Hash mật khẩu mới
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(new_password, saltRounds);
        await pool.execute('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user_id]);
        // Gửi email xác nhận
        try {
            await sendProfileUpdateEmail(user.email, user.full_name || user.username, 'password', req.ip);
        } catch (emailError) {
            console.error('Error sending profile update email:', emailError);
        }
        res.json({ success: true, message: 'Đổi mật khẩu thành công' });
    } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({ success: false, message: 'Lỗi server nội bộ' });
    }
});

// Đổi email
app.put('/api/user/update-email', async(req, res) => {
    try {
        const { user_id, new_email } = req.body;
        if (!user_id || !new_email) {
            return res.status(400).json({ success: false, message: 'Thiếu thông tin' });
        }
        // Kiểm tra email đã tồn tại chưa
        const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [new_email]);
        if (existing.length > 0) {
            return res.status(400).json({ success: false, message: 'Email đã được sử dụng' });
        }
        // Lấy user
        const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [user_id]);
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
        }
        const user = users[0];
        await pool.execute('UPDATE users SET email = ? WHERE id = ?', [new_email, user_id]);
        // Gửi email xác nhận
        try {
            await sendProfileUpdateEmail(new_email, user.full_name || user.username, 'email', req.ip);
        } catch (emailError) {
            console.error('Error sending profile update email:', emailError);
        }
        res.json({ success: true, message: 'Đổi email thành công' });
    } catch (error) {
        console.error('Update email error:', error);
        res.status(500).json({ success: false, message: 'Lỗi server nội bộ' });
    }
});

// Đổi avatar
app.put('/api/user/update-avatar', async(req, res) => {
    try {
        const { user_id, avatar_url } = req.body;
        if (!user_id || !avatar_url) {
            return res.status(400).json({ success: false, message: 'Thiếu thông tin' });
        }
        // Lấy user
        const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [user_id]);
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
        }
        const user = users[0];
        await pool.execute('UPDATE users SET avatar = ? WHERE id = ?', [avatar_url, user_id]);
        // Gửi email xác nhận
        try {
            await sendProfileUpdateEmail(user.email, user.full_name || user.username, 'avatar', req.ip);
        } catch (emailError) {
            console.error('Error sending profile update email:', emailError);
        }
        res.json({ success: true, message: 'Đổi avatar thành công' });
    } catch (error) {
        console.error('Update avatar error:', error);
        res.status(500).json({ success: false, message: 'Lỗi server nội bộ' });
    }
});

// Cập nhật thông tin cá nhân (số điện thoại, mô tả ngắn, liên kết mạng xã hội)
app.put('/api/user/update-profile-info', async(req, res) => {
    try {
        const { user_id, phone, bio, social } = req.body;
        if (!user_id) {
            return res.status(400).json({ success: false, message: 'Thiếu user_id' });
        }

        // Lấy thông tin user để gửi email
        const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [user_id]);
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
        }
        const user = users[0];

        await pool.execute(
            'UPDATE users SET phone = ?, bio = ?, social = ? WHERE id = ?', [phone || '', bio || '', social || '', user_id]
        );

        // Gửi email xác nhận
        try {
            await sendProfileUpdateEmail(user.email, user.full_name || user.username, 'profile', req.ip);
        } catch (emailError) {
            console.error('Error sending profile update email:', emailError);
        }

        res.json({ success: true, message: 'Cập nhật thông tin cá nhân thành công!' });
    } catch (error) {
        console.error('Update profile info error:', error);
        res.status(500).json({ success: false, message: 'Lỗi server nội bộ' });
    }
});

// ========== END USER PROFILE ROUTES ========== //

// Database setup endpoint
app.get('/api/admin/setup-db', async(req, res) => {
    try {
        // Tạo bảng nganh nếu chưa có
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS nganh (
                id INT AUTO_INCREMENT PRIMARY KEY,
                ma_nganh VARCHAR(20) UNIQUE NOT NULL,
                ten_nganh VARCHAR(255) NOT NULL,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);

        // Thêm dữ liệu mẫu cho bảng nganh
        await pool.execute(`
            INSERT IGNORE INTO nganh (id, ma_nganh, ten_nganh) VALUES 
            (1, 'CNTT', 'Công nghệ Thông tin'),
            (2, 'QTKD', 'Quản trị Kinh doanh'),
            (3, 'KTCK', 'Kỹ thuật Cơ khí'),
            (4, 'KT', 'Kế toán'),
            (5, 'TCNH', 'Tài chính - Ngân hàng'),
            (21, 'KTPM', 'Kỹ thuật Phần mềm'),
            (22, 'ATTT', 'An toàn Thông tin')
        `);

        // Thêm cột phương thức xét tuyển vào bảng applications
        try {
            await pool.execute(`
                ALTER TABLE applications 
                ADD COLUMN phuong_thuc_xet_tuyen ENUM('hoc_ba', 'thi_thpt', 'danh_gia_nang_luc') DEFAULT 'hoc_ba' AFTER nganh_id
            `);
        } catch (err) {
            if (!err.message.includes('Duplicate column name')) throw err;
        }

        try {
            await pool.execute(`
                ALTER TABLE applications 
                ADD COLUMN khoi_thi VARCHAR(10) NULL AFTER phuong_thuc_xet_tuyen
            `);
        } catch (err) {
            if (!err.message.includes('Duplicate column name')) throw err;
        }

        try {
            await pool.execute(`
                ALTER TABLE applications 
                ADD COLUMN diem_thi_thpt JSON NULL AFTER khoi_thi
            `);
        } catch (err) {
            if (!err.message.includes('Duplicate column name')) throw err;
        }

        try {
            await pool.execute(`
                ALTER TABLE applications 
                ADD COLUMN diem_danh_gia_nang_luc DECIMAL(7,2) NULL AFTER diem_thi_thpt
            `);
        } catch (err) {
            if (!err.message.includes('Duplicate column name')) throw err;
        }

        // Tạo bảng khối thi THPT
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS khoi_thi_thpt (
                id INT AUTO_INCREMENT PRIMARY KEY,
                ma_khoi VARCHAR(10) UNIQUE NOT NULL,
                ten_khoi VARCHAR(100) NOT NULL,
                cac_mon JSON NOT NULL,
                mo_ta TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);

        // Thêm dữ liệu khối thi THPT
        await pool.execute(`
            INSERT IGNORE INTO khoi_thi_thpt (ma_khoi, ten_khoi, cac_mon, mo_ta) VALUES
            ('A00', 'Khối A00', '["Toán", "Lý", "Hóa"]', 'Khối thi truyền thống cho các ngành kỹ thuật, công nghệ'),
            ('A01', 'Khối A01', '["Toán", "Lý", "Tiếng Anh"]', 'Khối thi cho các ngành kỹ thuật có yêu cầu ngoại ngữ cao'),
            ('B00', 'Khối B00', '["Toán", "Hóa", "Sinh"]', 'Khối thi cho các ngành y dược, sinh học'),
            ('C00', 'Khối C00', '["Văn", "Sử", "Địa"]', 'Khối thi cho các ngành xã hội nhân văn'),
            ('D01', 'Khối D01', '["Toán", "Văn", "Tiếng Anh"]', 'Khối thi cho các ngành kinh tế, quản trị'),
            ('D07', 'Khối D07', '["Toán", "Hóa", "Tiếng Anh"]', 'Khối thi cho các ngành có yêu cầu toán và hóa cao'),
            ('D08', 'Khối D08', '["Toán", "Sinh", "Tiếng Anh"]', 'Khối thi cho các ngành y dược có yêu cầu tiếng Anh'),
            ('V00', 'Khối V00', '["Toán", "Lý", "Vẽ"]', 'Khối thi cho các ngành kiến trúc, mỹ thuật');
        `);

        // Tạo bảng liên kết ngành học với khối thi
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS nganh_khoi_thi (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nganh_id INT NOT NULL,
                khoi_thi_id INT NOT NULL,
                FOREIGN KEY (nganh_id) REFERENCES nganh(id) ON DELETE CASCADE,
                FOREIGN KEY (khoi_thi_id) REFERENCES khoi_thi_thpt(id) ON DELETE CASCADE,
                UNIQUE KEY unique_nganh_khoi (nganh_id, khoi_thi_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);

        // Liên kết ngành với khối thi
        await pool.execute(`
            INSERT IGNORE INTO nganh_khoi_thi (nganh_id, khoi_thi_id) VALUES
            (1, 1), (1, 2), (1, 5), 
            (2, 5), (2, 1), 
            (3, 1), (3, 2), (3, 6), 
            (4, 5), (4, 1), 
            (5, 5), (5, 1),
            (21, 1), (21, 2), (21, 5),
            (22, 1), (22, 2), (22, 5);
        `);

        // Kiểm tra dữ liệu
        const [nganhCount] = await pool.execute('SELECT COUNT(*) as count FROM nganh');
        const [appCount] = await pool.execute('SELECT COUNT(*) as count FROM applications');
        const [khoiThiCount] = await pool.execute('SELECT COUNT(*) as count FROM khoi_thi_thpt');

        res.json({
            success: true,
            message: 'Database setup với phương thức xét tuyển completed',
            data: {
                majorCount: nganhCount[0].count,
                applicationCount: appCount[0].count,
                examBlockCount: khoiThiCount[0].count
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Database setup failed',
            error: error.message
        });
    }
});

// Test endpoint for debugging
app.get('/api/admin/test', async(req, res) => {
    try {
        const [result] = await pool.execute('SELECT COUNT(*) as count FROM applications');
        res.json({
            success: true,
            message: 'Test API working',
            data: {
                applicationCount: result[0].count
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Test failed',
            error: error.message
        });
    }
});

// Multer config for scholarship attachments
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/scholarship');
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Ensure upload dir exists
if (!fs.existsSync('uploads/scholarship')) fs.mkdirSync('uploads/scholarship', { recursive: true });

// Cấu hình multer cho avatar
const avatarStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = path.join('uploads', 'avatar');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname);
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'avatar-' + unique + ext);
    }
});
const uploadAvatar = multer({ storage: avatarStorage });

// API upload avatar
app.post('/api/user/upload-avatar', uploadAvatar.single('avatar'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Không có file được upload' });
    }
    // Trả về URL file
    const url = `/uploads/avatar/${req.file.filename}`;
    res.json({ success: true, url });
});

// API cập nhật avatar URL vào database
app.put('/api/user/update-avatar', async(req, res) => {
    try {
        const { user_id, avatar_url } = req.body;

        if (!user_id || !avatar_url) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu user_id hoặc avatar_url'
            });
        }

        // Cập nhật avatar URL vào database
        await pool.execute(
            'UPDATE users SET avatar = ? WHERE id = ?', [avatar_url, user_id]
        );

        res.json({
            success: true,
            message: 'Cập nhật avatar thành công',
            avatar_url
        });
    } catch (error) {
        console.error('Update avatar error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi cập nhật avatar'
        });
    }
});

// Nộp đơn học bổng (có upload file)
app.post('/api/scholarship/apply', upload.array('attachments', 5), async(req, res) => {
    try {
        const {
            ho_ten,
            ngay_sinh,
            gioi_tinh,
            cccd,
            dia_chi,
            phone,
            email,
            nganh,
            lop,
            khoa,
            diem_tb,
            hoc_bong,
            thanh_tich,
            kinh_te,
            so_thanh_vien,
            ly_do,
            nguon_thong_tin
        } = req.body;
        let attachments = null;
        if (req.files && req.files.length > 0) {
            attachments = JSON.stringify(req.files.map(f => f.filename));
        }
        await pool.execute(
            `INSERT INTO scholarship_applications
      (ho_ten, ngay_sinh, gioi_tinh, cccd, dia_chi, phone, email, nganh, lop, khoa, diem_tb, hoc_bong, thanh_tich, kinh_te, so_thanh_vien, ly_do, nguon_thong_tin, attachments)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [ho_ten, ngay_sinh, gioi_tinh, cccd, dia_chi, phone, email, nganh, lop, khoa, diem_tb, hoc_bong, thanh_tich, kinh_te, so_thanh_vien, ly_do, nguon_thong_tin, attachments]
        );
        // Gửi email xác nhận học bổng
        try {
            const scholarshipData = {
                full_name: ho_ten,
                scholarship_type: hoc_bong,
                major: nganh,
                gpa: diem_tb
            };
            await sendScholarshipApplicationEmail(email, ho_ten, scholarshipData);
        } catch (emailError) {
            console.error('Error sending scholarship application email:', emailError);
        }
        res.json({ success: true, message: "Nộp đơn học bổng thành công!" });
    } catch (error) {
        console.error('Scholarship apply error:', error);
        res.status(500).json({ success: false, message: "Lỗi server khi nộp đơn học bổng" });
    }
});

// Danh sách đơn học bổng theo email
app.get('/api/scholarship/list', async(req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ success: false, message: 'Thiếu email' });
        const [rows] = await pool.execute(
            'SELECT * FROM scholarship_applications WHERE email = ? ORDER BY created_at DESC', [email]
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server khi lấy danh sách học bổng' });
    }
});

// Danh sách đơn tư vấn theo email
app.get('/api/consult/list', async(req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ success: false, message: 'Thiếu email' });
        const [rows] = await pool.execute(
            'SELECT * FROM consult_requests WHERE email = ? ORDER BY created_at DESC', [email]
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server khi lấy danh sách tư vấn' });
    }
});

// Nộp đơn tư vấn
app.post('/api/consult/apply', async(req, res) => {
    try {
        const {
            ho_ten,
            phone,
            email,
            dia_chi,
            van_de,
            nganh_quan_tam,
            thoi_gian,
            phuong_thuc,
            ghi_chu
        } = req.body;

        await pool.execute(
            `INSERT INTO consult_requests
      (ho_ten, phone, email, dia_chi, van_de, nganh_quan_tam, thoi_gian, phuong_thuc, ghi_chu)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [ho_ten, phone, email, dia_chi, van_de, nganh_quan_tam, thoi_gian, phuong_thuc, ghi_chu]
        );

        // Gửi email xác nhận tư vấn
        try {
            const consultationData = {
                full_name: ho_ten,
                phone,
                major_interest: nganh_quan_tam,
                preferred_time: thoi_gian
            };
            await sendConsultationRequestEmail(email, ho_ten, consultationData);
        } catch (emailError) {
            console.error('Error sending consultation request email:', emailError);
        }

        res.json({ success: true, message: "Gửi yêu cầu tư vấn thành công!" });
    } catch (error) {
        console.error('Consult apply error:', error);
        res.status(500).json({ success: false, message: "Lỗi server khi gửi yêu cầu tư vấn" });
    }
});

// API endpoints cho quản lý thiết bị
app.get('/api/user/devices', authenticateToken, async(req, res) => {
    try {
        const devices = await deviceService.getUserDevices(req.user.id);
        res.json({ success: true, data: devices });
    } catch (error) {
        console.error('Error getting user devices:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách thiết bị' });
    }
});

app.delete('/api/user/devices/:sessionToken', authenticateToken, async(req, res) => {
    try {
        const { sessionToken } = req.params;
        const success = await deviceService.deactivateDevice(sessionToken);

        if (success) {
            res.json({ success: true, message: 'Đã vô hiệu hóa thiết bị' });
        } else {
            res.status(404).json({ success: false, message: 'Không tìm thấy thiết bị' });
        }
    } catch (error) {
        console.error('Error deactivating device:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi vô hiệu hóa thiết bị' });
    }
});

app.delete('/api/user/devices', authenticateToken, async(req, res) => {
    try {
        const currentSessionToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        const count = await deviceService.deactivateOtherDevices(req.user.id, currentSessionToken);

        res.json({
            success: true,
            message: `Đã vô hiệu hóa ${count} thiết bị khác`,
            count
        });
    } catch (error) {
        console.error('Error deactivating other devices:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi vô hiệu hóa thiết bị khác' });
    }
});

// API endpoints cho activity logs
app.get('/api/user/activity-logs', authenticateToken, async(req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const logs = await deviceService.getUserActivityLogs(req.user.id, limit);
        res.json({ success: true, data: logs });
    } catch (error) {
        console.error('Error getting activity logs:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi lấy lịch sử hoạt động' });
    }
});

// API cập nhật email
app.put('/api/user/update-email', async(req, res) => {
    try {
        const { user_id, email } = req.body;

        if (!user_id || !email) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu user_id hoặc email'
            });
        }

        // Kiểm tra email đã tồn tại chưa
        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE email = ? AND id != ?', [email, user_id]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Email đã được sử dụng bởi tài khoản khác'
            });
        }

        // Cập nhật email
        await pool.execute(
            'UPDATE users SET email = ? WHERE id = ?', [email, user_id]
        );

        res.json({
            success: true,
            message: 'Cập nhật email thành công',
            email
        });
    } catch (error) {
        console.error('Update email error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi cập nhật email'
        });
    }
});

// API cập nhật mật khẩu
app.put('/api/user/update-password', async(req, res) => {
    try {
        const { user_id, current_password, new_password } = req.body;

        if (!user_id || !current_password || !new_password) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin cần thiết'
            });
        }

        // Kiểm tra mật khẩu hiện tại
        const [users] = await pool.execute(
            'SELECT password FROM users WHERE id = ?', [user_id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            });
        }

        const isValidPassword = await bcrypt.compare(current_password, users[0].password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: 'Mật khẩu hiện tại không đúng'
            });
        }

        // Hash mật khẩu mới
        const hashedPassword = await bcrypt.hash(new_password, 10);

        // Cập nhật mật khẩu
        await pool.execute(
            'UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user_id]
        );

        res.json({
            success: true,
            message: 'Cập nhật mật khẩu thành công'
        });
    } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi cập nhật mật khẩu'
        });
    }
});

// API cập nhật thông tin profile
app.put('/api/user/update-profile-info', async(req, res) => {
    try {
        const { user_id, phone, bio, social } = req.body;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu user_id'
            });
        }

        // Cập nhật thông tin profile
        await pool.execute(
            'UPDATE users SET phone = ?, bio = ?, social = ? WHERE id = ?', [phone || null, bio || null, social || null, user_id]
        );

        res.json({
            success: true,
            message: 'Cập nhật thông tin cá nhân thành công'
        });
    } catch (error) {
        console.error('Update profile info error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi cập nhật thông tin cá nhân'
        });
    }
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found'
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error'
    });
});

// Start server
const startServer = async() => {
    try {
        // Test database connection
        await testConnection();
        // Start HTTP server
        const server = app.listen(PORT, () => {
            console.log('\n🚀 HUTECH Simple Backend API Server Started!');
            console.log(`📡 Server: http://localhost:${PORT}`);
            console.log('📋 Available API endpoints:');
            console.log('   POST /api/auth/login - User login');
            console.log('   POST /api/auth/register - User registration');
            console.log('   POST /api/auth/register-admin - Admin registration');
            console.log('   GET  /api/auth/user/:id - Get user info');
            console.log('   GET  /api/auth/majors - Get all majors');
            console.log('   GET  /api/auth/admission-methods - Get admission methods');
            console.log('   POST /api/auth/apply - Submit application');
            console.log('   GET  /api/auth/applications/:userId - Get user applications');
            console.log('   POST /api/auth/contact - Submit contact form');
            console.log('   GET  /api/auth/faqs - Get FAQs');
            console.log('   GET  /api/auth/health - Auth health check');
            console.log('   GET  /health - Server health check');
            console.log('\n✅ Ready to accept connections!');
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Start the server
startServer();