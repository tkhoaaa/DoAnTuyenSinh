-- Script thiết lập database hoàn chỉnh cho Hệ thống Tuyển sinh HUTECHS
-- Chạy script này trong MySQL Workbench hoặc MySQL CLI

USE tuyensinh;

-- 1. Tạo bảng users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL COMMENT 'Tên đăng nhập',
    email VARCHAR(255) UNIQUE NOT NULL COMMENT 'Email người dùng',
    password VARCHAR(255) NOT NULL COMMENT 'Mật khẩu đã hash',
    full_name VARCHAR(255) COMMENT 'Họ tên đầy đủ',
    phone VARCHAR(15) COMMENT 'Số điện thoại',
    role ENUM('user', 'admin') DEFAULT 'user' COMMENT 'Vai trò người dùng',
    role_id INT DEFAULT 2 COMMENT 'ID vai trò (legacy)',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Trạng thái hoạt động',
    email_verified BOOLEAN DEFAULT FALSE COMMENT 'Email đã xác thực',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_role (role),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng người dùng hệ thống';

-- 2. Tạo bảng nganh (ngành học)
CREATE TABLE IF NOT EXISTS nganh (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ma_nganh VARCHAR(20) UNIQUE NOT NULL COMMENT 'Mã ngành học',
    ten_nganh VARCHAR(255) NOT NULL COMMENT 'Tên ngành học',
    mo_ta TEXT COMMENT 'Mô tả ngành học',
    chi_tieu INT DEFAULT 0 COMMENT 'Chỉ tiêu tuyển sinh',
    diem_chuan DECIMAL(4,2) DEFAULT 0.00 COMMENT 'Điểm chuẩn',
    hoc_phi DECIMAL(10,2) DEFAULT 0.00 COMMENT 'Học phí',
    thoi_gian_dao_tao INT DEFAULT 4 COMMENT 'Thời gian đào tạo (năm)',
    bang_cap VARCHAR(100) DEFAULT 'Cử nhân' COMMENT 'Bằng cấp',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Trạng thái hoạt động',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_ma_nganh (ma_nganh),
    INDEX idx_ten_nganh (ten_nganh),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng ngành học';

-- 3. Tạo bảng applications (hồ sơ xét tuyển)
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_code VARCHAR(50) UNIQUE NOT NULL COMMENT 'Mã hồ sơ duy nhất',
    
    -- Thông tin cá nhân
    ho_ten VARCHAR(255) NOT NULL COMMENT 'Họ và tên thí sinh',
    ngay_sinh DATE NOT NULL COMMENT 'Ngày sinh',
    cccd VARCHAR(20) NOT NULL COMMENT 'Số CCCD',
    sdt VARCHAR(15) NOT NULL COMMENT 'Số điện thoại',
    email VARCHAR(255) NOT NULL COMMENT 'Email liên hệ',
    dia_chi TEXT COMMENT 'Địa chỉ',
    
    -- Thông tin học tập THPT
    noi_hoc_12 VARCHAR(255) COMMENT 'Nơi học lớp 12',
    truong_thpt VARCHAR(255) COMMENT 'Trường THPT',
    ten_lop_12 VARCHAR(100) COMMENT 'Tên lớp 12',
    
    -- Thông tin xét tuyển
    nganh_id INT COMMENT 'ID ngành học chính',
    nganh_ids JSON COMMENT 'Danh sách ID các ngành đăng ký (JSON array)',
    diem_hk1 JSON COMMENT 'Điểm học kỳ 1 (JSON object)',
    diem_ca_nam JSON COMMENT 'Điểm cả năm (JSON object)',
    
    -- Thông tin hệ thống
    user_id INT COMMENT 'ID người dùng nộp hồ sơ',
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' COMMENT 'Trạng thái hồ sơ',
    assigned_to INT COMMENT 'ID admin được phân công xử lý',
    note TEXT COMMENT 'Ghi chú từ admin',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    -- Indexes
    INDEX idx_application_code (application_code),
    INDEX idx_status (status),
    INDEX idx_nganh_id (nganh_id),
    INDEX idx_user_id (user_id),
    INDEX idx_assigned_to (assigned_to),
    INDEX idx_created_at (created_at),
    
    -- Foreign keys
    FOREIGN KEY (nganh_id) REFERENCES nganh(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng lưu trữ hồ sơ xét tuyển';

-- 4. Tạo bảng scholarship_applications (học bổng)
CREATE TABLE IF NOT EXISTS scholarship_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ho_ten VARCHAR(255) NOT NULL COMMENT 'Họ tên',
    ngay_sinh DATE NOT NULL COMMENT 'Ngày sinh',
    gioi_tinh ENUM('Nam', 'Nữ', 'Khác') NOT NULL COMMENT 'Giới tính',
    cccd VARCHAR(20) NOT NULL COMMENT 'Số CCCD',
    dia_chi TEXT COMMENT 'Địa chỉ',
    phone VARCHAR(15) NOT NULL COMMENT 'Số điện thoại',
    email VARCHAR(255) NOT NULL COMMENT 'Email',
    nganh VARCHAR(255) COMMENT 'Ngành học',
    lop VARCHAR(100) COMMENT 'Lớp',
    khoa VARCHAR(255) COMMENT 'Khoa',
    diem_tb DECIMAL(4,2) COMMENT 'Điểm trung bình',
    hoc_bong VARCHAR(255) COMMENT 'Loại học bổng đăng ký',
    thanh_tich TEXT COMMENT 'Thành tích',
    kinh_te TEXT COMMENT 'Hoàn cảnh kinh tế',
    so_thanh_vien INT COMMENT 'Số thành viên gia đình',
    ly_do TEXT COMMENT 'Lý do xin học bổng',
    nguon_thong_tin VARCHAR(255) COMMENT 'Nguồn thông tin',
    attachments JSON COMMENT 'File đính kèm (JSON array)',
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' COMMENT 'Trạng thái',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng đăng ký học bổng';

-- 5. Tạo bảng consult_requests (tư vấn)
CREATE TABLE IF NOT EXISTS consult_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ho_ten VARCHAR(255) NOT NULL COMMENT 'Họ tên',
    phone VARCHAR(15) NOT NULL COMMENT 'Số điện thoại',
    email VARCHAR(255) NOT NULL COMMENT 'Email',
    dia_chi TEXT COMMENT 'Địa chỉ',
    van_de TEXT COMMENT 'Vấn đề cần tư vấn',
    nganh_quan_tam VARCHAR(255) COMMENT 'Ngành quan tâm',
    thoi_gian VARCHAR(255) COMMENT 'Thời gian mong muốn',
    phuong_thuc VARCHAR(255) COMMENT 'Phương thức tư vấn',
    ghi_chu TEXT COMMENT 'Ghi chú',
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending' COMMENT 'Trạng thái',
    assigned_to INT COMMENT 'Người phụ trách',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_assigned_to (assigned_to),
    INDEX idx_created_at (created_at),
    
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng yêu cầu tư vấn';

-- 6. Thêm dữ liệu mẫu cho bảng users
INSERT INTO users (username, email, password, full_name, phone, role) VALUES 
('admin', 'admin@hutechs.edu.vn', '$2a$10$e0MYzXyjpJS7Pd4QGgQPWuV9uf0lsUz/KeukI3.I8O8T5rDFqBFRW', 'Quản trị viên', '0123456789', 'admin'),
('user1', 'user1@email.com', '$2a$10$e0MYzXyjpJS7Pd4QGgQPWuV9uf0lsUz/KeukI3.I8O8T5rDFqBFRW', 'Nguyễn Văn A', '0987654321', 'user')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- 7. Thêm dữ liệu mẫu cho bảng nganh
INSERT INTO nganh (ma_nganh, ten_nganh, mo_ta, chi_tieu, diem_chuan, hoc_phi, thoi_gian_dao_tao) VALUES 
('CNTT', 'Công nghệ Thông tin', 'Đào tạo chuyên gia về công nghệ thông tin', 200, 24.50, 15000000, 4),
('QTKD', 'Quản trị Kinh doanh', 'Đào tạo nhà quản lý kinh doanh chuyên nghiệp', 150, 23.00, 12000000, 4),
('KTCK', 'Kỹ thuật Cơ khí', 'Đào tạo kỹ sư cơ khí', 120, 22.50, 14000000, 4),
('KT', 'Kế toán', 'Đào tạo kế toán viên chuyên nghiệp', 180, 21.00, 11000000, 4),
('TCNH', 'Tài chính - Ngân hàng', 'Đào tạo chuyên gia tài chính ngân hàng', 100, 25.00, 13000000, 4)
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- 8. Thêm dữ liệu mẫu cho bảng applications  
INSERT INTO applications (
    application_code, ho_ten, ngay_sinh, cccd, sdt, email, dia_chi,
    noi_hoc_12, truong_thpt, ten_lop_12, nganh_id, 
    diem_hk1, diem_ca_nam, status, created_at
) VALUES 
(
    'HS1001', 'Nguyễn Văn An', '2005-03-15', '123456789012', '0912345678', 'nguyenvanan@email.com', 
    'Quận 1, TP.HCM', 'TP.HCM', 'THPT Lê Quý Đôn', '12A1', 1,
    '{"Toán": "8.5", "Văn": "7.8", "Anh": "8.2", "Lý": "8.0", "Hóa": "7.5"}',
    '{"Toán": "8.7", "Văn": "8.0", "Anh": "8.5", "Lý": "8.2", "Hóa": "7.8"}',
    'pending', NOW() - INTERVAL 2 DAY
),
(
    'HS1002', 'Trần Thị Bình', '2005-05-20', '987654321098', '0987654321', 'tranthibinh@email.com',
    'Quận 3, TP.HCM', 'TP.HCM', 'THPT Nguyễn Thị Minh Khai', '12B2', 2,
    '{"Toán": "9.0", "Văn": "9.2", "Anh": "8.8", "Lý": "7.5", "Sinh": "8.5"}',
    '{"Toán": "9.2", "Văn": "9.0", "Anh": "9.0", "Lý": "7.8", "Sinh": "8.7"}',
    'approved', NOW() - INTERVAL 1 DAY
),
(
    'HS1003', 'Lê Minh Cường', '2005-07-10', '456789123456', '0911223344', 'leminhcuong@email.com',
    'Quận 5, TP.HCM', 'TP.HCM', 'THPT Trần Phú', '12C1', 3,
    '{"Toán": "7.5", "Văn": "7.0", "Anh": "7.8", "Lý": "8.5", "Hóa": "8.0"}',
    '{"Toán": "7.8", "Văn": "7.2", "Anh": "8.0", "Lý": "8.7", "Hóa": "8.2"}',
    'pending', NOW() - INTERVAL 3 HOUR
),
(
    'HS1004', 'Phan Thị Dung', '2005-01-25', '789123456789', '0933556677', 'phanthidung@email.com',
    'Quận 7, TP.HCM', 'TP.HCM', 'THPT Mạc Đĩnh Chi', '12D3', 4,
    '{"Toán": "6.0", "Văn": "6.5", "Anh": "6.8", "Sử": "7.0", "Địa": "6.5"}',
    '{"Toán": "6.2", "Văn": "6.8", "Anh": "7.0", "Sử": "7.2", "Địa": "6.8"}',
    'rejected', NOW() - INTERVAL 5 HOUR
),
(
    'HS1005', 'Hoàng Văn Đức', '2005-09-12', '321654987123', '0923456789', 'hoangvanduc@email.com',
    'Quận 10, TP.HCM', 'TP.HCM', 'THPT Nguyễn Du', '12E1', 1,
    '{"Toán": "9.5", "Văn": "8.0", "Anh": "9.0", "Lý": "9.2", "Hóa": "8.8"}',
    '{"Toán": "9.7", "Văn": "8.2", "Anh": "9.2", "Lý": "9.5", "Hóa": "9.0"}',
    'pending', NOW() - INTERVAL 1 HOUR
)
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- Hiển thị thông báo hoàn thành
SELECT 'Database setup completed successfully!' as message;
SELECT 'Default login: admin@hutechs.edu.vn / admin123' as admin_login;
SELECT 'Default login: user1@email.com / user123' as user_login; 