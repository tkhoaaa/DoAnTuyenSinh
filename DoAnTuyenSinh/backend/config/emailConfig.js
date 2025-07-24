// Cấu hình email cho hệ thống tuyển sinh HUTECH
export const emailConfig = {
    // Cấu hình SMTP
    smtp: {
        service: process.env.EMAIL_SERVICE || 'gmail',
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        secure: process.env.EMAIL_SECURE === 'true' || false,
        auth: {
            user: process.env.EMAIL_USER || 'khoa0372243036@gmail.com',
            pass: process.env.EMAIL_PASSWORD || 'rexkbshgxwzqaxmw'
        }
    },

    // Thông tin người gửi
    from: {
        name: process.env.EMAIL_FROM_NAME || 'HUTECH Tuyển sinh',
        email: process.env.EMAIL_USER || 'noreply@hutech.edu.vn'
    },

    // URL frontend
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

    // Cấu hình template
    templates: {
        welcome: {
            subject: 'Chào mừng đến với Hệ thống Tuyển sinh HUTECH',
            template: 'welcome'
        },
        passwordReset: {
            subject: 'Đặt lại mật khẩu - Hệ thống Tuyển sinh HUTECH',
            template: 'password-reset'
        },
        applicationSubmitted: {
            subject: 'Xác nhận nộp hồ sơ xét tuyển - HUTECH',
            template: 'application-submitted'
        },
        applicationStatusUpdate: {
            subject: 'Cập nhật trạng thái hồ sơ - HUTECH',
            template: 'application-status-update'
        },
        consultationRequest: {
            subject: 'Xác nhận đăng ký tư vấn - HUTECH',
            template: 'consultation-request'
        },
        scholarshipApplication: {
            subject: 'Xác nhận đăng ký học bổng - HUTECH',
            template: 'scholarship-application'
        },
        profileUpdate: {
            subject: 'Cập nhật thông tin tài khoản - HUTECH',
            template: 'profile-update'
        }
    },

    // Cấu hình bảo mật
    security: {
        // Thời gian hết hạn token đặt lại mật khẩu (phút)
        passwordResetExpiry: parseInt(process.env.PASSWORD_RESET_EXPIRY) || 60,

        // Số lần gửi email tối đa trong 1 giờ
        maxEmailsPerHour: parseInt(process.env.MAX_EMAILS_PER_HOUR) || 10,

        // Thời gian chờ giữa các lần gửi email (giây)
        emailCooldown: parseInt(process.env.EMAIL_COOLDOWN) || 60
    },

    // Cấu hình logging
    logging: {
        // Ghi log email
        enableLogging: process.env.EMAIL_LOGGING === 'true' || true,

        // Lưu email vào database
        saveToDatabase: process.env.EMAIL_SAVE_TO_DB === 'true' || false
    }
};

// Hàm kiểm tra cấu hình email
export const validateEmailConfig = () => {
    const requiredFields = [
        'EMAIL_USER',
        'EMAIL_PASSWORD'
    ];

    const missingFields = requiredFields.filter(field => !process.env[field]);

    if (missingFields.length > 0) {
        console.warn('⚠️ Email configuration warning: Missing environment variables:', missingFields);
        console.warn('📧 Email functionality will be disabled. Please set the required environment variables.');
        return false;
    }

    return true;
};

// Hàm lấy cấu hình email cho môi trường hiện tại
export const getEmailConfig = () => {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        ...emailConfig,
        smtp: {
            ...emailConfig.smtp,
            // Trong production, sử dụng cấu hình bảo mật hơn
            secure: isProduction ? true : emailConfig.smtp.secure,
            port: isProduction ? 465 : emailConfig.smtp.port
        }
    };
};

export default emailConfig;