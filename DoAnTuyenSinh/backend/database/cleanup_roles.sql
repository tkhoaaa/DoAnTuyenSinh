-- Cleanup script: Remove roles table and role_id column
-- We only need the 'role' column in users table

-- 1. Remove foreign key constraint if exists
ALTER TABLE users DROP FOREIGN KEY IF EXISTS users_ibfk_1;
ALTER TABLE users DROP FOREIGN KEY IF EXISTS fk_users_role_id;

-- 2. Drop role_id column from users table
ALTER TABLE users DROP COLUMN IF EXISTS role_id;

-- 3. Drop roles table
DROP TABLE IF EXISTS roles;

-- 4. Ensure role column has default value
ALTER TABLE users MODIFY COLUMN role VARCHAR(50) DEFAULT 'user';

-- 5. Show final structure
DESCRIBE users; 