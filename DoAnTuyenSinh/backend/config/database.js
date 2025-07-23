import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '16012005@',
    database: process.env.DB_NAME || 'tuyensinh',
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Test connection
const testConnection = async() => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Database connected successfully!');
        connection.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
};

export { pool, testConnection };
export default pool;