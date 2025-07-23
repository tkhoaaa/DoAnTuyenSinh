import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaFileAlt,
  FaInfoCircle,
  FaQuestionCircle,
  FaEnvelope,
  FaChartBar,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaUser
} from 'react-icons/fa';
import { SITE_CONFIG } from '../../config/siteConfig';
import { UserContext } from '../../accounts/UserContext';

const AdminLayout = ({ children, currentPage = 'tong-quan' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { role, username, logout } = useContext(UserContext);

  // Kiểm tra quyền admin
  useEffect(() => {
    if (role !== 'admin') {
      console.log('Không có quyền admin, role hiện tại:', role);
      navigate('/', { replace: true });
    }
  }, [role, navigate]);

  // Không render nếu không phải admin
  if (role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Truy cập bị từ chối</h2>
          <p className="text-gray-600 mb-6">Bạn không có quyền truy cập trang quản trị.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      id: 'tong-quan',
      name: 'Tổng Quan',
      icon: FaHome,
      path: '/admin/tong-quan'
    },
    {
      id: 'quan-ly-ho-so',
      name: 'Quản Lý Hồ Sơ',
      icon: FaFileAlt,
      path: '/admin/quan-ly-ho-so',
      badge: '186'
    },
    {
      id: 'quan-ly-thong-tin',
      name: 'Quản Lý Thông Tin',
      icon: FaInfoCircle,
      path: '/admin/quan-ly-thong-tin'
    },
    {
      id: 'quan-ly-faq',
      name: 'Quản Lý FAQ',
      icon: FaQuestionCircle,
      path: '/admin/quan-ly-faq'
    },
    {
      id: 'lien-he-ho-tro',
      name: 'Liên Hệ & Hỗ Trợ',
      icon: FaEnvelope,
      path: '/admin/lien-he-ho-tro',
      badge: '12'
    },
    {
      id: 'quan-ly-ket-qua',
      name: 'Quản Lý Kết Quả',
      icon: FaChartBar,
      path: '/admin/quan-ly-ket-qua'
    },
    {
      id: 'quan-ly-tai-khoan',
      name: 'Quản Lý Tài Khoản',
      icon: FaUsers,
      path: '/admin/quan-ly-tai-khoan'
    }
  ];

  const MenuItem = ({ item, isActive, onClick }) => (
    <motion.button
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors relative ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <item.icon className="text-lg mr-3" />
      <span className="font-medium">{item.name}</span>
      {item.badge && (
        <span className={`ml-auto px-2 py-1 text-xs rounded-full ${
          isActive ? 'bg-blue-500' : 'bg-red-500'
        } text-white`}>
          {item.badge}
        </span>
      )}
    </motion.button>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo & Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center">
            <img 
              src={SITE_CONFIG.logo} 
              alt="HUTECHS Logo" 
              className="w-8 h-8 mr-2"
            />
            <div>
              <h2 className="text-white font-bold text-lg">HUTECHS</h2>
              <p className="text-gray-400 text-xs">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              isActive={currentPage === item.id}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="space-y-2">
            <button className="w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
              <FaCog className="mr-3" />
              <span>Cài Đặt</span>
            </button>
            <button 
              onClick={logout}
              className="w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <FaSignOutAlt className="mr-3" />
              <span>Đăng Xuất</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <FaBars />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {menuItems.find(item => item.id === currentPage)?.name || 'Tổng Quan'}
                </h1>
                <p className="text-sm text-gray-500">
                  Hệ thống quản lý tuyển sinh HUTECHS
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <FaBell />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{username || 'Admin User'}</p>
                  <p className="text-xs text-gray-500">Quản trị viên</p>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 