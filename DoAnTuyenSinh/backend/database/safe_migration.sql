-- Safe Migration for existing 'tuyensinh' database
USE tuyensinh;

-- 1. Tạo bảng roles (đã có rồi, skip)
-- CREATE TABLE IF NOT EXISTS roles...

-- 2. Cập nhật bảng users một cách an toàn
-- Kiểm tra và thêm cột full_name
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'users' 
AND COLUMN_NAME = 'full_name';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE users ADD COLUMN full_name VARCHAR(255) AFTER email', 
    'SELECT "Column full_name already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm cột phone
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'users' 
AND COLUMN_NAME = 'phone';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE users ADD COLUMN phone VARCHAR(20) AFTER full_name', 
    'SELECT "Column phone already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm cột role_id
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'users' 
AND COLUMN_NAME = 'role_id';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE users ADD COLUMN role_id INT DEFAULT 2 AFTER role', 
    'SELECT "Column role_id already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm cột is_active
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'users' 
AND COLUMN_NAME = 'is_active';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT TRUE AFTER role_id', 
    'SELECT "Column is_active already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm cột email_verified
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'users' 
AND COLUMN_NAME = 'email_verified';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE AFTER is_active', 
    'SELECT "Column email_verified already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm cột created_at cho users
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'users' 
AND COLUMN_NAME = 'created_at';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER email_verified', 
    'SELECT "Column created_at already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm cột updated_at cho users
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'users' 
AND COLUMN_NAME = 'updated_at';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at', 
    'SELECT "Column updated_at already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Cập nhật dữ liệu users
UPDATE users SET role_id = 1 WHERE role = 'admin' AND role_id IS NULL;
UPDATE users SET role_id = 2 WHERE role = 'user' AND role_id IS NULL;
UPDATE users SET role_id = 2 WHERE role_id IS NULL OR role_id = 0;
UPDATE users SET full_name = username WHERE full_name IS NULL OR full_name = '';
UPDATE users SET is_active = TRUE WHERE is_active IS NULL;
UPDATE users SET email_verified = FALSE WHERE email_verified IS NULL;

-- 3. Tạo bảng admin_users
CREATE TABLE IF NOT EXISTS admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    department VARCHAR(100) DEFAULT 'Phòng Đào tạo',
    position VARCHAR(100) DEFAULT 'Nhân viên',
    permissions JSON,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tạo bảng admission_methods
CREATE TABLE IF NOT EXISTS admission_methods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    requirements JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Thêm dữ liệu mẫu
INSERT IGNORE INTO admission_methods (id, name, description) VALUES
(1, 'Học bạ THPT', 'Xét tuyển dựa trên điểm trung bình học bạ 3 năm THPT'),
(2, 'Điểm thi THPT', 'Xét tuyển dựa trên điểm thi tốt nghiệp THPT'),
(3, 'Điểm ĐGNL', 'Xét tuyển dựa trên điểm đánh giá năng lực'),
(4, 'Xét tuyển thẳng', 'Xét tuyển thẳng cho thí sinh có thành tích xuất sắc');

-- 5. Tạo bảng faqs
CREATE TABLE IF NOT EXISTS faqs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    view_count INT DEFAULT 0,
    sort_order INT DEFAULT 0,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. Tạo bảng contacts
CREATE TABLE IF NOT EXISTS contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status ENUM('new', 'in_progress', 'resolved') DEFAULT 'new',
    assigned_to INT NULL,
    response TEXT,
    responded_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Tạo bảng notifications
