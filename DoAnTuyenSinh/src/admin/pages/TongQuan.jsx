import React, { useState, useEffect, useContext } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import axios from "axios";
import { UserContext } from "../../accounts/UserContext";
import { DEMO_DASHBOARD_STATS } from "../../config/demoData";
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
  FaQuestionCircle,
  FaEye,
  FaEdit,
  FaArrowUp,
  FaArrowDown,
  FaBolt,
  FaGlobe,
  FaRocket,
  FaFire,
  FaGem,
  FaMagic,
} from "react-icons/fa";

const TongQuan = () => {
  const { isDemoMode } = useContext(UserContext);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    totalStudents: 0,
    totalMajors: 0,
    averageGPA: 0,
    completionRate: 0,
  });

  const [recentApplications, setRecentApplications] = useState([]);
  const [topMajors, setTopMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      if (isDemoMode) {
        // Use demo data when in demo mode
        console.log("Using demo data for dashboard");
        setStats({
          totalApplications: DEMO_DASHBOARD_STATS.total_applications,
          pendingApplications: DEMO_DASHBOARD_STATS.pending_applications,
          approvedApplications: DEMO_DASHBOARD_STATS.approved_applications,
          rejectedApplications: DEMO_DASHBOARD_STATS.rejected_applications,
          totalStudents: DEMO_DASHBOARD_STATS.total_users,
          totalMajors: DEMO_DASHBOARD_STATS.total_majors,
          averageGPA: 7.8,
          completionRate: 85,
        });
        setRecentApplications(DEMO_DASHBOARD_STATS.recent_applications);
        setTopMajors(DEMO_DASHBOARD_STATS.top_majors);
        setError("");
        return;
      }

      // Fetch all dashboard data in parallel
      const [statsResponse, recentResponse, majorsResponse] = await Promise.all(
        [
          axios.get("http://localhost:3001/api/admin/dashboard-stats"),
          axios.get("http://localhost:3001/api/admin/recent-applications"),
          axios.get("http://localhost:3001/api/admin/top-majors"),
        ]
      );

      if (statsResponse.data.success) {
        setStats(statsResponse.data.data);
      }

      if (recentResponse.data.success) {
        setRecentApplications(recentResponse.data.data);
      }

      if (majorsResponse.data.success) {
        setTopMajors(majorsResponse.data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError(
        "Không thể tải dữ liệu dashboard. Vui lòng kiểm tra kết nối server."
      );

      // Set empty arrays instead of mock data
      setStats({
        totalApplications: 0,
        pendingApplications: 0,
        approvedApplications: 0,
        rejectedApplications: 0,
        totalStudents: 0,
        totalMajors: 0,
        averageGPA: 0,
        completionRate: 0,
      });
      setRecentApplications([]);
      setTopMajors([]);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({
    icon: Icon,
    title,
    value,
    color,
    subtitle,
    trend,
    delay = 0,
  }) => {
    return (
      <div
        className="relative group cursor-pointer stat-card"
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-3xl hover:scale-105">
          {/* Simple hover background */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${color
                .replace("text-", "")
                .replace("-600", "")}15, ${color
                .replace("text-", "")
                .replace("-600", "")}05)`,
            }}
          />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2 font-medium">{title}</p>
              <p className={`text-4xl font-black ${color} mb-1 stat-number`}>
                {typeof value === "number" ? value.toLocaleString() : value}
              </p>
              {subtitle && (
                <p className="text-xs text-gray-500 mb-3">{subtitle}</p>
              )}
              {trend && (
                <div className="flex items-center gap-2 stat-trend">
                  <span
                    className={`text-xs font-bold flex items-center gap-1 ${
                      parseFloat(trend.replace("%", "")) > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {parseFloat(trend.replace("%", "")) > 0 ? (
                      <FaArrowUp />
                    ) : (
                      <FaArrowDown />
                    )}
                    {trend}
                  </span>
                  <span className="text-xs text-gray-500">
                    so với tháng trước
                  </span>
                </div>
              )}
            </div>

            <div
              className={`w-20 h-20 bg-gradient-to-br ${color
                .replace("text-", "from-")
                .replace("-600", "-400")} ${color
                .replace("text-", "to-")
                .replace(
                  "-600",
                  "-600"
                )} rounded-2xl flex items-center justify-center shadow-2xl stat-icon transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
            >
              <Icon className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <style jsx>{`
          .stat-card {
            animation: slideInUp 0.6s ease-out forwards;
            opacity: 0;
            transform: translateY(30px);
          }

          .stat-number {
            animation: countUp 0.8s ease-out forwards;
            animation-delay: calc(${delay}s + 0.3s);
          }

          .stat-trend {
            animation: fadeInLeft 0.6s ease-out forwards;
            animation-delay: calc(${delay}s + 0.5s);
            opacity: 0;
            transform: translateX(-20px);
          }

          .stat-icon {
            animation: iconBounce 0.6s ease-out forwards;
            animation-delay: calc(${delay}s + 0.2s);
            transform: scale(0.8);
          }

          @keyframes slideInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes countUp {
            from {
              transform: scale(0.5);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes fadeInLeft {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes iconBounce {
            0% {
              transform: scale(0.8);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }

          .stat-card:hover .stat-icon {
            animation: iconRotate 0.3s ease-in-out forwards;
          }

          @keyframes iconRotate {
            to {
              transform: scale(1.1) rotate(12deg);
            }
          }
        `}</style>
      </div>
    );
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: {
        text: "Chờ xử lý",
        color: "bg-gradient-to-r from-yellow-400 to-orange-400 text-white",
        icon: FaClock,
      },
      approved: {
        text: "Đã duyệt",
        color: "bg-gradient-to-r from-green-400 to-emerald-400 text-white",
        icon: FaCheckCircle,
      },
      rejected: {
        text: "Từ chối",
        color: "bg-gradient-to-r from-red-400 to-pink-400 text-white",
        icon: FaTimes,
      },
    };
    const { text, color, icon: Icon } = config[status];
    return (
      <motion.span
        className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 ${color} shadow-lg`}
        whileHover={{ scale: 1.05 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon />
        {text}
      </motion.span>
    );
  };

  const getMajorColor = (index) => {
    const colors = [
      "from-blue-500 to-cyan-400",
      "from-green-500 to-emerald-400",
      "from-purple-500 to-pink-400",
      "from-orange-500 to-yellow-400",
      "from-red-500 to-pink-400",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${10 + i * 15}%`,
              top: `${5 + i * 12}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="header-content">
              <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 relative">
                Dashboard Tổng Quan
                <span className="inline-block ml-3 text-yellow-500 sparkle-icon">
                  <FaMagic />
                </span>
              </h1>
              <p className="text-xl text-gray-600 flex items-center gap-2">
                <span className="rocket-icon text-blue-500">
                  <FaRocket />
                </span>
                Hệ thống quản lý tuyển sinh HUTECH 2025
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-xl border border-white/20 relative overflow-hidden clock-container">
              {/* Static background with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl"></div>

              <div className="text-right relative z-10">
                <p className="text-sm text-gray-600 mb-1 flex items-center justify-end gap-2">
                  <span className="text-base clock-emoji">🕐</span>
                  Thời gian thực
                </p>
                <div className="text-2xl font-bold text-blue-600 font-mono tracking-wider">
                  {currentTime.toLocaleTimeString("vi-VN")}
                </div>
                <p className="text-sm text-gray-500 flex items-center justify-end gap-2 mt-1">
                  <FaCalendarAlt className="text-blue-500" />
                  {currentTime.toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .header-content {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
            transform: translateY(30px);
          }

          .sparkle-icon {
            animation: sparkleGlow 4s ease-in-out infinite;
            filter: drop-shadow(0 0 8px rgba(255, 193, 7, 0.3));
          }

          .rocket-icon {
            animation: rocketFloat 6s ease-in-out infinite;
            display: inline-block;
          }

          .clock-container {
            animation: slideInRight 0.8s ease-out 0.3s forwards;
            opacity: 0;
            transform: translateX(30px);
          }

          .clock-emoji {
            animation: clockTick 2s ease-in-out infinite;
            display: inline-block;
          }

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInRight {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes sparkleGlow {
            0%,
            100% {
              transform: scale(1);
              opacity: 0.8;
              filter: drop-shadow(0 0 8px rgba(255, 193, 7, 0.3));
            }
            50% {
              transform: scale(1.1);
              opacity: 1;
              filter: drop-shadow(0 0 12px rgba(255, 193, 7, 0.6));
            }
          }

          @keyframes rocketFloat {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            25% {
              transform: translateY(-3px) rotate(2deg);
            }
            50% {
              transform: translateY(-5px) rotate(0deg);
            }
            75% {
              transform: translateY(-3px) rotate(-2deg);
            }
          }

          @keyframes clockTick {
            0%,
            50%,
            100% {
              transform: scale(1);
            }
            25%,
            75% {
              transform: scale(1.05);
            }
          }
        `}</style>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard
            icon={FaFileAlt}
            title="Tổng hồ sơ"
            value={stats.totalApplications}
            color="text-blue-600"
            subtitle="Hồ sơ đã nộp"
            trend="+12.5%"
            delay={0.1}
          />
          <StatCard
            icon={FaClock}
            title="Chờ xử lý"
            value={stats.pendingApplications}
            color="text-orange-600"
            subtitle="Cần duyệt"
            trend="-5.2%"
            delay={0.2}
          />
          <StatCard
            icon={FaCheckCircle}
            title="Đã duyệt"
            value={stats.approvedApplications}
            color="text-green-600"
            subtitle="Hồ sơ hợp lệ"
            trend="+8.7%"
            delay={0.3}
          />
          <StatCard
            icon={FaTimes}
            title="Từ chối"
            value={stats.rejectedApplications}
            color="text-red-600"
            subtitle="Hồ sơ không hợp lệ"
            trend="-2.1%"
            delay={0.4}
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard
            icon={FaUsers}
            title="Sinh viên"
            value={stats.totalStudents}
            color="text-purple-600"
            subtitle="Đã nhập học"
            trend="+15.2%"
            delay={0.5}
          />
          <StatCard
            icon={FaGraduationCap}
            title="Ngành học"
            value={stats.totalMajors}
            color="text-indigo-600"
            subtitle="Chương trình đào tạo"
            trend="+2.3%"
            delay={0.6}
          />
          <StatCard
            icon={FaStar}
            title="GPA trung bình"
            value={stats.averageGPA}
            color="text-yellow-600"
            subtitle="Điểm trung bình"
            trend="+0.3%"
            delay={0.7}
          />
          <StatCard
            icon={FaTrophy}
            title="Tỷ lệ hoàn thành"
            value={`${stats.completionRate}%`}
            color="text-emerald-600"
            subtitle="Hồ sơ hoàn chỉnh"
            trend="+4.2%"
            delay={0.8}
          />
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Top Majors Chart */}
          <motion.div
            className="xl:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <motion.h3
                  className="text-2xl font-bold text-gray-900 flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <FaChartBar className="text-white text-lg" />
                  </div>
                  Top 5 Ngành Học Phổ Biến
                </motion.h3>
                <motion.div
                  className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <FaFire className="text-orange-500" />
                  Hot trends
                </motion.div>
              </div>

              <div className="space-y-6">
                {topMajors.map((major, index) => (
                  <motion.div
                    key={major.name}
                    className="group relative"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.8 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                      <div className="relative z-10 flex items-center gap-6">
                        <motion.div
                          className={`w-16 h-16 bg-gradient-to-r ${getMajorColor(
                            index
                          )} rounded-2xl flex items-center justify-center text-2xl shadow-xl`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            duration: 0.6,
                          }}
                        >
                          {major.icon}
                        </motion.div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">
                            {major.name}
                          </h4>
                          <div className="flex items-center gap-4">
                            <p className="text-sm text-gray-600">
                              {major.count} hồ sơ
                            </p>
                            <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                              <FaArrowUp className="text-xs" />
                              {major.trend}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 text-right">
                        <motion.div
                          className="text-2xl font-black text-gray-900 mb-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 1 + index * 0.1,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          {major.percentage}%
                        </motion.div>
                        <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${getMajorColor(
                              index
                            )} shadow-lg`}
                            initial={{ width: 0 }}
                            animate={{ width: `${major.percentage}%` }}
                            transition={{
                              delay: 1.2 + index * 0.1,
                              duration: 1,
                              type: "spring",
                              stiffness: 100,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Applications */}
          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <motion.h3
                  className="text-xl font-bold text-gray-900 flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <FaBolt className="text-white text-sm" />
                  </div>
                  Hồ Sơ Gần Đây
                </motion.h3>
                <motion.div
                  className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {recentApplications.length} hồ sơ
                </motion.div>
              </div>

              <div className="space-y-4">
                {recentApplications.map((app, index) => (
                  <motion.div
                    key={app.id}
                    className="group p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-3">
                        <motion.img
                          src={app.avatar}
                          alt={app.studentName}
                          className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg">
                            {app.studentName}
                          </h4>
                          <p className="text-sm text-gray-600">{app.major}</p>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt />
                          {new Date(app.submittedAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                        <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                          <FaStar className="text-yellow-500" />
                          GPA: {app.gpa}
                        </span>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <motion.button
                          className="flex-1 py-2 bg-blue-100 text-blue-600 rounded-xl text-xs font-semibold hover:bg-blue-200 transition-all duration-200 flex items-center justify-center gap-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaEye />
                          Xem
                        </motion.button>
                        <motion.button
                          className="flex-1 py-2 bg-green-100 text-green-600 rounded-xl text-xs font-semibold hover:bg-green-200 transition-all duration-200 flex items-center justify-center gap-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaEdit />
                          Sửa
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-xl"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <FaGem />
                  Xem tất cả hồ sơ
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mt-12 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
        >
          <div className="relative z-10">
            <motion.h3
              className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <FaMagic className="text-white text-lg" />
              </div>
              Thao Tác Nhanh
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: FaFileAlt,
                  title: "Xử lý hồ sơ",
                  subtitle: "Duyệt hồ sơ mới",
                  color: "from-blue-500 to-cyan-400",
                  count: "89 hồ sơ",
                },
                {
                  icon: FaUsers,
                  title: "Quản lý sinh viên",
                  subtitle: "Thông tin sinh viên",
                  color: "from-green-500 to-emerald-400",
                  count: "1,089 sinh viên",
                },
                {
                  icon: FaQuestionCircle,
                  title: "Quản lý FAQ",
                  subtitle: "Câu hỏi thường gặp",
                  color: "from-purple-500 to-pink-400",
                  count: "25 FAQ",
                },
                {
                  icon: FaChartBar,
                  title: "Báo cáo",
                  subtitle: "Thống kê chi tiết",
                  color: "from-orange-500 to-yellow-400",
                  count: "12 báo cáo",
                },
              ].map((action, index) => (
                <motion.button
                  key={action.title}
                  className={`p-6 bg-gradient-to-r ${action.color} text-white rounded-2xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <div className="relative z-10 flex items-start gap-4">
                    <motion.div
                      className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <action.icon className="text-xl" />
                    </motion.div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-lg mb-1">
                        {action.title}
                      </div>
                      <div className="text-sm opacity-90 mb-2">
                        {action.subtitle}
                      </div>
                      <div className="text-xs bg-white/20 px-2 py-1 rounded-full inline-block">
                        {action.count}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TongQuan;
