-- Migration để thêm các cột profile vào bảng users
USE tuyensinh;

-- Thêm cột avatar
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'users' 
AND COLUMN_NAME = 'avatar';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE users ADD COLUMN avatar VARCHAR(500) AFTER email', 
    'SELECT "Column avatar already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm cột bio
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'users' 
AND COLUMN_NAME = 'bio';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE users ADD COLUMN bio TEXT AFTER phone', 
    'SELECT "Column bio already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Thêm cột social
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tuyensinh' 
AND TABLE_NAME = 'users' 
AND COLUMN_NAME = 'social';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE users ADD COLUMN social VARCHAR(500) AFTER bio', 
    'SELECT "Column social already exists" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Tạo index cho avatar
CREATE INDEX IF NOT EXISTS idx_users_avatar ON users(avatar);

-- Hiển thị cấu trúc bảng users sau khi cập nhật
DESCRIBE users; 