CREATE TABLE IF NOT EXISTS notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 8. Tạo bảng admission_results
CREATE TABLE IF NOT EXISTS admission_results (
    id INT PRIMARY KEY AUTO_INCREMENT,
    application_id INT NOT NULL,
    result ENUM('passed', 'failed', 'waitlist') NOT NULL,
    score DECIMAL(5,2),
    notes TEXT,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Tạo bảng activity_logs
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(255) NOT NULL,
    table_name VARCHAR(100),
    record_id INT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Cập nhật bảng hoso - thêm từng cột một cách an toàn

-- Thêm application_code
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'hoso' 
AND COLUMN_NAME = 'application_code';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE hoso ADD COLUMN application_code VARCHAR(50) AFTER id', 
    'SELECT "Column application_code already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm user_id
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'hoso' 
AND COLUMN_NAME = 'user_id';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE hoso ADD COLUMN user_id INT AFTER application_code', 
    'SELECT "Column user_id already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm major_id
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'hoso' 
AND COLUMN_NAME = 'major_id';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE hoso ADD COLUMN major_id INT AFTER user_id', 
    'SELECT "Column major_id already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm status
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'hoso' 
AND COLUMN_NAME = 'status';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE hoso ADD COLUMN status ENUM("pending", "approved", "rejected", "incomplete") DEFAULT "pending"', 
    'SELECT "Column status already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm assigned_to
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'hoso' 
AND COLUMN_NAME = 'assigned_to';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE hoso ADD COLUMN assigned_to INT NULL', 
    'SELECT "Column assigned_to already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm review_notes
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'hoso' 
AND COLUMN_NAME = 'review_notes';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE hoso ADD COLUMN review_notes TEXT', 
    'SELECT "Column review_notes already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm created_at cho hoso
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'hoso' 
AND COLUMN_NAME = 'created_at';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE hoso ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP', 
    'SELECT "Column created_at already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm updated_at cho hoso
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'hoso' 
AND COLUMN_NAME = 'updated_at';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE hoso ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', 
    'SELECT "Column updated_at already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 11. Cập nhật dữ liệu hoso
UPDATE hoso SET application_code = CONCAT('HS', YEAR(NOW()), LPAD(id, 6, '0')) 
WHERE application_code IS NULL OR application_code = '';

UPDATE hoso SET major_id = nganh_id WHERE major_id IS NULL AND nganh_id IS NOT NULL;

-- 12. Thêm dữ liệu mẫu cho FAQs
INSERT IGNORE INTO faqs (question, answer, category) VALUES
('HUTECHS tuyển sinh những ngành nào?', 'Trường tuyển sinh đa ngành với 61 ngành đào tạo từ trình độ đại học đến tiến sĩ', 'Tuyển sinh'),
('Học phí năm 2025 là bao nhiêu?', 'Học phí dao động từ 22-26 triệu đồng/năm tùy theo ngành học', 'Học phí'),
('Có những loại học bổng nào?', 'HUTECHS có học bổng tài năng, khuyến khích, hỗ trợ và học bổng đặc biệt', 'Học bổng'),
('Thời gian nộp hồ sơ là khi nào?', 'Thời gian nộp hồ sơ từ tháng 3 đến tháng 8 hàng năm', 'Tuyển sinh'),
('Có cần thi đầu vào không?', 'Tùy theo phương thức xét tuyển, có thể xét học bạ hoặc điểm thi THPT', 'Tuyển sinh');

-- 13. Tạo user admin mặc định nếu chưa có
INSERT IGNORE INTO users (email, password, username, full_name, role, role_id, is_active) VALUES
('admin@HUTECHS.edu.vn', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'Quản trị viên hệ thống', 'admin', 1, TRUE);

-- 14. Tạo admin_users record cho admin users
INSERT IGNORE INTO admin_users (user_id, department, position, permissions)
SELECT 
    id, 
    'Phòng Đào tạo', 
    CASE 
        WHEN username = 'admin' THEN 'Quản trị viên hệ thống'
        ELSE 'Nhân viên tuyển sinh'
    END,
    CASE 
        WHEN username = 'admin' THEN '["full_access"]'
        ELSE '["basic_access"]'
    END
FROM users 
WHERE role_id = 1;

-- 15. Thêm indexes
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_hoso_status ON hoso(status);
CREATE INDEX IF NOT EXISTS idx_hoso_nganh ON hoso(nganh_id);
CREATE INDEX IF NOT EXISTS idx_hoso_major ON hoso(major_id);

-- Completed migration message
SELECT 'Safe migration completed successfully!' as message;
SELECT 'Database structure updated!' as status; 