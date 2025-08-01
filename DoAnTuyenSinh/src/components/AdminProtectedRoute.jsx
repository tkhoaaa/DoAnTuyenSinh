import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../accounts/UserContext';

const AdminProtectedRoute = ({ children }) => {
  const { user, role } = useContext(UserContext);

  // Kiểm tra xem user đã đăng nhập và có quyền admin không
  if (!user) {
    // Chuyển hướng về trang đăng nhập nếu chưa đăng nhập
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin') {
    // Chuyển hướng về trang chủ nếu không phải admin
    return <Navigate to="/" replace />;
  }

  // Nếu đã đăng nhập và là admin, hiển thị children
  return children;
};

export default AdminProtectedRoute; 