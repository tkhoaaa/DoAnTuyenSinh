# 📧 Hướng dẫn cấu hình Email cho Hệ thống Tuyển sinh HUTECH

## 🚀 Tổng quan

Hệ thống tuyển sinh HUTECH sử dụng **Nodemailer** để gửi email thông báo tự động cho các hoạt động quan trọng như:
- Đăng ký tài khoản
- Quên mật khẩu
- Nộp hồ sơ xét tuyển
- Cập nhật trạng thái hồ sơ
- Đăng ký tư vấn
- Đăng ký học bổng
- Thay đổi thông tin cá nhân

## ⚙️ Cấu hình Email

### 1. Tạo file .env

Copy file `config/env.example` thành `.env` và cập nhật thông tin:

```bash
cp config/env.example .env
```

### 2. Cấu hình Gmail (Khuyến nghị)

#### Bước 1: Bật xác thực 2 yếu tố
1. Đăng nhập vào tài khoản Gmail
2. Vào **Bảo mật** → **Xác minh 2 bước** → Bật

#### Bước 2: Tạo App Password
1. Vào **Bảo mật** → **Mật khẩu ứng dụng**
2. Chọn **Ứng dụng khác** → Đặt tên (ví dụ: "HUTECH Admission")
3. Copy mật khẩu được tạo

#### Bước 3: Cập nhật .env
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM_NAME=HUTECH Tuyển sinh
```

### 3. Cấu hình Email khác

#### Outlook/Hotmail
```env
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

#### Yahoo
```env
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-app-password
```

#### SMTP tùy chỉnh
```env
EMAIL_SERVICE=custom
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@domain.com
EMAIL_PASSWORD=your-password
```

## 🔧 Cấu hình nâng cao

### Bảo mật
```env
# Thời gian hết hạn token đặt lại mật khẩu (phút)
PASSWORD_RESET_EXPIRY=60

# Số email tối đa mỗi giờ
MAX_EMAILS_PER_HOUR=10

# Thời gian chờ giữa các email (giây)
EMAIL_COOLDOWN=60
```

### Logging
```env
# Bật ghi log email
EMAIL_LOGGING=true

# Lưu email vào database
EMAIL_SAVE_TO_DB=false
```

## 🧪 Kiểm tra cấu hình

### 1. Test kết nối email
```bash
npm run test:email
```

### 2. Test gửi email
```javascript
import { testEmailConnection } from './services/emailService.js';

const isConnected = await testEmailConnection();
console.log('Email connection:', isConnected);
```

## 📧 Các loại email được gửi

### 1. Đăng ký tài khoản
- **Trigger:** Sau khi đăng ký thành công
- **Nội dung:** Chào mừng, thông tin tài khoản, hướng dẫn

### 2. Quên mật khẩu
- **Trigger:** Khi yêu cầu đặt lại mật khẩu
- **Nội dung:** Link đặt lại mật khẩu, cảnh báo bảo mật

### 3. Nộp hồ sơ xét tuyển
- **Trigger:** Sau khi nộp hồ sơ thành công
- **Nội dung:** Xác nhận, mã hồ sơ, hướng dẫn tra cứu

### 4. Cập nhật trạng thái hồ sơ
- **Trigger:** Khi admin thay đổi trạng thái
- **Nội dung:** Trạng thái mới, lý do (nếu từ chối)

### 5. Đăng ký tư vấn
- **Trigger:** Sau khi đăng ký tư vấn thành công
- **Nội dung:** Xác nhận, thời gian phản hồi

### 6. Đăng ký học bổng
- **Trigger:** Sau khi nộp đơn học bổng
- **Nội dung:** Xác nhận, quy trình xét duyệt

### 7. Thay đổi thông tin cá nhân
- **Trigger:** Khi cập nhật email, mật khẩu, avatar
- **Nội dung:** Xác nhận thay đổi, cảnh báo bảo mật

## 🚨 Xử lý lỗi

### Lỗi thường gặp

#### 1. "Invalid login"
- **Nguyên nhân:** Sai email hoặc mật khẩu
- **Giải pháp:** Kiểm tra lại thông tin đăng nhập

#### 2. "Less secure app access"
- **Nguyên nhân:** Gmail chặn ứng dụng không an toàn
- **Giải pháp:** Sử dụng App Password thay vì mật khẩu thường

#### 3. "Connection timeout"
- **Nguyên nhân:** Firewall hoặc cấu hình mạng
- **Giải pháp:** Kiểm tra cấu hình SMTP port

#### 4. "Rate limit exceeded"
- **Nguyên nhân:** Gửi quá nhiều email
- **Giải pháp:** Tăng `EMAIL_COOLDOWN` hoặc `MAX_EMAILS_PER_HOUR`

### Debug mode
```env
NODE_ENV=development
EMAIL_LOGGING=true
```

## 📊 Monitoring

### Log email
```javascript
// Trong emailService.js
console.log(`Email sent to ${userEmail}: ${templateName}`);
```

### Database logging (tùy chọn)
```sql
CREATE TABLE email_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recipient VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    template VARCHAR(100) NOT NULL,
    status ENUM('sent', 'failed') NOT NULL,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Bảo mật

### Best practices
1. **Không commit file .env** vào git
2. **Sử dụng App Password** thay vì mật khẩu thường
3. **Giới hạn số lượng email** để tránh spam
4. **Mã hóa thông tin nhạy cảm** trong email
5. **Logging có kiểm soát** để tránh lộ thông tin

### Environment variables
```env
# Production
NODE_ENV=production
EMAIL_SECURE=true
EMAIL_LOGGING=false

# Development
NODE_ENV=development
EMAIL_SECURE=false
EMAIL_LOGGING=true
```

## 📞 Hỗ trợ

Nếu gặp vấn đề với cấu hình email:
1. Kiểm tra log lỗi trong console
2. Xác minh cấu hình SMTP
3. Test kết nối email
4. Liên hệ admin để được hỗ trợ

---

**Lưu ý:** Đảm bảo cấu hình email trước khi deploy lên production để hệ thống hoạt động đầy đủ! 