# 🎓 Hệ thống Tuyển sinh HUTECHS

Một hệ thống quản lý tuyển sinh trực tuyến hoàn chỉnh cho trường Đại học Công nghệ TP.HCM (HUTECHS), xây dựng bằng **React.js** và **Node.js** với **UI/UX hiện đại** và **animations mượt mà**.

## 📋 Mục lục

- [🎯 Giới thiệu](#-giới-thiệu)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [🏗️ Kiến trúc hệ thống](#️-kiến-trúc-hệ-thống)
- [📁 Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [⚙️ Cài đặt và chạy](#️-cài-đặt-và-chạy)
- [🔧 Cấu hình Database](#-cấu-hình-database)
- [📊 Chức năng chính](#-chức-năng-chính)
- [🎨 UI/UX & Animations](#-uiux--animations)
- [🔐 Hệ thống Authentication](#-hệ-thống-authentication)
- [📱 API Endpoints](#-api-endpoints)
- [🎨 Frontend Components](#-frontend-components)
- [🏛️ Admin Dashboard](#️-admin-dashboard)
- [🗄️ Database Schema](#️-database-schema)
- [🚀 Deploy](#-deploy)

## 🎯 Giới thiệu

Hệ thống Tuyển sinh HUTECHS là một ứng dụng web full-stack hiện đại cho phép:

- **Thí sinh**: Đăng ký xét tuyển, theo dõi hồ sơ, xem thông tin tuyển sinh với trải nghiệm mượt mà
- **Admin**: Quản lý hồ sơ, FAQ, thông tin tuyển sinh, báo cáo thống kê với dashboard hiện đại
- **Công chúng**: Xem thông tin tuyển sinh, FAQ, liên hệ với giao diện responsive

## 🛠️ Công nghệ sử dụng

### Frontend
- **React.js 18** - UI Framework với Hooks
- **Vite** - Build tool & Development server
- **React Router DOM** - Client-side routing
- **Framer Motion** - Advanced animations & transitions
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client với interceptors
- **React Helmet Async** - SEO management
- **React Icons** - Comprehensive icon library
- **PostCSS** - CSS processing & optimization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework với middleware
- **MySQL2** - Database driver với prepared statements
- **bcrypt** - Password hashing với salt rounds
- **express-validator** - Input validation & sanitization
- **cors** - Cross-origin resource sharing
- **multer** - File upload handling với validation

### Database
- **MySQL 8.0** - Relational database
- **MySQL Workbench** - Database management

### Development Tools
- **ESLint** - Code linting & quality
- **PostCSS** - CSS processing
- **Cursor AI** - AI-powered code editor
- **Vite** - Fast development & build tool

## 🏗️ Kiến trúc hệ thống

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│                 │◄──────────────────►│                 │
│   React.js      │                     │   Express.js    │
│   Frontend      │                     │   Backend       │
│   (Port 5173)   │                     │   (Port 3001)   │
│   + Framer      │                     │   + MySQL2      │
│   Motion        │                     │   + bcrypt      │
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

**Mô hình:** 3-tier Architecture (Presentation - Logic - Data) với **Modern UI/UX**

## 📁 Cấu trúc thư mục

```
DoAnTuyenSinh/
├── 📁 backend/                    # Backend Node.js
│   ├── 📁 config/
│   │   ├── database.js           # Cấu hình MySQL connection
│   │   └── env.example           # Environment variables template
│   ├── 📁 database/
│   │   ├── safe_migration.sql    # Script migration an toàn
│   │   └── cleanup_roles.sql     # Script cleanup roles table
│   ├── 📁 uploads/               # Thư mục upload files
│   │   └── scholarship/          # Upload học bổng
│   ├── index.js                  # Entry point server
│   ├── package.json              # Dependencies backend
│   └── .env                      # Environment variables
│
├── 📁 src/                       # Frontend React
│   ├── 📁 accounts/              # Authentication components
│   │   ├── DangNhap.jsx         # Login page với modern UI
│   │   ├── DangKyTaiKhoan.jsx   # User registration với validation
│   │   ├── DangKyTaiKhoanAdmin.jsx # Admin registration
│   │   ├── QuenMatKhau.jsx      # Forgot password với animations
│   │   └── UserContext.jsx      # Authentication context
│   │
│   ├── 📁 admin/                 # Admin dashboard
│   │   ├── 📁 components/
│   │   │   └── AdminLayout.jsx   # Admin layout với sidebar
│   │   └── 📁 pages/
│   │       ├── TongQuan.jsx      # Overview dashboard với stats
│   │       ├── QuanLyHoSo.jsx    # Application management với filters
│   │       └── QuanLyFAQ.jsx     # FAQ management với CRUD
│   │
│   ├── 📁 components/            # Shared components
│   │   ├── ThanhHeader.jsx       # Modern header với animations
│   │   ├── ChanTrang.jsx         # Footer với social links
│   │   ├── SEO.jsx               # SEO component
│   │   ├── StructuredData.jsx    # Schema markup
│   │   ├── OptimizedImage.jsx    # Optimized images
│   │   └── 📁 ui/                # Reusable UI components
│   │       ├── Button.jsx        # Button component với variants
│   │       └── Input.jsx         # Input component với validation
│   │
│   ├── 📁 pages/                 # Public pages
│   │   ├── TrangChu.jsx          # Homepage với hero section và animations
│   │   ├── DangKyXetTuyen.jsx    # Multi-step application form với validation
│   │   ├── DangKyTuVan.jsx       # Consultation registration với tabbed interface
│   │   ├── DangKyHocBong.jsx     # Scholarship application với modern form
│   │   ├── TraCuuKetQua.jsx      # Result lookup với search và filters
│   │   ├── ThongTinTuyenSinh.jsx # Admission info
│   │   ├── FAQ.jsx               # Searchable FAQ page với categories
│   │   └── LienHe.jsx            # Contact page với form
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
├── postcss.config.js            # PostCSS configuration
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
- ✅ Đăng ký tài khoản với validation
- ✅ Đăng nhập/Đăng xuất với animations
- ✅ Đăng ký xét tuyển (chọn tối đa 5 ngành)
- ✅ Nhập điểm học bạ (HK1, Cả năm) với bảng động
- ✅ Upload hồ sơ (học bạ, CCCD) với preview
- ✅ Đăng ký tư vấn với form chi tiết
- ✅ Đăng ký học bổng với validation
- ✅ Tra cứu kết quả với search
- ✅ Xem thông tin tuyển sinh
- ✅ Đọc FAQ với search và filter
- ✅ Liên hệ hỗ trợ với form validation

### 👑 Cho Admin
- ✅ Dashboard tổng quan với statistics cards
- ✅ Quản lý hồ sơ xét tuyển với filters và search
- ✅ Quản lý FAQ với CRUD operations
- ✅ Quản lý thông tin tuyển sinh
- ✅ Thống kê báo cáo với charts
- ✅ Role-based access control
- ✅ Modern admin layout với sidebar

### 🌐 Cho công chúng
- ✅ Xem thông tin tuyển sinh
- ✅ Đọc FAQ với search
- ✅ Liên hệ với form validation
- ✅ SEO optimized với meta tags
- ✅ Responsive design cho all devices
- ✅ Modern UI/UX với animations

## 🎨 UI/UX & Animations

### 🎭 Framer Motion Integration
- **Page Transitions**: Smooth entrance animations
- **Component Animations**: Hover effects, scale transforms
- **Staggered Animations**: Sequential element reveals
- **AnimatePresence**: Mount/unmount animations
- **Motion Variants**: Reusable animation states

### 🎨 Modern Design System
- **Gradient Backgrounds**: Blue to indigo gradients
- **Glassmorphism Effects**: Backdrop blur với transparency
- **Rounded Corners**: Consistent border-radius
- **Shadow System**: Layered shadows cho depth
- **Color Palette**: Blue, yellow, white theme

### 📱 Responsive Design
- **Mobile-First**: Optimized cho mobile devices
- **Breakpoint System**: Tailwind responsive classes
- **Touch-Friendly**: Proper button sizes và spacing
- **Flexible Layouts**: Grid và flexbox systems

### 🎯 Interactive Elements
- **Hover Effects**: Scale, color, và shadow transitions
- **Loading States**: Skeleton loading, spinners
- **Form Validation**: Real-time feedback với animations
- **Modal Dialogs**: Smooth open/close transitions
- **Dropdown Menus**: Animated dropdowns với backdrop

### 🎨 Component Library
- **Button Component**: Variants, icons, loading states
- **Input Component**: Validation, icons, error states
- **Card Components**: Gradient backgrounds, hover effects
- **Navigation**: Animated headers, mobile menus

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
POST /api/auth/consultation       # Đăng ký tư vấn
POST /api/auth/scholarship        # Đăng ký học bổng
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
- **`ThanhHeader.jsx`**: Modern navigation header với animations
- **`ChanTrang.jsx`**: Footer với social links và contact info

### 📄 Page Components
- **`TrangChu.jsx`**: Homepage với hero section và animations
- **`DangKyXetTuyen.jsx`**: Multi-step application form với validation
- **`DangKyTuVan.jsx`**: Consultation registration với tabbed interface
- **`DangKyHocBong.jsx`**: Scholarship application với modern form
- **`TraCuuKetQua.jsx`**: Result lookup với search và filters
- **`FAQ.jsx`**: Searchable FAQ page với categories
- **`LienHe.jsx`**: Contact page với form

### 🎭 Animation & UX
- **Framer Motion**: Page transitions, hover effects, staggered animations
- **Loading states**: Skeleton loading, spinners, progress bars
- **Form validation**: Real-time validation feedback với animations
- **Responsive design**: Mobile-first approach với breakpoints
- **Interactive feedback**: Success/error messages với animations

### 🎨 UI Components
- **`Button.jsx`**: Reusable button với variants, icons, loading states
- **`Input.jsx`**: Input component với validation, icons, error states
- **`OptimizedImage.jsx`**: Image component với lazy loading
- **`SEO.jsx`**: SEO component với meta tags
- **`StructuredData.jsx`**: Schema markup cho search engines

## 🏛️ Admin Dashboard

### 🎨 Design Pattern: Modern Sidebar Layout
- **`AdminLayout.jsx`**: Main layout wrapper với responsive sidebar
- **Role protection**: Tự động redirect nếu không phải admin
- **Responsive sidebar**: Collapsible trên mobile với animations
- **Notification system**: Dropdown notifications với indicators

### 📊 Dashboard Pages
- **`TongQuan.jsx`**: Overview với statistics cards và charts
- **`QuanLyHoSo.jsx`**: Application management với filters, search, và modals
- **`QuanLyFAQ.jsx`**: FAQ CRUD interface với categories và search

### 🛡️ Security Features
- **Route protection**: `useEffect` kiểm tra role
- **Auto logout**: Khi role thay đổi
- **Access denial**: UI thông báo khi không có quyền
- **Session management**: Proper session handling

### 🎯 Admin Features
- **Statistics Cards**: Real-time data với animations
- **Search & Filters**: Advanced filtering với debounced search
- **Modal Dialogs**: Add/edit forms với validation
- **Status Management**: Status updates với visual indicators
- **Export Functions**: Data export capabilities

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

**7. `consultations` - Đăng ký tư vấn**
```sql
- id (PK)
- user_id (FK → users.id)
- ho_ten, email, phone
- nganh_quan_tam
- thoi_gian_tu_van
- noi_dung_tu_van
- status
- created_at
```

**8. `scholarships` - Đăng ký học bổng**
```sql
- id (PK)
- user_id (FK → users.id)
- ho_ten, email, phone
- nganh_dang_ky
- diem_tb_lop_12
- hoan_canh_gia_dinh
- ly_do_xin_hoc_bong
- status
- created_at
```

### 🔗 Relationships
```
users (1) ←→ (n) hoso
users (1) ←→ (n) consultations
users (1) ←→ (n) scholarships
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
- **Code splitting**: Dynamic imports với React.lazy
- **Image optimization**: WebP, lazy loading với Intersection Observer
- **Bundle analysis**: Vite bundle analyzer
- **Caching**: Browser caching headers
- **Animation optimization**: Framer Motion với reduced motion support

### 🔍 SEO Features
- **React Helmet**: Dynamic meta tags cho all pages
- **Structured Data**: JSON-LD schema cho search engines
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine directives
- **Open Graph**: Social media meta tags

## 🔒 Security

### 🛡️ Backend Security
- **Password hashing**: bcrypt với salt rounds 10
- **Input validation**: express-validator với sanitization
- **CORS**: Configured cho frontend domain
- **SQL Injection**: Prepared statements với MySQL2
- **File upload security**: Multer với file type validation

### 🔐 Frontend Security
- **XSS Prevention**: React built-in protection
- **HTTPS**: Force SSL trên production
- **Secure Storage**: localStorage với validation
- **Input sanitization**: Client-side validation

## 🧪 Testing & Quality

### ✅ Code Quality
- **ESLint**: JavaScript linting với strict rules
- **Prettier**: Code formatting
- **Error Handling**: Try-catch, error boundaries
- **Type checking**: PropTypes cho component validation

### 🔍 Monitoring
- **Console Logging**: Structured logging với levels
- **Error Tracking**: Client-side error logging
- **Health Checks**: API health endpoints
- **Performance monitoring**: Bundle size tracking

## 👥 Đóng góp

### 📝 Development Workflow
1. Fork repository
2. Tạo feature branch
3. Commit changes với conventional commits
4. Push và tạo Pull Request

### 📋 Coding Standards
- **JavaScript**: ES6+ features với modern syntax
- **React**: Functional components + Hooks
- **CSS**: Tailwind utility classes
- **Database**: Normalized schema với proper relationships
- **Animations**: Framer Motion với performance optimization

## 📞 Liên hệ & Hỗ trợ

**Phát triển bởi:** VÕ TIẾN KHOA 
**Ngôn ngữ:** Tiếng Việt
**Framework:** React.js + Node.js + MySQL
**UI/UX:** Modern design với Framer Motion animations

---

*Hệ thống Tuyển sinh HUTECHS - Giải pháp tuyển sinh trực tuyến hoàn chỉnh với UI/UX hiện đại 🎓✨* 