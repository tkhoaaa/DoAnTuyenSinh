import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaFileAlt,
  FaQuestionCircle,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaBell,
  FaSearch
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children, currentPage = 'tong-quan' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      id: 'tong-quan',
      label: 'Tổng Quan',
      icon: FaHome,
      path: '/admin/tong-quan',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'quan-ly-ho-so',
      label: 'Quản Lý Hồ Sơ',
      icon: FaFileAlt,
      path: '/admin/quan-ly-ho-so',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'quan-ly-faq',
      label: 'Quản Lý FAQ',
      icon: FaQuestionCircle,
      path: '/admin/quan-ly-faq',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'bao-cao',
      label: 'Báo Cáo',
      icon: FaChartBar,
      path: '/admin/bao-cao',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'cai-dat',
      label: 'Cài Đặt',
      icon: FaCog,
      path: '/admin/cai-dat',
      color: 'from-gray-500 to-gray-600'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Hồ sơ mới cần duyệt',
      message: 'Có 5 hồ sơ mới cần xử lý',
      time: '5 phút trước',
      type: 'warning'
    },
    {
      id: 2,
      title: 'Báo cáo tuần đã sẵn sàng',
      message: 'Báo cáo thống kê tuần này đã được tạo',
      time: '1 giờ trước',
      type: 'info'
    },
    {
      id: 3,
      title: 'Hệ thống cập nhật',
      message: 'Hệ thống đã được cập nhật thành công',
      time: '2 giờ trước',
      type: 'success'
    }
  ];

  const MenuItem = ({ item, isActive, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={item.path}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <item.icon className="text-lg" />
        <span className="font-semibold">{item.label}</span>
      </Link>
    </motion.div>
  );

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      case 'info':
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
      case 'success':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-sm shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={{ x: -256 }}
        animate={{ x: sidebarOpen ? 0 : -256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <FaHome className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HUTECH Admin</h1>
                <p className="text-xs text-gray-500">Quản trị hệ thống</p>
              </div>
            </motion.div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <FaTimes />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MenuItem
                  item={item}
                  isActive={location.pathname === item.path}
                  onClick={() => setSidebarOpen(false)}
                />
              </motion.div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <motion.button
              className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSignOutAlt />
              Đăng xuất
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Navigation */}
        <motion.header
          className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <FaBars />
              </button>
              
              {/* Search */}
              <div className="relative hidden md:block">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-64"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 relative">
                  <FaBell />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notifications.length}
                  </span>
                </button>
                
                {/* Notifications Dropdown */}
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Thông báo</h3>
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
                            <p className="text-xs text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* User Profile */}
              <motion.div
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">Quản trị viên</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <motion.main
          className="min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout; 