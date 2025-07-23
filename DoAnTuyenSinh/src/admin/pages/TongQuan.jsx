import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaChartLine,
  FaGraduationCap,
  FaBell
} from 'react-icons/fa';

const TongQuan = () => {
  const [stats, setStats] = useState({
    totalApplications: 1247,
    newApplications: 43,
    pendingApplications: 186,
    approvedApplications: 892,
    rejectedApplications: 126,
    totalMajors: 25,
    todayVisitors: 2847
  });

  const [recentApplications, setRecentApplications] = useState([
    {
      id: 1,
      studentName: "Nguyễn Văn An",
      major: "Công nghệ Thông tin",
      submittedAt: "2025-01-23 14:30",
      status: "pending"
    },
    {
      id: 2,
      studentName: "Trần Thị Bình",
      major: "Kinh tế",
      submittedAt: "2025-01-23 13:15",
      status: "approved"
    },
    {
      id: 3,
      studentName: "Lê Minh Cường",
      major: "Kỹ thuật Cơ khí",
      submittedAt: "2025-01-23 12:45",
      status: "pending"
    }
  ]);

  const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color.replace('border-l-', 'bg-').replace('-500', '-100')}`}>
          <Icon className={`text-2xl ${color.replace('border-l-', 'text-')}`} />
        </div>
      </div>
    </motion.div>
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ duyệt' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Đã duyệt' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Từ chối' }
    };
    
    const config = statusConfig[status];
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          Tổng Quan Hệ Thống Tuyển Sinh
        </motion.h1>
        <p className="text-gray-600">Chào mừng bạn đến với bảng điều khiển quản trị</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FaFileAlt}
          title="Tổng Hồ Sơ"
          value={stats.totalApplications}
          color="border-l-blue-500"
          subtitle="Tất cả hồ sơ đăng ký"
        />
        <StatCard
          icon={FaClock}
          title="Hồ Sơ Mới"
          value={stats.newApplications}
          color="border-l-green-500"
          subtitle="Hôm nay"
        />
        <StatCard
          icon={FaCheckCircle}
          title="Đã Duyệt"
          value={stats.approvedApplications}
          color="border-l-emerald-500"
          subtitle="Hồ sơ được chấp nhận"
        />
        <StatCard
          icon={FaTimesCircle}
          title="Chờ Xử Lý"
          value={stats.pendingApplications}
          color="border-l-orange-500"
          subtitle="Cần xem xét"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={FaGraduationCap}
          title="Ngành Đào Tạo"
          value={stats.totalMajors}
          color="border-l-purple-500"
          subtitle="Tổng số ngành"
        />
        <StatCard
          icon={FaUsers}
          title="Lượt Truy Cập"
          value={stats.todayVisitors}
          color="border-l-indigo-500"
          subtitle="Hôm nay"
        />
        <StatCard
          icon={FaTimesCircle}
          title="Từ Chối"
          value={stats.rejectedApplications}
          color="border-l-red-500"
          subtitle="Hồ sơ không đạt"
        />
      </div>

      {/* Recent Applications & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Hồ Sơ Mới Nhất</h3>
            <FaFileAlt className="text-blue-500" />
          </div>
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{app.studentName}</p>
                  <p className="text-sm text-gray-600">{app.major}</p>
                  <p className="text-xs text-gray-500">{app.submittedAt}</p>
                </div>
                {getStatusBadge(app.status)}
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-800 font-medium">
            Xem tất cả hồ sơ →
          </button>
        </motion.div>

        {/* Quick Actions & Notifications */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Thông Báo & Tác Vụ</h3>
            <FaBell className="text-orange-500" />
          </div>
          
          <div className="space-y-4">
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex">
                <FaClock className="text-yellow-600 mt-1" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-800">
                    86 hồ sơ đang chờ duyệt
                  </p>
                  <p className="text-xs text-yellow-700">
                    Cần xem xét trong vòng 24h
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
              <div className="flex">
                <FaChartLine className="text-blue-600 mt-1" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">
                    Báo cáo tuần sẵn sàng
                  </p>
                  <p className="text-xs text-blue-700">
                    Thống kê từ 17/01 - 23/01
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
              <div className="flex">
                <FaUsers className="text-green-600 mt-1" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    43 hồ sơ mới hôm nay
                  </p>
                  <p className="text-xs text-green-700">
                    Tăng 15% so với hôm qua
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Tác Vụ Nhanh</h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="p-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                Duyệt Hồ Sơ
              </button>
              <button className="p-2 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                Tạo Báo Cáo
              </button>
              <button className="p-2 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                Quản Lý FAQ
              </button>
              <button className="p-2 text-sm bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors">
                Xem Liên Hệ
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TongQuan; 