import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../accounts/UserContext';

const AdminProtectedRoute = ({ children }) => {
  const { user, role, isLoading } = useContext(UserContext);

  // Hiển thị loading spinner khi đang kiểm tra authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Đang kiểm tra phiên đăng nhập...</p>
        </div>
      </div>
    );
  }

  // Kiểm tra xem user đã đăng nhập và có quyền admin không
  if (!user) {
    // Chuyển hướng về trang đăng nhập nếu chưa đăng nhập
    return <Navigate to="/accounts/dang-nhap" replace />;
  }

  if (role !== 'admin') {
    // Chuyển hướng về trang chủ nếu không phải admin
    return <Navigate to="/" replace />;
  }

  // Nếu đã đăng nhập và là admin, hiển thị children
  return children;
};

export default AdminProtectedRoute; 