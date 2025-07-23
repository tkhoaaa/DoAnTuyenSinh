import express from 'express';
import cors from 'cors';
import { testConnection } from './config/database.js';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import pool from './config/database.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3001;

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'HUTECHS Simple API Server is running',
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
            SELECT id, ten_nganh as name, ma_nganh as code, is_active 
            FROM nganh 
            WHERE is_active = true 
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

// ========== END AUTH & USER ROUTES ========== //

// ========== ADMISSION APPLICATION ROUTES ========== //

// Nộp hồ sơ xét tuyển
app.post(`${authPrefix}/apply`, [
    body('ho_ten').notEmpty().withMessage('Họ tên không được để trống'),
    body('ngay_sinh').notEmpty().withMessage('Ngày sinh không được để trống'),
    body('cccd').notEmpty().withMessage('CCCD không được để trống'),
    body('sdt').notEmpty().withMessage('Số điện thoại không được để trống'),
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
            diem_hk1,
            diem_ca_nam,
            user_id
        } = req.body;

        // Generate application code
        const applicationCode = 'HS' + Date.now();

        // Insert application
        const [result] = await pool.execute(
            `INSERT INTO applications 
            (application_code, ho_ten, ngay_sinh, cccd, sdt, email, noi_hoc_12, truong_thpt, ten_lop_12, dia_chi, 
             nganh_id, nganh_ids, diem_hk1, diem_ca_nam, user_id, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`, [applicationCode, ho_ten, ngay_sinh, cccd, sdt, email, noi_hoc_12, truong_thpt, ten_lop_12, dia_chi,
                nganh_id, JSON.stringify(nganh_ids), diem_hk1, diem_ca_nam, user_id
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Nộp hồ sơ thành công',
            data: {
                application_id: result.insertId,
                application_code: applicationCode
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

        // Debug parameters before execution
        const mainParams = [...queryParams, limitNum, offsetNum];
        const countParams = [...queryParams];

        console.log('🔍 Debug info:', {
            whereClause,
            queryParams,
            limitNum,
            offsetNum,
            mainParams,
            queryLength: mainQuery.split('?').length - 1,
            paramsLength: mainParams.length
        });

        // Execute queries - với fallback nếu có lỗi
        let applications, totalCount;

        try {
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
        const { status } = req.body;

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Trạng thái không hợp lệ'
            });
        }

        await pool.execute(
            'UPDATE applications SET status = ?, updated_at = NOW() WHERE id = ?', [status, id]
        );

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
            'SELECT ten_nganh as name, ma_nganh as code FROM nganh WHERE is_active = true ORDER BY ten_nganh'
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

        // Kiểm tra dữ liệu
        const [nganhCount] = await pool.execute('SELECT COUNT(*) as count FROM nganh');
        const [appCount] = await pool.execute('SELECT COUNT(*) as count FROM applications');

        res.json({
            success: true,
            message: 'Database setup completed',
            data: {
                majorCount: nganhCount[0].count,
                applicationCount: appCount[0].count
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

        res.json({ success: true, message: "Gửi yêu cầu tư vấn thành công!" });
    } catch (error) {
        console.error('Consult apply error:', error);
        res.status(500).json({ success: false, message: "Lỗi server khi gửi yêu cầu tư vấn" });
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
            console.log('\n🚀 HUTECHS Simple Backend API Server Started!');
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