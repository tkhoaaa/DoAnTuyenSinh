import express from 'express';
import cors from 'cors';
import { testConnection } from './config/database.js';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import pool from './config/database.js';

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
    body('email').isEmail().withMessage('Email không hợp lệ'),
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
        const { email, password } = req.body;
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ? AND is_active = true', [email]
        );
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng'
            });
        }
        const user = users[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng'
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

// Lấy danh sách ngành học
app.get(`${authPrefix}/majors`, async(req, res) => {
    try {
        const [majors] = await pool.execute(
            'SELECT id, ten_nganh as name, ma_nganh as code, TRUE as is_active FROM nganh ORDER BY ten_nganh ASC'
        );
        res.json({
            success: true,
            data: majors
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