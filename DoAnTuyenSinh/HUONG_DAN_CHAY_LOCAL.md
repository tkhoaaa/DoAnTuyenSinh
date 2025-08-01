# 🚀 Hướng dẫn chạy dự án Local với dữ liệu thực

## 📋 Yêu cầu hệ thống
- Node.js (v16 trở lên)
- MySQL Server
- Git

## 🔧 Cài đặt và khởi động

### Bước 1: Cài đặt dependencies
```bash
# Cài đặt dependencies cho frontend
npm install

# Cài đặt dependencies cho backend
cd backend
npm install
cd ..
```

### Bước 2: Cấu hình Database
1. Khởi động MySQL Server
2. Tạo database mới (nếu chưa có):
```sql
CREATE DATABASE hutechss_admission;
```

### Bước 3: Khởi động dự án

#### Cách 1: Khởi động cả Frontend + Backend cùng lúc (Khuyến nghị)
```bash
# Cài đặt concurrently nếu chưa có
npm install

# Khởi động cả frontend và backend
npm run dev:full
```

#### Cách 2: Khởi động riêng biệt
```bash
# Terminal 1: Khởi động Backend
npm run dev:backend

# Terminal 2: Khởi động Frontend  
npm run dev
```

#### Cách 3: Khởi động thủ công
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
npm run dev
```

## 🌐 Truy cập ứng dụng

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📊 Dashboard - Dữ liệu thực vs Demo

### ✅ Khi Backend đang chạy:
- Dashboard sẽ hiển thị **dữ liệu thực** từ database
- Có thông báo màu xanh: "✅ Kết nối Backend API thành công"
- Tất cả thống kê được lấy từ database thực

### ⚠️ Khi Backend không chạy:
- Dashboard sẽ tự động fallback sang **dữ liệu mẫu**
- Có thông báo màu vàng với hướng dẫn khởi động backend
- Nút "🔄 Thử lại" để kiểm tra kết nối lại

### 🔧 Demo Mode (chỉ dành cho Vercel):
- Demo mode chỉ được kích hoạt khi deploy trên Vercel
- Khi chạy local, luôn ưu tiên dữ liệu thực từ API

## 🐛 Xử lý sự cố

### Backend không khởi động được:
1. Kiểm tra MySQL Server đã chạy chưa
2. Kiểm tra cấu hình database trong `backend/config/`
3. Xem log lỗi trong terminal

### Frontend không kết nối được Backend:
1. Đảm bảo backend đang chạy trên port 3001
2. Kiểm tra CORS settings
3. Xem Network tab trong Developer Tools

### Database connection error:
1. Kiểm tra MySQL credentials
2. Đảm bảo database `hutechss_admission` đã được tạo
3. Kiểm tra MySQL service đang chạy

## 📝 Scripts có sẵn

```bash
npm run dev              # Chỉ chạy frontend
npm run dev:backend      # Chỉ chạy backend  
npm run dev:full         # Chạy cả frontend + backend
npm run start:backend    # Chạy backend production mode
npm run build            # Build frontend cho production
```

## 🎯 Lưu ý quan trọng

1. **Luôn khởi động Backend trước** để Dashboard hiển thị dữ liệu thực
2. **Demo mode chỉ dành cho Vercel**, không áp dụng khi chạy local
3. **Database phải được setup** trước khi khởi động backend
4. **Port 3001 và 5173** phải available

---

💡 **Tip**: Sử dụng `npm run dev:full` để tiết kiệm thời gian khởi động! 