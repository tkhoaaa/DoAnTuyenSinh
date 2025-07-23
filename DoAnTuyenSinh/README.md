# 🎓 Hệ thống Tuyển sinh HUTECHS

Một hệ thống quản lý tuyển sinh trực tuyến hoàn chỉnh cho trường Đại học Công nghệ TP.HCM (HUTECHS), xây dựng bằng **React.js** và **Node.js**.

## 📋 Mục lục

- [🎯 Giới thiệu](#-giới-thiệu)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [🏗️ Kiến trúc hệ thống](#️-kiến-trúc-hệ-thống)
- [📁 Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [⚙️ Cài đặt và chạy](#️-cài-đặt-và-chạy)
- [🔧 Cấu hình Database](#-cấu-hình-database)
- [📊 Chức năng chính](#-chức-năng-chính)
- [🔐 Hệ thống Authentication](#-hệ-thống-authentication)
- [📱 API Endpoints](#-api-endpoints)
- [🎨 Frontend Components](#-frontend-components)
- [🏛️ Admin Dashboard](#️-admin-dashboard)
- [🗄️ Database Schema](#️-database-schema)
- [🚀 Deploy](#-deploy)

## 🎯 Giới thiệu

Hệ thống Tuyển sinh HUTECHS là một ứng dụng web full-stack cho phép:

- **Thí sinh**: Đăng ký xét tuyển, theo dõi hồ sơ, xem thông tin tuyển sinh
- **Admin**: Quản lý hồ sơ, FAQ, thông tin tuyển sinh, báo cáo thống kê
- **Công chúng**: Xem thông tin tuyển sinh, FAQ, liên hệ

## 🛠️ Công nghệ sử dụng

### Frontend
- **React.js 18** - UI Framework
- **Vite** - Build tool & Development server
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client
- **React Helmet Async** - SEO management
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **bcrypt** - Password hashing
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **multer** - File upload handling

### Database
- **MySQL 8.0** - Relational database
- **MySQL Workbench** - Database management

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Cursor AI** - AI-powered code editor

## 🏗️ Kiến trúc hệ thống

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│                 │◄──────────────────►│                 │
│   React.js      │                     │   Express.js    │
│   Frontend      │                     │   Backend       │
│   (Port 5173)   │                     │   (Port 3001)   │
└─────────────────┘                     └─────────────────┘
                                                 │
                                                 │ MySQL2
                                                 ▼
                                        ┌─────────────────┐
                                        │                 │
                                        │   MySQL 8.0     │
                                        │   Database      │
                                        │   (Port 3306)   │
                                        └─────────────────┘
```

**Mô hình:** 3-tier Architecture (Presentation - Logic - Data)

## 📁 Cấu trúc thư mục

```
DoAnTuyenSinh/
├── 📁 backend/                    # Backend Node.js
│   ├── 📁 config/
│   │   └── database.js           # Cấu hình MySQL connection
│   ├── 📁 database/
│   │   ├── safe_migration.sql    # Script migration an toàn
│   │   └── cleanup_roles.sql     # Script cleanup roles table
│   ├── 📁 routes/
│   │   └── simple_auth.js        # Authentication routes
│   ├── 📁 uploads/               # Thư mục upload files
│   ├── index.js                  # Entry point server
│   ├── package.json              # Dependencies backend
│   └── .env                      # Environment variables
│
├── 📁 src/                       # Frontend React
│   ├── 📁 accounts/              # Authentication components
│   │   ├── DangNhap.jsx         # Login page
│   │   ├── DangKyTaiKhoan.jsx   # User registration
│   │   ├── DangKyTaiKhoanAdmin.jsx # Admin registration
│   │   ├── QuenMatKhau.jsx      # Forgot password
│   │   └── UserContext.jsx      # Authentication context
│   │
│   ├── 📁 admin/                 # Admin dashboard
│   │   ├── 📁 components/
│   │   │   └── AdminLayout.jsx   # Admin layout wrapper
│   │   └── 📁 pages/
│   │       ├── TongQuan.jsx      # Overview dashboard
│   │       ├── QuanLyHoSo.jsx    # Application management
│   │       └── QuanLyFAQ.jsx     # FAQ management
│   │
│   ├── 📁 components/            # Shared components
│   │   ├── ThanhHeader.jsx       # Main header
│   │   ├── ChanTrang.jsx         # Footer
│   │   ├── SEO.jsx               # SEO component
│   │   ├── StructuredData.jsx    # Schema markup
│   │   └── OptimizedImage.jsx    # Optimized images
│   │
│   ├── 📁 pages/                 # Public pages
│   │   ├── TrangChu.jsx          # Homepage
│   │   ├── DangKyXetTuyen.jsx    # Application form
│   │   ├── TraCuuKetQua.jsx      # Result lookup
│   │   ├── ThongTinTuyenSinh.jsx # Admission info
│   │   ├── FAQ.jsx               # FAQ page
│   │   └── LienHe.jsx            # Contact page
│   │
│   ├── 📁 config/
│   │   └── siteConfig.js         # Site configuration
│   ├── 📁 utils/
│   │   └── apiClient.js          # API client functions
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # Entry point
│
├── 📁 public/                    # Static assets
├── 📁 css/                       # CSS files
├── package.json                  # Frontend dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
└── README.md                    # This file
```

## ⚙️ Cài đặt và chạy

### 1. Clone repository
```bash
git clone <repository-url>
cd DoAnTuyenSinh
```

### 2. Cài đặt dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 3. Cấu hình môi trường

Tạo file `.env` trong thư mục `backend/`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tuyensinh
DB_PORT=3306
```

### 4. Chạy ứng dụng

**Backend (Terminal 1):**
```bash
cd backend
node index.js
```

**Frontend (Terminal 2):**
```bash
npm run dev
```

**Truy cập:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 🔧 Cấu hình Database

### 1. Tạo database
```sql
CREATE DATABASE tuyensinh CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Chạy migration
```bash
# Trong MySQL Workbench, chạy file:
backend/database/safe_migration.sql
```

### 3. Cleanup (nếu cần)
```bash
# Xóa bảng roles không cần thiết:
backend/database/cleanup_roles.sql
```

### 4. Schema chính

**Bảng `users`:**
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  role VARCHAR(50) DEFAULT 'user',
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Bảng `nganh` (Ngành học):**
```sql
CREATE TABLE nganh (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ten_nganh VARCHAR(255) NOT NULL,
  ma_nganh VARCHAR(20) NOT NULL
);
```

**Bảng `hoso` (Hồ sơ xét tuyển):**
```sql
CREATE TABLE hoso (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_code VARCHAR(50) UNIQUE,
  user_id INT,
  ho_ten VARCHAR(255) NOT NULL,
  ngay_sinh DATE,
  cccd VARCHAR(20),
  email VARCHAR(255),
  nganh_id INT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (nganh_id) REFERENCES nganh(id)
);
```

## 📊 Chức năng chính

### 🎯 Cho thí sinh (User)
- ✅ Đăng ký tài khoản
- ✅ Đăng nhập/Đăng xuất
- ✅ Đăng ký xét tuyển (chọn tối đa 5 ngành)
- ✅ Nhập điểm học bạ (HK1, Cả năm)
- ✅ Upload hồ sơ (học bạ, CCCD)
- ✅ Tra cứu kết quả
- ✅ Xem thông tin tuyển sinh
- ✅ Đọc FAQ
- ✅ Liên hệ hỗ trợ

### 👑 Cho Admin
- ✅ Dashboard tổng quan
- ✅ Quản lý hồ sơ xét tuyển
- ✅ Quản lý FAQ
- ✅ Quản lý thông tin tuyển sinh
- ✅ Thống kê báo cáo
- ✅ Role-based access control

### 🌐 Cho công chúng
- ✅ Xem thông tin tuyển sinh
- ✅ Đọc FAQ
- ✅ Liên hệ
- ✅ SEO optimized
- ✅ Responsive design

## 🔐 Hệ thống Authentication

### Mô hình: Simple Session-based Auth
- **Không sử dụng JWT** (đã được remove để đơn giản hóa)
- **Lưu trữ**: localStorage cho session management
- **Bảo mật**: bcrypt cho hash password
- **Role system**: 'user' và 'admin' trong database

### Flow đăng nhập:
```
1. User nhập email/password
2. Backend kiểm tra trong database
3. So sánh password với bcrypt
4. Trả về user info + role
5. Frontend lưu vào localStorage
6. Redirect theo role (admin → dashboard, user → homepage)
```

### Bảo vệ routes:
- **Admin routes**: Kiểm tra `role === 'admin'`
- **Protected actions**: Kiểm tra `userId` trong localStorage

## 📱 API Endpoints

### 🔐 Authentication
```
POST /api/auth/login              # Đăng nhập
POST /api/auth/register           # Đăng ký user
POST /api/auth/register-admin     # Đăng ký admin
GET  /api/auth/user/:id           # Lấy thông tin user
```

### 🎓 Tuyển sinh
```
GET  /api/auth/majors             # Danh sách ngành học
GET  /api/auth/admission-methods  # Phương thức xét tuyển
POST /api/auth/apply              # Đăng ký xét tuyển
GET  /api/auth/applications/:userId # Hồ sơ của user
```

### ❓ FAQ & Support
```
GET  /api/auth/faqs               # Danh sách FAQ
POST /api/auth/contact            # Gửi liên hệ
```

### 🏥 Health check
```
GET  /api/auth/health             # Kiểm tra API
GET  /health                      # Kiểm tra server
```

## 🎨 Frontend Components

### 🔧 Core Components
- **`App.jsx`**: Main router với public/admin routes
- **`UserContext.jsx`**: Global authentication state
- **`ThanhHeader.jsx`**: Navigation header với role-based menu
- **`ChanTrang.jsx`**: Footer component

### 📄 Page Components
- **`TrangChu.jsx`**: Homepage với hero section
- **`DangKyXetTuyen.jsx`**: Multi-step application form
- **`TraCuuKetQua.jsx`**: Result lookup with search
- **`FAQ.jsx`**: Searchable FAQ page
- **`LienHe.jsx`**: Contact form

### 🎭 Animation & UX
- **Framer Motion**: Page transitions, hover effects
- **Loading states**: Skeleton loading, spinners
- **Form validation**: Real-time validation feedback
- **Responsive design**: Mobile-first approach

## 🏛️ Admin Dashboard

### 🎨 Design Pattern: Sidebar Layout
- **`AdminLayout.jsx`**: Main layout wrapper
- **Role protection**: Tự động redirect nếu không phải admin
- **Responsive sidebar**: Collapsible trên mobile

### 📊 Dashboard Pages
- **`TongQuan.jsx`**: Overview với statistics cards
- **`QuanLyHoSo.jsx`**: Application management table
- **`QuanLyFAQ.jsx`**: FAQ CRUD interface

### 🛡️ Security Features
- **Route protection**: `useEffect` kiểm tra role
- **Auto logout**: Khi role thay đổi
- **Access denial**: UI thông báo khi không có quyền

## 🗄️ Database Schema

### 📋 Bảng chính

**1. `users` - Người dùng**
```sql
- id (PK)
- username (unique)
- email (unique)  
- password (bcrypt hashed)
- full_name
- phone
- role ('user'|'admin')
- is_active
- created_at, updated_at
```

**2. `nganh` - Ngành học**
```sql
- id (PK)
- ten_nganh (Tên ngành)
- ma_nganh (Mã ngành)
```

**3. `hoso` - Hồ sơ xét tuyển**
```sql
- id (PK)
- application_code (unique)
- user_id (FK → users.id)
- ho_ten, ngay_sinh, cccd, email, sdt
- truong_thpt, ten_lop_12, noi_hoc_12
- nganh_id (FK → nganh.id)
- diem_hk1, diem_ca_nam (JSON)
- status ('pending'|'approved'|'rejected')
- created_at
```

**4. `admission_methods` - Phương thức xét tuyển**
```sql
- id (PK)
- name (Tên phương thức)
- description
- is_active
```

**5. `faqs` - Câu hỏi thường gặp**
```sql
- id (PK)
- question, answer
- category
- is_active, sort_order
- view_count
- created_at
```

**6. `contacts` - Liên hệ**
```sql
- id (PK)
- name, email, phone
- subject, message
- created_at
```

### 🔗 Relationships
```
users (1) ←→ (n) hoso
nganh (1) ←→ (n) hoso
```

## 🚀 Deploy

### 🌐 Frontend (Vercel)
```bash
# Build
npm run build

# Deploy
vercel --prod
```

### 🖥️ Backend (VPS/Cloud)
```bash
# PM2 process manager
npm install -g pm2
pm2 start index.js --name "hutechs-api"
pm2 startup
pm2 save
```

### 🗄️ Database (Cloud MySQL)
- **MySQL 8.0** trên cloud provider
- **Backup tự động** hằng ngày
- **SSL connection** cho bảo mật

## 📈 Performance & SEO

### ⚡ Frontend Optimization
- **Code splitting**: Dynamic imports
- **Image optimization**: WebP, lazy loading
- **Bundle analysis**: Vite bundle analyzer
- **Caching**: Browser caching headers

### 🔍 SEO Features
- **React Helmet**: Dynamic meta tags
- **Structured Data**: JSON-LD schema
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine directives

## 🔒 Security

### 🛡️ Backend Security
- **Password hashing**: bcrypt với salt rounds 10
- **Input validation**: express-validator
- **CORS**: Configured cho frontend domain
- **SQL Injection**: Prepared statements với MySQL2

### 🔐 Frontend Security
- **XSS Prevention**: React built-in protection
- **HTTPS**: Force SSL trên production
- **Secure Storage**: localStorage với validation

## 🧪 Testing & Quality

### ✅ Code Quality
- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **Error Handling**: Try-catch, error boundaries

### 🔍 Monitoring
- **Console Logging**: Structured logging
- **Error Tracking**: Client-side error logging
- **Health Checks**: API health endpoints

## 👥 Đóng góp

### 📝 Development Workflow
1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push và tạo Pull Request

### 📋 Coding Standards
- **JavaScript**: ES6+ features
- **React**: Functional components + Hooks
- **CSS**: Tailwind utility classes
- **Database**: Normalized schema

## 📞 Liên hệ & Hỗ trợ

**Phát triển bởi:** Cursor AI Assistant  
**Ngôn ngữ:** Vietnamese  
**License:** MIT  

---

*Hệ thống Tuyển sinh HUTECHS - Giải pháp tuyển sinh trực tuyến hoàn chỉnh 🎓* 