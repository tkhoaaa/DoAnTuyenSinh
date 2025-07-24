import mysql from 'mysql2/promise';
import dbConfig from '../config/database.js';

class DeviceService {
    constructor() {
        this.pool = mysql.createPool(dbConfig);
    }

    // Tạo session mới cho thiết bị
    async createDeviceSession(userId, sessionData) {
        const connection = await this.pool.getConnection();
        try {
            const {
                sessionToken,
                deviceName,
                deviceType,
                browser,
                os,
                ipAddress,
                location,
                expiresAt
            } = sessionData;

            const query = `
        INSERT INTO device_sessions 
        (user_id, session_token, device_name, device_type, browser, os, ip_address, location, expires_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

            await connection.execute(query, [
                userId,
                sessionToken,
                deviceName,
                deviceType,
                browser,
                os,
                ipAddress,
                location,
                expiresAt
            ]);

            return true;
        } catch (error) {
            console.error('Error creating device session:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    // Lấy danh sách thiết bị của user
    async getUserDevices(userId) {
        const connection = await this.pool.getConnection();
        try {
            const query = `
        SELECT 
          id, device_name, device_type, browser, os, ip_address, location,
          is_active, last_activity, created_at, expires_at
        FROM device_sessions 
        WHERE user_id = ? 
        ORDER BY last_activity DESC
      `;

            const [rows] = await connection.execute(query, [userId]);
            return rows;
        } catch (error) {
            console.error('Error getting user devices:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    // Vô hiệu hóa thiết bị
    async deactivateDevice(sessionToken) {
        const connection = await this.pool.getConnection();
        try {
            const query = `
        UPDATE device_sessions 
        SET is_active = FALSE 
        WHERE session_token = ?
      `;

            const [result] = await connection.execute(query, [sessionToken]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deactivating device:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    // Vô hiệu hóa tất cả thiết bị của user (trừ thiết bị hiện tại)
    async deactivateOtherDevices(userId, currentSessionToken) {
        const connection = await this.pool.getConnection();
        try {
            const query = `
        UPDATE device_sessions 
        SET is_active = FALSE 
        WHERE user_id = ? AND session_token != ?
      `;

            const [result] = await connection.execute(query, [userId, currentSessionToken]);
            return result.affectedRows;
        } catch (error) {
            console.error('Error deactivating other devices:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    // Cập nhật hoạt động cuối cùng
    async updateLastActivity(sessionToken) {
        const connection = await this.pool.getConnection();
        try {
            const query = `
        UPDATE device_sessions 
        SET last_activity = CURRENT_TIMESTAMP 
        WHERE session_token = ?
      `;

            await connection.execute(query, [sessionToken]);
        } catch (error) {
            console.error('Error updating last activity:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    // Ghi log hoạt động
    async logActivity(activityData) {
        const connection = await this.pool.getConnection();
        try {
            const {
                userId,
                action,
                description,
                ipAddress,
                userAgent,
                deviceInfo,
                status = 'success'
            } = activityData;

            const query = `
        INSERT INTO activity_logs 
        (user_id, action, description, ip_address, user_agent, device_info, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

            await connection.execute(query, [
                userId,
                action,
                description,
                ipAddress,
                userAgent,
                JSON.stringify(deviceInfo),
                status
            ]);
        } catch (error) {
            console.error('Error logging activity:', error);
            // Không throw error để không ảnh hưởng đến luồng chính
        } finally {
            connection.release();
        }
    }

    // Lấy lịch sử hoạt động của user
    async getUserActivityLogs(userId, limit = 50) {
        const connection = await this.pool.getConnection();
        try {
            const query = `
        SELECT 
          id, action, description, ip_address, user_agent, device_info,
          status, created_at
        FROM activity_logs 
        WHERE user_id = ? 
        ORDER BY created_at DESC 
        LIMIT ?
      `;

            const [rows] = await connection.execute(query, [userId, limit]);
            return rows.map(row => ({
                ...row,
                device_info: row.device_info ? JSON.parse(row.device_info) : null
            }));
        } catch (error) {
            console.error('Error getting user activity logs:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    // Xóa session hết hạn
    async cleanupExpiredSessions() {
        const connection = await this.pool.getConnection();
        try {
            const query = `
        DELETE FROM device_sessions 
        WHERE expires_at < CURRENT_TIMESTAMP
      `;

            const [result] = await connection.execute(query);
            return result.affectedRows;
        } catch (error) {
            console.error('Error cleaning up expired sessions:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    // Lấy thông tin thiết bị từ User-Agent
    getDeviceInfo(userAgent) {
        if (!userAgent) return { deviceType: 'unknown', browser: 'Unknown', os: 'Unknown' };

        const ua = userAgent.toLowerCase();

        // Detect device type
        let deviceType = 'unknown';
        if (ua.includes('mobile')) deviceType = 'mobile';
        else if (ua.includes('tablet')) deviceType = 'tablet';
        else if (ua.includes('windows') || ua.includes('macintosh') || ua.includes('linux')) deviceType = 'desktop';

        // Detect browser
        let browser = 'Unknown';
        if (ua.includes('chrome')) browser = 'Chrome';
        else if (ua.includes('firefox')) browser = 'Firefox';
        else if (ua.includes('safari')) browser = 'Safari';
        else if (ua.includes('edge')) browser = 'Edge';
        else if (ua.includes('opera')) browser = 'Opera';

        // Detect OS
        let os = 'Unknown';
        if (ua.includes('windows')) os = 'Windows';
        else if (ua.includes('macintosh') || ua.includes('mac os')) os = 'macOS';
        else if (ua.includes('linux')) os = 'Linux';
        else if (ua.includes('android')) os = 'Android';
        else if (ua.includes('ios')) os = 'iOS';

        return { deviceType, browser, os };
    }
}

export default new DeviceService();