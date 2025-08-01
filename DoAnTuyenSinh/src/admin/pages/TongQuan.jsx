import React, { useState, useEffect, useContext } from "react";
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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const handleEditProfile = (profile) => {
    navigate(`/admin/quan-ly-ho-so/${profile.id}/edit`);
  };

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
      setError("");

      // Always fetch real data from database
      console.log("Fetching real data from database...");
      
      // Fetch all dashboard data in parallel
      const [statsResponse, recentResponse, majorsResponse] = await Promise.all(
        [
          axios.get("http://localhost:3001/api/admin/dashboard-stats"),
          axios.get("http://localhost:3001/api/admin/recent-applications"),
          axios.get("http://localhost:3001/api/admin/top-majors"),
        ]
      );

      // Process stats response
      if (statsResponse.data.success) {
        setStats(statsResponse.data.data);
        console.log("Stats loaded successfully:", statsResponse.data.data);
      } else {
        console.warn("Stats API returned unsuccessful response");
      }

      // Process recent applications response
      if (recentResponse.data.success) {
        setRecentApplications(recentResponse.data.data);
        console.log("Recent applications loaded successfully:", recentResponse.data.data.length, "items");
      } else {
        console.warn("Recent applications API returned unsuccessful response");
      }

      // Process top majors response
      if (majorsResponse.data.success) {
        setTopMajors(majorsResponse.data.data);
        console.log("Top majors loaded successfully:", majorsResponse.data.data.length, "items");
      } else {
        console.warn("Top majors API returned unsuccessful response");
      }

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      
      // Show specific error message based on error type
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        setError("Không thể kết nối đến server. Vui lòng kiểm tra server có đang chạy không.");
      } else if (error.response?.status === 404) {
        setError("API endpoint không tồn tại. Vui lòng kiểm tra cấu hình server.");
      } else if (error.response?.status === 500) {
        setError("Lỗi server nội bộ. Vui lòng kiểm tra logs server.");
      } else {
        setError(`Lỗi tải dữ liệu: ${error.message}`);
      }

      // Set sample data for testing when API fails
      console.log("Setting sample data for testing...");
      setStats({
        totalApplications: 1250,
        pendingApplications: 89,
        approvedApplications: 1089,
        rejectedApplications: 72,
        totalStudents: 1089,
        totalMajors: 25,
        averageGPA: 7.8,
        completionRate: 85,
      });
      
      setRecentApplications([
        {
          id: 1,
          studentName: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          major: "Công nghệ thông tin",
          gpa: 8.5,
          status: "pending",
          submittedAt: new Date().toISOString(),
          avatar: "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=3b82f6&color=fff"
        },
        {
          id: 2,
          studentName: "Trần Thị B",
          email: "tranthib@example.com",
          major: "Quản trị kinh doanh",
          gpa: 7.8,
          status: "approved",
          submittedAt: new Date(Date.now() - 86400000).toISOString(),
          avatar: "https://ui-avatars.com/api/?name=Tran+Thi+B&background=10b981&color=fff"
        }
      ]);
      
      setTopMajors([
        { name: "Công nghệ thông tin", count: 450, percentage: 36, trend: "+12%", icon: "💻" },
        { name: "Quản trị kinh doanh", count: 320, percentage: 26, trend: "+8%", icon: "📊" },
        { name: "Kế toán", count: 280, percentage: 22, trend: "+5%", icon: "💰" },
        { name: "Marketing", count: 150, percentage: 12, trend: "+15%", icon: "📈" },
        { name: "Thiết kế đồ họa", count: 50, percentage: 4, trend: "+20%", icon: "🎨" }
      ]);
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
        <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/10 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/10 group">
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
              <p className="text-sm text-gray-300 mb-2 font-medium">{title}</p>
              <p className={`text-4xl font-black text-white mb-1 stat-number`}>
                {typeof value === "number" ? value.toLocaleString() : value}
              </p>
              {subtitle && (
                <p className="text-xs text-gray-400 mb-3">{subtitle}</p>
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
                  <span className="text-xs text-gray-400">
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
                )} rounded-xl flex items-center justify-center shadow-lg stat-icon transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl`}
            >
              <Icon className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <style jsx>{`
          .stat-card {
            opacity: 1;
            transform: none;
          }

          .stat-number {
            opacity: 1;
            transform: none;
          }

          .stat-trend {
            opacity: 1;
            transform: none;
          }

          .stat-icon {
            opacity: 1;
            transform: none;
            transition: all 0.3s ease;
          }

          .stat-card:hover .stat-icon {
            transform: scale(1.1) rotate(6deg);
          }

          .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.5s;
          }

          .stat-card:hover::before {
            left: 100%;
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
      <span
        className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 ${color} shadow-lg`}
      >
        <Icon />
        {text}
      </span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Modern Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="header-content">
              <h1 className="text-5xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4 relative">
                Dashboard Tổng Quan
                <span className="inline-block ml-3 text-purple-400 sparkle-icon">
                  <FaMagic />
                </span>
              </h1>
              <p className="text-xl text-gray-300 flex items-center gap-2">
                <span className="rocket-icon text-cyan-400">
                  <FaRocket />
                </span>
                Hệ thống quản lý tuyển sinh HUTECH 2025
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-xl border border-white/10 relative overflow-hidden clock-container">
              {/* Static background with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl"></div>

              <div className="text-right relative z-10">
                <p className="text-sm text-gray-300 mb-1 flex items-center justify-end gap-2">
                  <span className="text-base clock-emoji">🕐</span>
                  Thời gian thực
                </p>
                <div className="text-2xl font-bold text-white font-mono tracking-wider">
                  {currentTime.toLocaleTimeString("vi-VN")}
                </div>
                <p className="text-sm text-gray-400 flex items-center justify-end gap-2 mt-1">
                  <FaCalendarAlt className="text-purple-400" />
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

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaTimes className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Lỗi tải dữ liệu
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={fetchDashboardData}
                    className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Thử lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mb-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaClock className="h-5 w-5 text-blue-400 animate-spin" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Đang tải dữ liệu...
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Vui lòng chờ trong giây lát</p>
                </div>
              </div>
            </div>
          </div>
        )}

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
          <div
            className="xl:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3
                  className="text-2xl font-bold text-gray-900 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <FaChartBar className="text-white text-lg" />
                  </div>
                  Top 5 Ngành Học Phổ Biến
                </h3>
                <div
                  className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full"
                >
                  <FaFire className="text-orange-500" />
                  Hot trends
                </div>
              </div>

              <div className="space-y-6">
                {topMajors.map((major, index) => (
                  <div
                    key={major.name}
                    className="group relative"
                  >
                    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                      <div className="relative z-10 flex items-center gap-6">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${getMajorColor(
                            index
                          )} rounded-2xl flex items-center justify-center text-2xl shadow-xl`}
                        >
                          {major.icon}
                        </div>
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
                        <div
                          className="text-2xl font-black text-gray-900 mb-2"
                        >
                          {major.percentage}%
                        </div>
                        <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Applications */}
          <div
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3
                  className="text-xl font-bold text-gray-900 flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <FaBolt className="text-white text-sm" />
                  </div>
                  Hồ Sơ Gần Đây
                </h3>
                <div
                  className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                >
                  {recentApplications.length} hồ sơ
                </div>
              </div>

              <div className="space-y-4">
                {recentApplications.map((app, index) => (
                  <div
                    key={app.id}
                    className="group p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer relative overflow-hidden"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-3">
                        <img
                          src={app.avatar}
                          alt={app.studentName}
                          className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
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
                        <button
                          className="flex-1 py-2 bg-blue-100 text-blue-600 rounded-xl text-xs font-semibold hover:bg-blue-200 transition-all duration-200 flex items-center justify-center gap-1"
                          onClick={() => handleViewProfile(app)}
                        >
                          <FaEye />
                          Xem
                        </button>
                        <button
                          className="flex-1 py-2 bg-green-100 text-green-600 rounded-xl text-xs font-semibold hover:bg-green-200 transition-all duration-200 flex items-center justify-center gap-1"
                          onClick={() => handleEditProfile(app)}
                        >
                          <FaEdit />
                          Sửa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-xl"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaGem />
                  Xem tất cả hồ sơ
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="mt-12 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3
              className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <FaMagic className="text-white text-lg" />
              </div>
              Thao Tác Nhanh
            </h3>

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
                <button
                  key={action.title}
                  className={`p-6 bg-gradient-to-r ${action.color} text-white rounded-2xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
                >
                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"
                    >
                      <action.icon className="text-xl" />
                    </div>
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
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showProfileModal && selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowProfileModal(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4">Chi tiết hồ sơ</h2>
            <div className="space-y-2">
              <div><b>Họ tên:</b> {selectedProfile.studentName}</div>
              <div><b>Email:</b> {selectedProfile.email}</div>
              <div><b>Ngành:</b> {selectedProfile.major}</div>
              <div><b>GPA:</b> {selectedProfile.gpa}</div>
              <div><b>Trạng thái:</b> {selectedProfile.status}</div>
              {/* Thêm các trường khác nếu cần */}
            </div>
            <div className="mt-6 text-right">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                onClick={() => setShowProfileModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TongQuan;