# Hướng Dẫn Migration Từ Mock Data Sang Real Data

## Tổng Quan

Dự án đã được cập nhật để thay thế dữ liệu mẫu (mock data) bằng dữ liệu thật từ database. Các trang admin giờ đây sẽ hiển thị thông tin thực tế từ những hồ sơ mà người dùng đã nộp.

## Thay Đổi Chính

### 1. Backend APIs Mới

Đã thêm các API endpoints sau:

#### Authentication & Application APIs
- `POST /api/auth/apply` - Nộp hồ sơ xét tuyển
- `GET /api/auth/majors` - Lấy danh sách ngành học

#### Admin APIs
- `GET /api/admin/dashboard-stats` - Thống kê tổng quan dashboard
- `GET /api/admin/recent-applications` - Hồ sơ đăng ký gần đây
- `GET /api/admin/top-majors` - Top ngành học phổ biến
- `GET /api/admin/applications` - Danh sách hồ sơ với filter
- `PUT /api/admin/applications/:id/status` - Cập nhật trạng thái hồ sơ

### 2. Database Schema

#### Bảng `applications`
```sql
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_code VARCHAR(50) UNIQUE NOT NULL,
    
    -- Thông tin cá nhân
    ho_ten VARCHAR(255) NOT NULL,
    ngay_sinh DATE NOT NULL,
    cccd VARCHAR(20) NOT NULL,
    sdt VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    dia_chi TEXT,
    
    -- Thông tin học tập THPT
    noi_hoc_12 VARCHAR(255),
    truong_thpt VARCHAR(255),
    ten_lop_12 VARCHAR(100),
    
    -- Thông tin xét tuyển
    nganh_id INT,
    nganh_ids JSON,
    diem_hk1 JSON,
    diem_ca_nam JSON,
    
    -- Thông tin hệ thống
    user_id INT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    assigned_to INT,
    note TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3. Frontend Updates

#### `TongQuan.jsx`
- ✅ Thay thế mock data bằng API calls
- ✅ Thêm loading states và error handling
- ✅ Fallback to mock data nếu API fails
- ✅ Real-time data updates

#### `QuanLyHoSo.jsx`
- ✅ Kết nối với API backend
- ✅ Real-time status updates
- ✅ Dynamic major filtering
- ✅ Search và filter functionality

#### `DangKyXetTuyen.jsx`
- ✅ Sử dụng API endpoint đúng
- ✅ Proper error handling
- ✅ Form validation

## Hướng Dẫn Setup

### 1. Chạy Backend
```bash
cd backend
npm run dev
```

### 2. Setup Database
```bash
# Chạy script tạo bảng (nếu chưa có)
node check_and_create_tables.js
```

### 3. Chạy Frontend
```bash
npm run dev
```

## Tính Năng Mới

### Dashboard Admin
- **Thống kê thực tế**: Hiển thị số liệu từ database thật
- **Hồ sơ gần đây**: Danh sách hồ sơ mới nhất đã nộp
- **Top ngành học**: Thống kê ngành được đăng ký nhiều nhất
- **Loading states**: Trải nghiệm tốt hơn khi tải dữ liệu

### Quản Lý Hồ Sơ
- **Dữ liệu thật**: Hiển thị hồ sơ thực tế từ người dùng
- **Cập nhật trạng thái**: Thay đổi trạng thái hồ sơ real-time
- **Tìm kiếm nâng cao**: Filter theo tên, email, CCCD
- **Phân loại**: Filter theo trạng thái và ngành học

### Form Đăng Ký
- **API integration**: Nộp hồ sơ trực tiếp vào database
- **Validation**: Kiểm tra dữ liệu trước khi submit
- **Response handling**: Hiển thị mã hồ sơ sau khi thành công

## Dữ Liệu Mẫu

Hệ thống đã được tạo sẵn 5 hồ sơ mẫu để test:

1. **Nguyễn Văn An** - Công nghệ Thông tin (Pending)
2. **Trần Thị Bình** - Quản trị Kinh doanh (Approved)
3. **Lê Minh Cường** - Kỹ thuật Cơ khí (Pending)
4. **Phan Thị Dung** - Kế toán (Rejected)
5. **Hoàng Văn Đức** - Công nghệ Thông tin (Pending)

## Error Handling

### Fallback Strategy
Nếu API không khả dụng, frontend sẽ:
1. Hiển thị thông báo lỗi
2. Fallback về mock data
3. Vẫn maintain UI/UX tốt

### Retry Logic
- Auto retry khi network fails
- User-friendly error messages
- Graceful degradation

## Testing

### Kiểm Tra APIs
```bash
# Test dashboard stats
curl http://localhost:3001/api/admin/dashboard-stats

# Test recent applications
curl http://localhost:3001/api/admin/recent-applications

# Test top majors
curl http://localhost:3001/api/admin/top-majors
```

### Kiểm Tra Frontend
1. Vào `/admin/tong-quan` - Xem dashboard
2. Vào `/admin/quan-ly-ho-so` - Xem danh sách hồ sơ
3. Vào `/dang-ky-xet-tuyen` - Test nộp hồ sơ mới

## Lưu Ý

### Performance
- Các API calls được optimize với parallel requests
- Caching strategies được implement
- Loading states để UX tốt hơn

### Security
- Input validation on both frontend và backend
- SQL injection protection
- Error handling không expose sensitive data

### Scalability
- Database indexes được tối ưu
- API pagination ready
- Efficient queries

## Troubleshooting

### Database Connection Issues
```bash
# Kiểm tra kết nối database
node backend/config/database.js
```

### API Errors
- Check server logs in terminal
- Verify database tables exist
- Ensure proper CORS setup

### Frontend Issues
- Clear browser cache
- Check console for errors
- Verify API endpoints are correct

## Future Enhancements

1. **Real-time Updates**: WebSocket integration
2. **Advanced Analytics**: More detailed statistics
3. **Batch Operations**: Bulk approve/reject
4. **Export Features**: PDF/Excel export
5. **Audit Trail**: Track all changes
6. **Role-based Access**: Different admin levels

## Backup & Recovery

### Backup Data
```sql
-- Backup applications table
mysqldump -u username -p database_name applications > applications_backup.sql
```

### Restore Data
```sql
-- Restore from backup
mysql -u username -p database_name < applications_backup.sql
```

---

Hệ thống hiện đã hoàn toàn chuyển từ mock data sang real data, mang lại trải nghiệm quản lý chân thực và hiệu quả hơn cho admin. 