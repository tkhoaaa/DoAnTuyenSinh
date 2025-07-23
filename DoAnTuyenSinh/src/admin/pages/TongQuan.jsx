import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaGraduationCap,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaTrophy,
  FaQuestionCircle
} from 'react-icons/fa';

const TongQuan = () => {
  const [stats, setStats] = useState({
    totalApplications: 1247,
    pendingApplications: 89,
    approvedApplications: 1089,
    rejectedApplications: 69,
    totalStudents: 1089,
    totalMajors: 61,
    averageGPA: 8.2,
    completionRate: 87.3
  });

  const [recentApplications, setRecentApplications] = useState([
    {
      id: 1,
      studentName: "Nguyễn Văn An",
      major: "Công nghệ Thông tin",
      submittedAt: "2025-01-23 14:30",
      status: "pending",
      gpa: 8.5
    },
    {
      id: 2,
      studentName: "Trần Thị Bình",
      major: "Quản trị Kinh doanh",
      submittedAt: "2025-01-23 13:15",
      status: "approved",
      gpa: 9.2
    },
    {
      id: 3,
      studentName: "Lê Minh Cường",
      major: "Kỹ thuật Cơ khí",
      submittedAt: "2025-01-23 12:45",
      status: "pending",
      gpa: 7.8
    },
    {
      id: 4,
      studentName: "Phan Thị Dung",
      major: "Kế toán",
      submittedAt: "2025-01-23 11:20",
      status: "rejected",
      gpa: 6.5
    }
  ]);

  const [topMajors, setTopMajors] = useState([
    { name: "Công nghệ Thông tin", count: 245, percentage: 19.6 },
    { name: "Quản trị Kinh doanh", count: 198, percentage: 15.9 },
    { name: "Kỹ thuật Cơ khí", count: 156, percentage: 12.5 },
    { name: "Kế toán", count: 134, percentage: 10.7 },
    { name: "Tài chính - Ngân hàng", count: 112, percentage: 9.0 }
  ]);

  const StatCard = ({ icon: Icon, title, value, color, subtitle, trend }) => (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
              <span className="text-xs text-gray-500 ml-1">so với tháng trước</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 bg-gradient-to-r ${color.replace('text-', 'from-').replace('-600', '-500 to-').replace('-500', '-600')} rounded-xl flex items-center justify-center`}>
          <Icon className="text-white text-xl" />
        </div>
      </div>
    </motion.div>
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { text: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800", icon: FaClock },
      approved: { text: "Đã duyệt", color: "bg-green-100 text-green-800", icon: FaCheckCircle },
      rejected: { text: "Từ chối", color: "bg-red-100 text-red-800", icon: FaTimes }
    };
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${config.color}`}>
        <Icon className="text-xs" />
        {config.text}
      </span>
    );
  };

  const getMajorColor = (index) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-green-500 to-green-600",
      "from-purple-500 to-purple-600",
      "from-orange-500 to-orange-600",
      "from-red-500 to-red-600"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tổng Quan Hệ Thống</h1>
            <p className="text-gray-600 text-lg">Thống kê tổng quan về tuyển sinh HUTECH 2025</p>
          </div>
          <div className="flex items-center gap-4">
            <motion.div 
              className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <span className="text-sm text-gray-600">Cập nhật: </span>
              <span className="font-semibold text-blue-600">23/01/2025</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <StatCard
          icon={FaFileAlt}
          title="Tổng hồ sơ"
          value={stats.totalApplications.toLocaleString()}
          color="text-blue-600"
          subtitle="Hồ sơ đã nộp"
          trend={12.5}
        />
        <StatCard
          icon={FaClock}
          title="Chờ xử lý"
          value={stats.pendingApplications}
          color="text-yellow-600"
          subtitle="Cần duyệt"
          trend={-5.2}
        />
        <StatCard
          icon={FaCheckCircle}
          title="Đã duyệt"
          value={stats.approvedApplications.toLocaleString()}
          color="text-green-600"
          subtitle="Hồ sơ hợp lệ"
          trend={8.7}
        />
        <StatCard
          icon={FaTimes}
          title="Từ chối"
          value={stats.rejectedApplications}
          color="text-red-600"
          subtitle="Hồ sơ không hợp lệ"
          trend={-2.1}
        />
      </motion.div>

      {/* Additional Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <StatCard
          icon={FaUsers}
          title="Sinh viên"
          value={stats.totalStudents.toLocaleString()}
          color="text-purple-600"
          subtitle="Đã nhập học"
        />
        <StatCard
          icon={FaGraduationCap}
          title="Ngành học"
          value={stats.totalMajors}
          color="text-indigo-600"
          subtitle="Chương trình đào tạo"
        />
        <StatCard
          icon={FaStar}
          title="GPA trung bình"
          value={stats.averageGPA}
          color="text-orange-600"
          subtitle="Điểm trung bình"
        />
        <StatCard
          icon={FaTrophy}
          title="Tỷ lệ hoàn thành"
          value={`${stats.completionRate}%`}
          color="text-emerald-600"
          subtitle="Hồ sơ hoàn chỉnh"
        />
      </motion.div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Majors Chart */}
        <motion.div 
          className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaChartBar className="text-blue-500" />
              Top 5 Ngành Học Phổ Biến
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaChartPie className="text-purple-500" />
              Thống kê theo ngành
            </div>
          </div>
          
          <div className="space-y-4">
            {topMajors.map((major, index) => (
              <motion.div
                key={major.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${getMajorColor(index)} rounded-lg flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{major.name}</h4>
                    <p className="text-sm text-gray-600">{major.count} hồ sơ</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{major.percentage}%</div>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${getMajorColor(index)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${major.percentage}%` }}
                      transition={{ delay: 0.2 * index, duration: 0.8 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaClock className="text-orange-500" />
              Hồ Sơ Gần Đây
            </h3>
            <div className="text-sm text-gray-600">
              {recentApplications.length} hồ sơ
            </div>
          </div>
          
          <div className="space-y-4">
            {recentApplications.map((app, index) => (
              <motion.div
                key={app.id}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{app.studentName}</h4>
                  {getStatusBadge(app.status)}
                </div>
                <div className="text-sm text-gray-600 mb-2">{app.major}</div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt />
                    {app.submittedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    GPA: {app.gpa}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.button
            className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Xem tất cả hồ sơ
          </motion.button>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div 
        className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FaChartLine className="text-green-500" />
          Thao Tác Nhanh
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.button
            className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFileAlt className="text-xl" />
            <div className="text-left">
              <div className="font-semibold">Xử lý hồ sơ</div>
              <div className="text-sm opacity-90">Duyệt hồ sơ mới</div>
            </div>
          </motion.button>
          
          <motion.button
            className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUsers className="text-xl" />
            <div className="text-left">
              <div className="font-semibold">Quản lý sinh viên</div>
              <div className="text-sm opacity-90">Thông tin sinh viên</div>
            </div>
          </motion.button>
          
          <motion.button
            className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaQuestionCircle className="text-xl" />
            <div className="text-left">
              <div className="font-semibold">Quản lý FAQ</div>
              <div className="text-sm opacity-90">Câu hỏi thường gặp</div>
            </div>
          </motion.button>
          
          <motion.button
            className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChartBar className="text-xl" />
            <div className="text-left">
              <div className="font-semibold">Báo cáo</div>
              <div className="text-sm opacity-90">Thống kê chi tiết</div>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default TongQuan; 