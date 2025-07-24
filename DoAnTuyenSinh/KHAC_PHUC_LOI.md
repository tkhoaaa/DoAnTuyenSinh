# 🛠️ Hướng dẫn Khắc phục Lỗi

## 🚨 **Vấn đề hiện tại**

1. ❌ **Lỗi SQL**: "Incorrect arguments to mysqld_stmt_execute"
2. ❌ **Trang QuanLyHoSo.jsx** không hiển thị dữ liệu hồ sơ
3. ❌ **Database chưa đầy đủ** bảng cần thiết

## ✅ **Giải pháp (đã được sửa)**

### **1. Đã sửa lỗi SQL trong Backend**
```javascript
// File: backend/index.js (dòng 490)
// ✅ Đã sửa parameter handling cho MySQL query
const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 20));
const pageNum = Math.max(1, parseInt(page) || 1);
const offsetNum = (pageNum - 1) * limitNum;
const mainParams = [...queryParams, limitNum, offsetNum];
```

### **2. Đã sửa Frontend QuanLyHoSo.jsx**
```javascript
// ✅ Đã thay đổi logic fetch dữ liệu:
// - Fetch trực tiếp từ API thay vì filter local
// - Thêm debounce cho search
// - Auto-refresh khi filter thay đổi
useEffect(() => {
    fetchApplications();
}, [statusFilter, majorFilter, debouncedSearchTerm]);
```

## 📋 **Các bước thực hiện**

### **Bước 1: Thiết lập Database**

1. **Mở MySQL Workbench** hoặc **MySQL CLI**

2. **Tạo database** (nếu chưa có):
```sql
CREATE DATABASE tuyensinh CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. **Chạy script thiết lập hoàn chỉnh**:
```sql
-- Chạy file: backend/database/setup_complete_database.sql
-- Script này sẽ tạo tất cả bảng cần thiết + dữ liệu mẫu
```

### **Bước 2: Cấu hình Environment**

1. **Tạo file `.env`** trong thư mục `backend/`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=tuyensinh
DB_PORT=3306
```

### **Bước 3: Khởi động hệ thống**

1. **Cài đặt dependencies** (nếu chưa):
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

2. **Khởi động Backend**:
```bash
cd backend
node index.js
```

3. **Khởi động Frontend** (terminal mới):
```bash
npm run dev
```

### **Bước 4: Test hệ thống**

1. **Truy cập ứng dụng**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

2. **Đăng nhập Admin**:
   - Email: `admin@HUTECHS.edu.vn`
   - Password: `admin123`

3. **Test tính năng**:
   - Vào `/admin/quan-ly-ho-so` để xem danh sách hồ sơ
   - Test search, filter, status update

## 🗄️ **Schema Database hoàn chỉnh**

Sau khi chạy script, bạn sẽ có:

### **Bảng chính:**
1. **`users`** - Người dùng (admin/user)
2. **`nganh`** - Ngành học
3. **`applications`** - Hồ sơ xét tuyển
4. **`scholarship_applications`** - Đăng ký học bổng
5. **`consult_requests`** - Yêu cầu tư vấn

### **Dữ liệu mẫu:**
- ✅ **5 ngành học** (CNTT, QTKD, KTCK, KT, TCNH)
- ✅ **2 users** (admin + user thường)
- ✅ **5 hồ sơ mẫu** với các trạng thái khác nhau
- ✅ **Passwords đã hash** với bcrypt

## 🔐 **Tài khoản mặc định**

### **Admin Account:**
- **Email**: `admin@HUTECHS.edu.vn`
- **Password**: `admin123`
- **Role**: `admin`

### **User Account:**
- **Email**: `user1@email.com`
- **Password**: `user123`
- **Role**: `user`

## 🧪 **Kiểm tra hoạt động**

### **1. Test API Endpoints:**
```bash
# Health check
curl http://localhost:3001/health

# Login test
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"admin@HUTECHS.edu.vn","password":"admin123"}'

# Applications list
curl http://localhost:3001/api/admin/applications
```

### **2. Test Frontend:**
1. ✅ **Trang chủ** hiển thị bình thường
2. ✅ **Đăng nhập** với tài khoản admin
3. ✅ **Admin Dashboard** hiển thị thống kê
4. ✅ **Quản lý hồ sơ** hiển thị danh sách và filter hoạt động
5. ✅ **Search** và **Status update** hoạt động

## 🚀 **Tính năng đã hoạt động**

### **Admin Dashboard:**
- ✅ Thống kê tổng quan với số liệu thực
- ✅ Danh sách hồ sơ với pagination
- ✅ Search theo tên, email, CCCD
- ✅ Filter theo trạng thái và ngành
- ✅ Update trạng thái hồ sơ (approve/reject)
- ✅ View chi tiết hồ sơ trong modal
- ✅ Modern UI với animations

### **User Features:**
- ✅ Đăng ký xét tuyển đa ngành
- ✅ Đăng ký tư vấn và học bổng
- ✅ Tra cứu kết quả
- ✅ FAQ và liên hệ

## 🔧 **Troubleshooting**

### **Nếu vẫn gặp lỗi Database:**

1. **Kiểm tra MySQL đang chạy**:
```bash
# Windows
net start mysql

# Mac/Linux
sudo systemctl start mysql
```

2. **Kiểm tra connection**:
```bash
mysql -u root -p -e "SHOW DATABASES;"
```

3. **Reset database**:
```sql
DROP DATABASE IF EXISTS tuyensinh;
CREATE DATABASE tuyensinh CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- Sau đó chạy lại script setup_complete_database.sql
```

### **Nếu Frontend không kết nối được Backend:**

1. **Kiểm tra Backend đang chạy** trên port 3001
2. **Kiểm tra CORS** - đã cấu hình cho localhost:5173
3. **Clear browser cache** và reload

### **Nếu QuanLyHoSo vẫn trống:**

1. **Kiểm tra API response**:
```bash
curl http://localhost:3001/api/admin/applications
```

2. **Kiểm tra Console** trong Developer Tools
3. **Verify database** có dữ liệu mẫu

## 📝 **Ghi chú**

- ⚡ **Performance**: API có pagination và debounced search
- 🔒 **Security**: Passwords được hash với bcrypt
- 🎨 **UI/UX**: Modern design với Framer Motion animations
- 📱 **Responsive**: Hoạt động tốt trên mobile và desktop
- 🗄️ **Database**: Normalized schema với proper indexes

## 🆘 **Liên hệ hỗ trợ**

Nếu vẫn gặp vấn đề, vui lòng:
1. Kiểm tra **Console logs** trong browser
2. Kiểm tra **Backend logs** trong terminal
3. Gửi **error messages** cụ thể để được hỗ trợ

---

*Hệ thống đã được sửa và test hoàn chỉnh! 🎉* 