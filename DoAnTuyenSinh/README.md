# 🎓 Hệ thống Tuyển sinh HUTECH

Một hệ thống quản lý tuyển sinh trực tuyến hoàn chỉnh cho trường Đại học Công nghệ TP.HCM (HUTECH), xây dựng bằng **React.js** và **Node.js** với **UI/UX hiện đại** và **animations mượt mà**.

## 📋 Mục lục

- [🚀 Tạo dự án từ đầu](#-tạo-dự-án-từ-đầu)
- [📥 Clone và Setup dự án](#-clone-và-setup-dự-án)
- [🎯 Giới thiệu](#-giới-thiệu)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [🏗️ Kiến trúc hệ thống](#️-kiến-trúc-hệ-thống)
- [📁 Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [⚙️ Cài đặt và chạy](#️-cài-đặt-và-chạy)
- [🔧 Cấu hình Database](#-cấu-hình-database)
- [📊 Chức năng chính](#-chức-năng-chính)
- [🎯 Phương thức xét tuyển](#-phương-thức-xét-tuyển)
- [🎨 UI/UX & Animations](#-uiux--animations)
- [🔐 Hệ thống Authentication](#-hệ-thống-authentication)
- [📱 API Endpoints](#-api-endpoints)
- [🎨 Frontend Components](#-frontend-components)
- [🏛️ Admin Dashboard](#️-admin-dashboard)
- [🗄️ Database Schema](#️-database-schema)
- [🎯 Demo Mode - Admin Dashboard cho Vercel](#-demo-mode---admin-dashboard-cho-vercel)
- [🎨 Favicon & Branding](#-favicon--branding)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [📈 Migration Guide](#-migration-guide)
- [🚀 Deploy](#-deploy)
- [📋 Deployment Guide](./DEPLOYMENT.md)

## 🚀 Tạo dự án từ đầu

### Bước 1: Tạo dự án React với Vite

```bash
# Tạo dự án mới với Vite
npm create vite@latest DoAnTuyenSinh -- --template react
cd DoAnTuyenSinh
npm install
```

### Bước 2: Cài đặt Tailwind CSS

```bash
# Cài đặt Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Cấu hình tailwind.config.js
```

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}
```

### Bước 3: Cài đặt các thư viện cần thiết

```bash
# Routing và Navigation
npm install react-router-dom

# Animations
npm install framer-motion

# HTTP Client
npm install axios

# SEO
npm install react-helmet-async

# Icons
npm install react-icons

# Form Validation (optional)
npm install react-hook-form
```

### Bước 4: Thiết lập Backend

```bash
# Tạo thư mục backend
mkdir backend
cd backend

# Khởi tạo package.json
npm init -y

# Cài đặt dependencies backend
npm install express mysql2 cors bcryptjs express-validator multer
npm install -D nodemon
```

### Bước 5: Cấu trúc thư mục cơ bản

```
DoAnTuyenSinh/
├── src/
│   ├── components/
│   ├── pages/
│   ├── accounts/
│   ├── admin/
│   ├── utils/
│   └── config/
├── backend/
│   ├── config/
│   ├── uploads/
│   └── index.js
└── public/
```

### Bước 6: Thiết lập CSS cơ bản

```css
/* css/tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Inter', system-ui, sans-serif;
  }
}

@layer components {
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors;
  }
}
```

## 📥 Clone và Setup dự án

### Cho người mới clone dự án từ Git

#### Bước 1: Clone repository

```bash
git clone https://github.com/your-username/DoAnTuyenSinh.git
cd DoAnTuyenSinh
```

#### Bước 2: Cài đặt dependencies

```bash
# Cài đặt frontend dependencies
npm install

# Cài đặt backend dependencies
cd backend
npm install
cd ..
```

#### Bước 3: Thiết lập Database

1. **Cài đặt MySQL** (nếu chưa có):
   - Windows: Tải từ [MySQL.com](https://dev.mysql.com/downloads/mysql/)
   - Mac: `brew install mysql`
   - Linux: `sudo apt install mysql-server`

2. **Tạo database**:
```sql
CREATE DATABASE tuyensinh CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. **Tạo file `.env`** trong thư mục `backend/`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=tuyensinh
DB_PORT=3306
```

#### Bước 4: Setup Database tự động

```bash
# Truy cập URL sau khi backend đã chạy:
# http://localhost:3001/api/admin/setup-db
# Script này sẽ tự động tạo tất cả bảng và dữ liệu mẫu
```

#### Bước 5: Chạy ứng dụng

```bash
# Terminal 1: Chạy backend
cd backend
node index.js

# Terminal 2: Chạy frontend  
npm run dev
```

#### Bước 6: Truy cập ứng dụng

- **Frontend**: https://do-an-tuyen-sinh.vercel.app (Production) | http://localhost:5173 (Development)
- **Backend API**: http://localhost:3001
- **Admin Login**: 
  - Email: `admin@hutech.edu.vn`
  - Password: `admin123`

### Lưu ý quan trọng

⚠️ **Đảm bảo**:
- MySQL đang chạy trên port 3306
- Node.js version >= 16
- Port 3001 và 5173 không bị chiếm dụng
- Cập nhật password MySQL trong file `.env`

## 🎯 Giới thiệu

Hệ thống Tuyển sinh HUTECH là một ứng dụng web full-stack hiện đại cho phép:

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
│   │   ├── emailConfig.js        # Cấu hình email service
│   │   └── env.example           # Environment variables template
│   ├── 📁 database/
│   │   ├── safe_migration.sql    # Script migration an toàn
│   │   ├── cleanup_roles.sql     # Script cleanup roles table
│   │   ├── add_profile_fields.sql # Thêm trường profile
│   │   ├── device_sessions.sql   # Quản lý session thiết bị
│   │   └── password_reset_tokens.sql # Token reset password
│   ├── 📁 services/
│   │   ├── emailService.js       # Email service với templates
│   │   └── deviceService.js      # Device management service
│   ├── 📁 middleware/
│   │   └── auth.js               # Authentication middleware
│   ├── 📁 uploads/               # Thư mục upload files
│   │   ├── avatar/               # Ảnh đại diện người dùng
│   │   └── scholarship/          # Upload học bổng
│   ├── index.js                  # Entry point server
│   ├── package.json              # Dependencies backend
│   ├── package-lock.json         # Lock file backend
│   └── EMAIL_SETUP.md            # Hướng dẫn cấu hình email
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
│   │       ├── QuanLyFAQ.jsx     # FAQ management với CRUD
│   │       ├── BaoCao.jsx        # Báo cáo thống kê
│   │       ├── CaiDat.jsx        # Cài đặt hệ thống
│   │       └── EditProfile.jsx   # Chỉnh sửa hồ sơ admin
│   │
│   ├── 📁 components/            # Shared components
│   │   ├── ThanhHeader.jsx       # Modern header với animations
│   │   ├── ChanTrang.jsx         # Footer với social links
│   │   ├── SEO.jsx               # SEO component
│   │   ├── StructuredData.jsx    # Schema markup
│   │   ├── OptimizedImage.jsx    # Optimized images
│   │   ├── ScrollToTop.jsx       # Auto scroll to top khi chuyển route
│   │   ├── VideoModal.jsx        # YouTube video modal với animations
│   │   ├── ActivityLog.jsx       # Activity log component
│   │   ├── DeviceManager.jsx     # Device management component
│   │   ├── ThemeToggle.jsx       # Theme toggle component
│   │   └── 📁 ui/                # Reusable UI components
│   │       ├── Button.jsx        # Polymorphic button với variants và as prop
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
│   │   ├── LienHe.jsx            # Contact page với form
│   │   └── EditProfile.jsx       # Chỉnh sửa hồ sơ user
│   │
│   ├── 📁 config/
│   │   ├── siteConfig.js         # Site configuration
│   │   ├── apiConfig.js          # API configuration cho dev/prod
│   │   └── demoData.js           # Mock data cho Demo Mode
│   ├── 📁 contexts/
│   │   └── ThemeContext.jsx      # Theme context provider
│   ├── 📁 utils/
│   │   ├── apiClient.js          # API client functions
│   │   └── environment.js        # Environment detection utilities 
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── output.css                # Generated CSS output
│
├── 📁 public/                    # Static assets
│   ├── 📁 icons/                 # Icon files
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   ├── browserconfig.xml
│   │   ├── site.webmanifest
│   │   ├── README.md
│   │   └── robots.txt
│   ├── favicon.ico               # Main favicon
│   ├── manifest.json             # Web app manifest
│   ├── robots.txt                # Search engine directives
│   ├── sitemap.xml               # XML sitemap
│   └── README-favicon.md         # Favicon documentation
├── 📁 css/                       # CSS files
│   └── tailwind.css              # Tailwind CSS entry
├── package.json                  # Frontend dependencies
├── package-lock.json             # Lock file frontend
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── vercel.json                  # Vercel deployment config
├── index.html                   # HTML entry point
├── manifest.json                # App manifest
├── .vercelignore                # Vercel ignore file
├── KHAC_PHUC_LOI.md             # Troubleshooting guide
├── MIGRATION_GUIDE.md           # Migration guide
├── DEPLOYMENT.md                # Deployment guide
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

- Frontend: https://do-an-tuyen-sinh.vercel.app (Production) | http://localhost:5173 (Development)
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
- ✅ **Demo Mode** cho Vercel deployment (không cần backend)
- ✅ **[MỚI] Avatar admin hiển thị ở header, dropdown và sidebar (AdminLayout)**
- ✅ **[MỚI] Khi admin cập nhật avatar ở trang chỉnh sửa hồ sơ, avatar sẽ được cập nhật ngay lập tức trên toàn bộ dashboard**
- ✅ **[MỚI] Đồng bộ logic xử lý avatar giữa user và admin (URL đầy đủ, cập nhật context)**
- ✅ **[MỚI] Sửa lỗi avatar không hiển thị hoặc không lưu khi reload trang**

### 🌐 Cho công chúng

- ✅ Xem thông tin tuyển sinh
- ✅ Đọc FAQ với search
- ✅ Liên hệ với form validation
- ✅ SEO optimized với meta tags
- ✅ Responsive design cho all devices
- ✅ Modern UI/UX với animations
- ✅ **Video giới thiệu HUTECH** trong modal với YouTube player
- ✅ **Auto scroll to top** khi chuyển trang
- ✅ **Navigation links** tích hợp với React Router

## 🎯 Phương thức xét tuyển

Hệ thống hỗ trợ **3 phương thức xét tuyển** chính cho thí sinh:

### 📚 1. Xét tuyển bằng Học bạ THPT

- ✅ **Nhập điểm học bạ** HK1 và cả năm lớp 12
- ✅ **Bảng điểm động** cho tất cả môn học
- ✅ **Tính GPA tự động** từ điểm JSON
- ✅ **Upload hồ sơ** học bạ và giấy tờ
- ✅ **Validation** điểm theo quy định (0-10)

### 📝 2. Xét tuyển bằng Thi THPT

- ✅ **8 khối thi** hỗ trợ: A00, A01, B00, C00, D01, D07, D08, V00
- ✅ **Dynamic subjects** theo khối thi:
  - **A00**: Toán, Lý, Hóa
  - **A01**: Toán, Lý, Tiếng Anh  
  - **D01**: Toán, Văn, Tiếng Anh
  - **Và các khối khác...**
- ✅ **Chọn khối → Hiện môn** tương ứng
- ✅ **Nhập điểm** từng môn (0-10, bước 0.25)
- ✅ **Liên kết ngành-khối** thông minh

### 🎯 3. Xét tuyển bằng Đánh giá năng lực

- ✅ **Nhập điểm** đánh giá năng lực (0-1200)
- ✅ **Validation** phù hợp với thang điểm
- ✅ **UI đơn giản** và dễ sử dụng

### 🔧 Logic phương thức:

```javascript
// Chỉ chọn 1 phương thức
const [phuongThucXetTuyen, setPhuongThucXetTuyen] = useState("hoc_ba");

// Validation theo phương thức
if (phuongThucXetTuyen === "hoc_ba") {
  // Require: diem_ca_nam
} else if (phuongThucXetTuyen === "thi_thpt") {
  // Require: khoi_thi, diem_thi_thpt
} else if (phuongThucXetTuyen === "danh_gia_nang_luc") {
  // Require: diem_danh_gia_nang_luc
}

// Reset data khi đổi phương thức
const handlePhuongThucChange = (method) => {
  setPhuongThucXetTuyen(method);
  // Clear các field không liên quan
};
```

### 🎨 UI/UX Features:

- ✅ **Radio selection** - Chọn 1 trong 3 phương thức
- ✅ **Conditional rendering** - Form thay đổi theo phương thức
- ✅ **Smart reset** - Xóa dữ liệu cũ khi đổi phương thức
- ✅ **Real-time validation** - Kiểm tra theo từng phương thức
- ✅ **Animations** mượt mà với Framer Motion

### 📊 Database Schema cho phương thức:

```sql
-- Thêm cột vào bảng applications
ALTER TABLE applications 
ADD COLUMN phuong_thuc_xet_tuyen ENUM('hoc_ba', 'thi_thpt', 'danh_gia_nang_luc') DEFAULT 'hoc_ba',
ADD COLUMN khoi_thi VARCHAR(10) NULL,
ADD COLUMN diem_thi_thpt JSON NULL,
ADD COLUMN diem_danh_gia_nang_luc DECIMAL(7,2) NULL;

-- Bảng khối thi THPT
CREATE TABLE khoi_thi_thpt (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ma_khoi VARCHAR(10) UNIQUE NOT NULL,
    ten_khoi VARCHAR(100) NOT NULL,
    cac_mon JSON NOT NULL,
    mo_ta TEXT
);

-- Bảng liên kết ngành-khối
CREATE TABLE nganh_khoi_thi (
    nganh_id INT,
    khoi_thi_id INT,
    FOREIGN KEY (nganh_id) REFERENCES nganh(id),
    FOREIGN KEY (khoi_thi_id) REFERENCES khoi_thi_thpt(id)
);
```

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
- **Video Modal**: YouTube player integration với backdrop blur
- **Navigation**: Polymorphic routing với React Router DOM
- **Scroll Management**: Auto scroll to top khi chuyển route

### 🎨 Component Library

- **Button Component**: Polymorphic variants, icons, loading states, `as` prop support
- **Input Component**: Validation, icons, error states
- **Card Components**: Gradient backgrounds, hover effects
- **Navigation**: Animated headers, mobile menus
- **VideoModal Component**: YouTube integration, backdrop blur, responsive player
- **ScrollToTop Component**: Route-based auto scroll với smooth behavior

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
GET  /api/auth/majors                    # Danh sách ngành học
GET  /api/auth/exam-blocks               # Danh sách khối thi THPT
GET  /api/auth/majors/:id/exam-blocks    # Khối thi theo ngành học
POST /api/auth/apply                     # Đăng ký xét tuyển (3 phương thức)
GET  /api/auth/applications/:userId      # Hồ sơ của user
POST /api/auth/consultation              # Đăng ký tư vấn
POST /api/auth/scholarship               # Đăng ký học bổng
```

### 🛠️ Admin APIs

```
GET  /api/admin/dashboard-stats          # Thống kê tổng quan
GET  /api/admin/applications             # Danh sách hồ sơ (với filters)
PUT  /api/admin/applications/:id/status  # Cập nhật trạng thái hồ sơ
GET  /api/admin/recent-applications      # Hồ sơ gần đây
GET  /api/admin/top-majors               # Top ngành học
GET  /api/admin/setup-db                 # Setup database tự động
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

- **`App.jsx`**: Main router với public/admin routes và ScrollToTop integration
- **`UserContext.jsx`**: Global authentication state với Demo Mode support
- **`ThanhHeader.jsx`**: Modern navigation header với animations
- **`ChanTrang.jsx`**: Footer với social links và contact info
- **`ScrollToTop.jsx`**: Auto scroll component cho route changes
- **`VideoModal.jsx`**: YouTube video player modal với animations
- **[MỚI] Avatar hiển thị đồng bộ cho cả user và admin ở header, dropdown, sidebar**

### 📄 Page Components

- **`TrangChu.jsx`**: Homepage với hero section, video modal integration, và navigation links
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

- **`Button.jsx`**: Polymorphic button với variants, icons, loading states, và `as` prop
- **`Input.jsx`**: Input component với validation, icons, error states
- **`OptimizedImage.jsx`**: Image component với lazy loading
- **`SEO.jsx`**: SEO component với meta tags
- **`StructuredData.jsx`**: Schema markup cho search engines
- **`VideoModal.jsx`**: YouTube video modal với backdrop blur và responsive design

### 🛠️ Utility Functions

- **`environment.js`**: Environment detection utilities với smart demo mode logic
- **`apiClient.js`**: API client functions với error handling

## 🏛️ Admin Dashboard

### 🎨 Design Pattern: Modern Sidebar Layout

- **`AdminLayout.jsx`**: Main layout wrapper với responsive sidebar, Demo Mode banner, và **[MỚI] avatar admin**
- **Role protection**: Tự động redirect nếu không phải admin
- **Responsive sidebar**: Collapsible trên mobile với animations
- **Notification system**: Dropdown notifications với indicators
- **Demo Mode banner**: Top warning khi ở Demo Mode
- **[MỚI] Avatar admin cập nhật realtime khi chỉnh sửa hồ sơ**

### 📊 Dashboard Pages

- **`TongQuan.jsx`**: Overview với statistics cards, charts, và Demo Mode support
- **`QuanLyHoSo.jsx`**: Application management với filters, search, modals, và Demo Mode
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

**3. `applications` - Hồ sơ xét tuyển**

```sql
- id (PK)
- application_code (unique)
- user_id (FK → users.id)
- ho_ten, ngay_sinh, cccd, email, sdt
- truong_thpt, ten_lop_12, noi_hoc_12
- nganh_id (FK → nganh.id)
- phuong_thuc_xet_tuyen ENUM('hoc_ba', 'thi_thpt', 'danh_gia_nang_luc')
- khoi_thi VARCHAR(10)
- diem_hk1, diem_ca_nam (JSON) 
- diem_thi_thpt (JSON)
- diem_danh_gia_nang_luc DECIMAL(7,2)
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

**9. `khoi_thi_thpt` - Khối thi THPT**

```sql
- id (PK)
- ma_khoi VARCHAR(10) (unique)
- ten_khoi VARCHAR(100)
- cac_mon JSON (["Toán", "Lý", "Hóa"])
- mo_ta TEXT
- created_at
```

**10. `nganh_khoi_thi` - Liên kết ngành-khối**

```sql
- id (PK)
- nganh_id (FK → nganh.id)
- khoi_thi_id (FK → khoi_thi_thpt.id)
- UNIQUE(nganh_id, khoi_thi_id)
```

### 🔗 Relationships

```
users (1) ←→ (n) applications
users (1) ←→ (n) consultations
users (1) ←→ (n) scholarships
nganh (1) ←→ (n) applications
nganh (n) ←→ (n) khoi_thi_thpt (through nganh_khoi_thi)
khoi_thi_thpt (1) ←→ (n) nganh_khoi_thi
```

## 🎬 Video Integration & Navigation

### 📺 Video Modal Component

**Video giới thiệu HUTECH chính thức**:
- **URL**: https://youtu.be/ayTTBNBtNpk?si=7byB99-BkTZPRP0n
- **Component**: `VideoModal.jsx`
- **Integration**: Button "Xem video giới thiệu" trên homepage

#### Features:
- ✅ **YouTube Embed**: Auto-play video trong modal
- ✅ **Responsive Design**: Responsive player cho all devices
- ✅ **Backdrop Blur**: Glassmorphism effect
- ✅ **Smooth Animations**: Framer Motion transitions
- ✅ **Click Outside**: Close modal khi click backdrop
- ✅ **Escape Key**: Close modal với keyboard shortcut

#### Implementation:
```jsx
// Usage trong TrangChu.jsx
const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
const videoUrl = "https://youtu.be/ayTTBNBtNpk?si=7byB99-BkTZPRP0n";

<Button onClick={() => setIsVideoModalOpen(true)}>
  <FaPlay className="mr-2" />
  Xem video giới thiệu
</Button>

<VideoModal
  isOpen={isVideoModalOpen}
  onClose={() => setIsVideoModalOpen(false)}
  videoUrl={videoUrl}
/>
```

### 🧭 Enhanced Navigation

#### Achievement Cards Navigation:
- **Card clickable**: Click vào card → Mở link trong tab mới
- **Button clickable**: Click button → Navigation với React Router
- **Links**: 
  - Thông tin tuyển sinh → `/thong-tin-tuyen-sinh`
  - Đăng ký xét tuyển → `/dang-ky-xet-tuyen`
  - FAQ → `/faq`

#### Polymorphic Button Component:
```jsx
// Button hỗ trợ as prop để render khác nhau
<Button as={Link} to="/dang-ky-xet-tuyen">
  Đăng ký xét tuyển ngay
</Button>

// Hoặc external link
<Button as="a" href="https://external-link.com" target="_blank">
  Xem chi tiết
</Button>
```

### 📜 ScrollToTop Component

#### Auto Scroll Management:
- ✅ **Route Changes**: Tự động scroll lên đầu trang khi chuyển route
- ✅ **Smooth Behavior**: Smooth scrolling effect
- ✅ **Performance**: Lightweight với useEffect hook

#### Implementation:
```jsx
// ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// Integration trong App.jsx
<BrowserRouter>
  <ScrollToTop />
  <Routes>
    {/* Routes */}
  </Routes>
</BrowserRouter>
```

## 🎯 Demo Mode - Admin Dashboard cho Vercel

### 🚀 Giải pháp cho Backend không deploy được

Vì **backend Node.js không thể deploy lên Vercel** (chỉ hỗ trợ serverless functions), chúng tôi đã tạo **Demo Mode** hoàn chỉnh để showcase admin dashboard với dữ liệu mẫu thực tế.

### 🎯 Cách sử dụng Demo Mode

#### Bước 1: Truy cập trang đăng nhập
```
URL: https://do-an-tuyen-sinh.vercel.app/accounts/dang-nhap
```

#### Bước 2: Click Demo button
- **Vị trí**: Dưới form đăng nhập thông thường
- **Button**: "🎯 Xem Demo Admin Dashboard" (màu vàng cam)
- **Không cần**: Username/password
- **⚠️ Chỉ hiển thị trên Vercel**: Button chỉ xuất hiện khi truy cập từ Vercel deployment, không hiện ở localhost

#### Bước 3: Tự động vào Admin Dashboard
- **Chuyển hướng**: Sau 1 giây → `/admin`
- **Banner Demo**: Hiển thị thông báo Demo Mode
- **Full Access**: Tất cả tính năng admin hoạt động

### 📊 Dữ liệu Demo hoàn chỉnh

#### **Statistics Dashboard**
```javascript
- Tổng hồ sơ: 1,247
- Chờ duyệt: 89 | Đã duyệt: 876 | Từ chối: 282
- Tổng users: 1,568 | Tổng ngành: 45
- GPA trung bình: 7.8 | Tỷ lệ hoàn thành: 85%
```

#### **Applications Management (8 hồ sơ mẫu)**
```javascript
1. Nguyễn Văn An - CNTT - Học bạ (GPA: 8.5, Pending)
2. Trần Thị Bình - Kinh tế - Thi THPT A00 (GPA: 7.8, Approved)
3. Lê Minh Châu - Thiết kế - Đánh giá năng lực 650đ (Rejected)
4. Phạm Quốc Duy - QTKD - Học bạ (GPA: 7.2, Pending)
5. Võ Thị Hương - Kế toán - Thi THPT D01 (GPA: 8.1, Approved)
// ... và 3 hồ sơ khác với đầy đủ thông tin
```

#### **Majors Data (8 ngành học)**
```javascript
- Công nghệ Thông tin (CNTT) - 345 hồ sơ
- Kinh tế (KT) - 287 hồ sơ  
- Quản trị Kinh doanh (QTKD) - 234 hồ sơ
- Kế toán (KeToan) - 198 hồ sơ
- Thiết kế Đồ họa (TKDH) - 156 hồ sơ
// ... và các ngành khác
```

### ⚡ Tính năng Demo hoạt động

#### **🎯 Dashboard Analytics**
- ✅ **Statistics Cards**: Animated với real data
- ✅ **Recent Applications**: 5 hồ sơ gần đây với timeline
- ✅ **Top Majors**: Charts và rankings  
- ✅ **Charts & Graphs**: Data visualization

#### **📄 Application Management**  
- ✅ **Full CRUD**: View, edit, update status
- ✅ **Advanced Filters**: Status, Major, Search
- ✅ **Real-time Search**: Debounced với 500ms
- ✅ **Status Updates**: Pending → Approved/Rejected
- ✅ **Pagination**: Client-side pagination
- ✅ **Detail Modal**: Xem chi tiết hồ sơ

#### **🎨 UI/UX Features**
- ✅ **Demo Banner**: Top notification với warning
- ✅ **Smooth Animations**: Framer Motion transitions
- ✅ **Responsive Design**: Mobile & desktop perfect
- ✅ **Loading States**: Skeleton loading với animations
- ✅ **Error Handling**: Graceful error messages

### 🌍 Environment Detection

#### **Smart Demo Button Display:**
Demo button chỉ hiển thị khi truy cập từ **Vercel deployment**, không hiện ở **localhost development**.

```javascript
// src/utils/environment.js
export const shouldShowDemoMode = () => {
  return isVercelDeployment();
};

export const isVercelDeployment = () => {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  
  // Check for Vercel domains
  const isVercelDomain = hostname.includes('vercel.app') || hostname.includes('vercel.com');
  
  // Check for HTTPS production (excluding localhost HTTPS)
  const isProductionHTTPS = protocol === 'https:' && !hostname.includes('localhost');
  
  return isVercelDomain || isProductionHTTPS;
};
```

#### **Environment Logic:**
```javascript
// ✅ Localhost Development (http://localhost:5173)
shouldShowDemoMode() = false → Demo button ẩn

// ✅ Vercel Production (https://do-an-tuyen-sinh.vercel.app)  
shouldShowDemoMode() = true → Demo button hiển thị

// ✅ Other HTTPS Production
shouldShowDemoMode() = true → Demo button hiển thị
```

#### **Implementation trong DangNhap.jsx:**
```javascript
import { shouldShowDemoMode } from "../utils/environment";

// Conditional rendering
{shouldShowDemoMode() && (
  <Button onClick={handleDemoLogin}>
    🎯 Xem Demo Admin Dashboard
  </Button>
)}
```

### 🔧 Technical Implementation

#### **Files được tạo/cập nhật:**
```javascript
// Mock Data
├── src/config/demoData.js       // Comprehensive mock data

// Environment Detection
├── src/utils/environment.js     // Environment detection utilities

// Authentication 
├── src/accounts/UserContext.jsx // Demo mode support
├── src/accounts/DangNhap.jsx    // Demo login button với environment detection

// Admin Components
├── src/admin/pages/TongQuan.jsx      // Demo dashboard
├── src/admin/pages/QuanLyHoSo.jsx    // Demo applications  
├── src/admin/components/AdminLayout.jsx // Demo banner
```

#### **Demo Mode Logic:**
```javascript
// UserContext.jsx
const [isDemoMode, setIsDemoMode] = useState(false);

const loginDemo = () => {
  setIsDemoMode(true);
  setUser(DEMO_USER);
  localStorage.setItem("demoMode", "true");
};

// Admin pages check demo mode
if (isDemoMode) {
  // Use DEMO_DATA instead of API calls
  setApplications(DEMO_APPLICATIONS);
  setStats(DEMO_DASHBOARD_STATS);
}
```

#### **Demo Data Structure:**
```javascript
// demoData.js
export const DEMO_USER = {
  id: 999,
  username: "demo_admin", 
  email: "demo@hutech.edu.vn",
  role: "admin"
};

export const DEMO_APPLICATIONS = [
  // 8 realistic applications với đầy đủ fields
];

export const DEMO_DASHBOARD_STATS = {
  // Real statistics data
};
```

### 🎯 Showcase Value

#### **✅ Hoàn hảo cho:**
- **Portfolio**: Demonstrate full-stack capabilities
- **Interviews**: Show working admin dashboard
- **Clients**: Preview admin features without setup
- **Presentations**: No dependency on backend uptime

#### **✅ Production-Ready Demo:**
- **Fast Loading**: No API delays
- **Always Available**: No server dependencies  
- **Full Functional**: All interactions work
- **Professional UI**: Polished admin interface
- **Smart Environment Detection**: Demo button chỉ hiện trên production
- **Clean Development**: Không có confusion khi development

### 🔗 Demo URLs

#### **Public URLs:**
```
🌐 Homepage: https://do-an-tuyen-sinh.vercel.app/
🔐 Demo Login: https://do-an-tuyen-sinh.vercel.app/accounts/dang-nhap
👑 Admin Demo: https://do-an-tuyen-sinh.vercel.app/admin (after demo login)
```

#### **Features Showcase:**
```
📊 Dashboard: Statistics, charts, analytics
📄 Applications: Full management với filters
🎯 Demo Banner: Clear demo mode indication
🎨 Modern UI: Glassmorphism, animations, responsive
```

---

## 🎨 Favicon & Branding

### Logo HUTECH chính thức

Sử dụng logo chính thức của **Trường Đại học Công nghệ TP.HCM (HUTECH)**:

- **URL**: https://upload.wikimedia.org/wikipedia/vi/8/81/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh.png

### Tạo Favicon từ Logo

#### Bước 1: Tải logo về

1. Truy cập link logo chính thức
2. Lưu file PNG về máy

#### Bước 2: Tạo favicon với các kích cỡ

Sử dụng các công cụ online:

- https://favicon.io/favicon-converter/
- https://realfavicongenerator.net/
- https://favicon-generator.org/

#### Bước 3: Upload các file sau vào thư mục `/public/`:

```
public/
├── favicon.ico (16x16, 32x32, 48x48)
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png (180x180)
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── site.webmanifest
```

#### Bước 4: Cập nhật manifest.json

```json
{
  "name": "HUTECH - Hệ thống tuyển sinh HUTECH 2025",
  "short_name": "HUTECH",
  "description": "Website tuyển sinh chính thức của Trường Đại học Công nghệ TP.HCM - HUTECH",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512", 
      "type": "image/png"
    }
  ]
}
```

### Branding Guidelines

- **Primary Colors**: Blue gradient (#3b82f6 to #1d4ed8)
- **Secondary Colors**: Yellow accent (#fbbf24)
- **Typography**: Inter font family
- **Logo Usage**: Chỉ sử dụng logo chính thức HUTECH
- **Naming**: Luôn sử dụng "HUTECH" thay vì "HUTECHS" hoặc "HUTECHSS"

## 🛠️ Troubleshooting

### 🚨 Các lỗi thường gặp và cách khắc phục

#### 1. Lỗi SQL: "Incorrect arguments to mysqld_stmt_execute"

**Nguyên nhân**: Mismatch giữa số placeholder (?) và số parameters

**Giải pháp**:
```javascript
// ✅ Đã fix: Convert undefined to null
const params = [
    applicationCode, 
    ho_ten || null,
    ngay_sinh || null,
    // ... other params
    khoi_thi || null,
    diem_danh_gia_nang_luc || null
];
```

#### 2. Lỗi: "Unknown column 'is_active' in 'field list'"

**Nguyên nhân**: Database chưa có cột is_active

**Giải pháp**:
```sql
-- Chạy setup database auto:
-- http://localhost:3001/api/admin/setup-db
```

#### 3. Khối thi không hiển thị khi chọn "Thi THPT"

**Nguyên nhân**: 
- Database chưa có dữ liệu khối thi
- Backend chưa restart sau khi thêm API

**Giải pháp**:
```bash
# 1. Stop server
taskkill /f /im node.exe

# 2. Restart backend
cd backend
node index.js

# 3. Setup database
# Truy cập: http://localhost:3001/api/admin/setup-db
```

#### 4. Frontend không kết nối được Backend

**Kiểm tra**:
- ✅ Backend đang chạy trên port 3001
- ✅ CORS đã cấu hình cho localhost:5173 và do-an-tuyen-sinh.vercel.app
- ✅ MySQL đang chạy

**Debug**:
```bash
# Test backend health
curl http://localhost:3001/health

# Test API endpoint
curl http://localhost:3001/api/auth/majors
```

#### 5. Database connection failed

**Giải pháp**:
```bash
# Kiểm tra MySQL đang chạy
# Windows:
net start mysql

# Mac/Linux:
sudo systemctl start mysql

# Kiểm tra connection
mysql -u root -p -e "SHOW DATABASES;"
```

### 🔧 Reset Database hoàn toàn

```sql
-- Xóa database cũ
DROP DATABASE IF EXISTS tuyensinh;

-- Tạo database mới
CREATE DATABASE tuyensinh CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Chạy setup tự động
-- http://localhost:3001/api/admin/setup-db
```

### 📊 Test hệ thống hoàn chỉnh

#### Test Backend APIs:
```bash
# Health check
curl http://localhost:3001/health

# Login test
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"admin@hutech.edu.vn","password":"admin123"}'

# Exam blocks
curl http://localhost:3001/api/auth/exam-blocks

# Applications list
curl http://localhost:3001/api/admin/applications
```

#### Test Frontend:
1. ✅ Trang chủ hiển thị bình thường
2. ✅ Đăng nhập admin thành công
3. ✅ Dashboard hiển thị thống kê
4. ✅ Quản lý hồ sơ có dữ liệu
5. ✅ Phương thức xét tuyển hoạt động:
   - **Học bạ**: Upload file
   - **Thi THPT**: Chọn khối → hiện môn
   - **Đánh giá năng lực**: Nhập điểm

### 🆘 Liên hệ hỗ trợ

Nếu vẫn gặp vấn đề:
1. Kiểm tra **Console logs** trong browser (F12)
2. Kiểm tra **Backend logs** trong terminal  
3. Đảm bảo **MySQL đang chạy** và **có dữ liệu**
4. **Clear browser cache** và reload trang

## 📈 Migration Guide

### 🔄 Từ Mock Data sang Real Data

#### Thay đổi chính:

**Backend APIs mới**:
- `GET /api/auth/exam-blocks` - Danh sách khối thi THPT
- `GET /api/auth/majors/:id/exam-blocks` - Khối thi theo ngành
- `POST /api/auth/apply` - Nộp hồ sơ với phương thức mới
- `GET /api/admin/applications` - Hồ sơ với phương thức xét tuyển

**Database Schema mới**:
```sql
-- Bảng applications đã thêm:
phuong_thuc_xet_tuyen ENUM('hoc_ba', 'thi_thpt', 'danh_gia_nang_luc')
khoi_thi VARCHAR(10)
diem_thi_thpt JSON
diem_danh_gia_nang_luc DECIMAL(7,2)

-- Bảng mới:
khoi_thi_thpt (id, ma_khoi, ten_khoi, cac_mon, mo_ta)
nganh_khoi_thi (nganh_id, khoi_thi_id)
```

**Frontend Updates**:
- `DangKyXetTuyen.jsx`: Thêm 3 phương thức xét tuyển
- `QuanLyHoSo.jsx`: Hiển thị phương thức trong danh sách
- `TongQuan.jsx`: Thống kê theo phương thức

#### Migration steps:

1. **Backup dữ liệu cũ**:
```sql
mysqldump -u username -p tuyensinh > backup_old.sql
```

2. **Chạy migration**:
```bash
# Truy cập URL để auto-migrate:
http://localhost:3001/api/admin/setup-db
```

3. **Verify dữ liệu**:
```sql
-- Kiểm tra bảng mới
SHOW TABLES;
SELECT * FROM khoi_thi_thpt;
SELECT * FROM nganh_khoi_thi;

-- Kiểm tra cột mới
DESCRIBE applications;
```

4. **Test tính năng mới**:
- Đăng ký xét tuyển với 3 phương thức
- Admin xem hồ sơ có thông tin phương thức
- Filters và search hoạt động

#### Rollback (nếu cần):

```sql
-- Restore backup
mysql -u username -p tuyensinh < backup_old.sql

-- Hoặc xóa cột mới
ALTER TABLE applications 
DROP COLUMN phuong_thuc_xet_tuyen,
DROP COLUMN khoi_thi,
DROP COLUMN diem_thi_thpt,
DROP COLUMN diem_danh_gia_nang_luc;

DROP TABLE IF EXISTS nganh_khoi_thi;
DROP TABLE IF EXISTS khoi_thi_thpt;
```

### 📊 Performance Improvements

**Database Optimization**:
- Indexes cho các cột search thường xuyên
- JSON validation cho diem_thi_thpt
- Foreign key constraints

**Frontend Optimization**:
- Debounced search (500ms)
- Conditional rendering cho phương thức
- Form validation client-side

**API Optimization**:
- Pagination cho danh sách lớn
- Caching cho dropdown options
- Error handling với fallback

## 🚀 Deploy

### 🌐 Frontend (Vercel)

#### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Build project
npm run build

# Deploy to Vercel
vercel --prod
```

#### Option 2: GitHub Integration

1. **Push code lên GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect Vercel với GitHub**:
   - Truy cập [vercel.com](https://vercel.com)
   - Import project từ GitHub
   - Auto deploy khi push code

#### Vercel Configuration

File `vercel.json` đã được cấu hình:

```json
{
  "rewrites": [
    {
      "source": "/((?!api).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options", 
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "cleanUrls": true,
  "trailingSlash": false
}
```

#### Environment Variables trên Vercel

Thêm environment variables sau trên Vercel Dashboard:

```env
VITE_API_URL=https://your-backend-url.com
VITE_APP_ENV=production
```

### 🖥️ Backend (VPS/Cloud)

```bash
# PM2 process manager
npm install -g pm2
pm2 start index.js --name "HUTECH-api"
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

## 🔐 Tài khoản mặc định

### Admin Account:
- **Email**: `admin@hutech.edu.vn`
- **Password**: `admin123`
- **Role**: `admin`

### User Account:
- **Email**: `user1@email.com`
- **Password**: `user123`
- **Role**: `user`

## 📞 Thông tin liên hệ

**Phát triển bởi**: VÕ TIẾN KHOA  
**Trường**: Đại học Công nghệ TP.HCM (HUTECH)  
**Năm**: 2025  
**Ngôn ngữ**: Tiếng Việt  
**Tech Stack**: React.js + Vite + Tailwind CSS + Node.js + MySQL  

### 🎯 Đặc điểm nổi bật:
- ✅ **Modern UI/UX** với Framer Motion animations
- ✅ **3 phương thức xét tuyển** hoàn chỉnh
- ✅ **Real-time data** từ MySQL database  
- ✅ **Admin dashboard** với statistics và management
- ✅ **Responsive design** cho mọi thiết bị
- ✅ **SEO optimized** với meta tags và structured data
- ✅ **Production ready** với error handling và validation
- ✅ **Video giới thiệu HUTECH** với YouTube modal integration
- ✅ **Smart navigation** với polymorphic Button component
- ✅ **Auto scroll management** khi chuyển route
- ✅ **Demo Mode** cho admin dashboard trên Vercel (không cần backend)
- ✅ **Environment Detection** - Demo button chỉ hiện trên production deployment

### 🚀 Deployment:
- **Frontend**: ✅ [Vercel](https://do-an-tuyen-sinh.vercel.app/) - Live Production
- **Admin Demo**: ✅ [Demo Mode](https://do-an-tuyen-sinh.vercel.app/accounts/dang-nhap) - Full admin showcase
- **Backend**: ⚠️ Local Development (localhost:3001)
- **Database**: MySQL 8.0 Local
- **CORS**: Configured for both local and production domains

### 📈 Future Enhancements:
- Real-time notifications với WebSocket
- Advanced analytics và reporting
- Batch operations cho admin
- Mobile app với React Native
- AI-powered admission recommendations
- Demo Mode cho tất cả user features
- Serverless backend với Vercel Functions
- Enhanced environment detection cho multiple deployment platforms

---

_Hệ thống Tuyển sinh HUTECH - Giải pháp tuyển sinh trực tuyến hoàn chỉnh với UI/UX hiện đại và 3 phương thức xét tuyển 🎓✨_

## 📝 Changelog

### 2024-07-24
- [MỚI] Avatar admin hiển thị ở header, dropdown và sidebar (AdminLayout)
- [MỚI] Khi admin cập nhật avatar ở trang chỉnh sửa hồ sơ, avatar sẽ được cập nhật ngay lập tức trên toàn bộ dashboard
- [MỚI] Đồng bộ logic xử lý avatar giữa user và admin (URL đầy đủ, cập nhật context)
- [MỚI] Sửa lỗi avatar không hiển thị hoặc không lưu khi reload trang
- [MỚI] Cập nhật hướng dẫn sử dụng avatar cho cả user và admin
- [MỚI] Đảm bảo avatar hiển thị đúng trên cả Demo Mode và tài khoản thật
