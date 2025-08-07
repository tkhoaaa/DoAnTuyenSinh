import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../accounts/UserContext";
import { useDarkMode } from "../../contexts/DarkModeContext";
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
  FaSun,
  FaMoon,
  FaStarOfLife,
  FaHeart,
  FaShieldAlt,
  FaLightbulb,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TongQuan = () => {
  const { isDemoMode } = useContext(UserContext);
  const { darkMode, toggleDarkMode } = useDarkMode();
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
        className={`group relative overflow-hidden rounded-3xl transition-all duration-300 hover:scale-105 cursor-pointer ${
          darkMode 
            ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/60' 
            : 'bg-white/80 border-white/20 hover:bg-white/90'
        } backdrop-blur-xl border shadow-xl hover:shadow-2xl`}
      >
        {/* Animated background gradient */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ${
          darkMode ? 'bg-gradient-to-br from-gray-700/30 to-gray-600/20' : 'bg-gradient-to-br from-blue-50/50 to-purple-50/30'
        }`} />
        


        <div className="relative z-10 p-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  darkMode ? 'bg-green-400' : 'bg-green-500'
                }`} />
                <p className={`text-sm font-semibold tracking-wide uppercase ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {title}
                </p>
              </div>
              
              <div className="mb-4">
                <p className={`text-4xl font-black mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                } transition-all duration-300 group-hover:scale-110`}>
                  {typeof value === "number" ? value.toLocaleString() : value}
                </p>
                {subtitle && (
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {subtitle}
                  </p>
                )}
              </div>
              
              {trend && (
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                    parseFloat(trend.replace("%", "")) > 0
                      ? darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'
                      : darkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-700'
                  }`}>
                    {parseFloat(trend.replace("%", "")) > 0 ? (
                      <FaArrowUp className="animate-bounce" />
                    ) : (
                      <FaArrowDown className="animate-bounce" />
                    )}
                    {trend}
                  </div>
                  <span className={`text-xs ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    so với tháng trước
                  </span>
                </div>
              )}
            </div>

            <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-700 to-gray-600' 
                : `bg-gradient-to-br ${color.replace("text-", "from-").replace("-600", "-400")} ${color.replace("text-", "to-").replace("-600", "-600")}`
            }`}>
              <Icon className="text-white text-2xl transition-all duration-300 group-hover:scale-125" />
              
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-500 ${
                darkMode 
                  ? 'bg-gradient-to-br from-blue-400/20 to-purple-400/20' 
                  : 'bg-gradient-to-br from-white/30 to-transparent'
              }`} />
            </div>
          </div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
      </div>
    );
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: {
        text: "Chờ xử lý",
        color: darkMode 
          ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white" 
          : "bg-gradient-to-r from-yellow-400 to-orange-400 text-white",
        icon: FaClock,
      },
      approved: {
        text: "Đã duyệt",
        color: darkMode 
          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white" 
          : "bg-gradient-to-r from-green-400 to-emerald-400 text-white",
        icon: FaCheckCircle,
      },
      rejected: {
        text: "Từ chối",
        color: darkMode 
          ? "bg-gradient-to-r from-red-600 to-pink-600 text-white" 
          : "bg-gradient-to-r from-red-400 to-pink-400 text-white",
        icon: FaTimes,
      },
    };
    const { text, color, icon: Icon } = config[status];
    return (
      <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 ${color} shadow-lg animate-pulse`}>
        <Icon />
        {text}
      </span>
    );
  };

  const getMajorColor = (index) => {
    const lightColors = [
      "from-blue-500 to-cyan-400",
      "from-green-500 to-emerald-400",
      "from-purple-500 to-pink-400",
      "from-orange-500 to-yellow-400",
      "from-red-500 to-pink-400",
    ];
    const darkColors = [
      "from-blue-600 to-cyan-500",
      "from-green-600 to-emerald-500",
      "from-purple-600 to-pink-500",
      "from-orange-600 to-yellow-500",
      "from-red-600 to-pink-500",
    ];
    const colors = darkMode ? darkColors : lightColors;
    return colors[index % colors.length];
  };

  return (
    <div className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
    }`}>
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary orbs */}
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20' 
            : 'bg-gradient-to-br from-blue-300/30 to-purple-300/30'
        }`} style={{ animationDuration: '4s' }} />
        
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${
          darkMode 
            ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20' 
            : 'bg-gradient-to-br from-purple-300/30 to-pink-300/30'
        }`} style={{ animationDuration: '6s', animationDelay: '1s' }} />
        
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          darkMode 
            ? 'bg-gradient-to-br from-cyan-600/15 to-blue-600/15' 
            : 'bg-gradient-to-br from-cyan-300/25 to-blue-300/25'
        }`} style={{ animationDuration: '8s', animationDelay: '2s' }} />

        {/* Secondary floating elements */}
        <div className={`absolute top-20 left-20 w-32 h-32 rounded-full blur-2xl animate-bounce ${
          darkMode ? 'bg-green-600/10' : 'bg-green-300/20'
        }`} style={{ animationDuration: '3s' }} />
        
        <div className={`absolute bottom-20 right-20 w-24 h-24 rounded-full blur-2xl animate-bounce ${
          darkMode ? 'bg-yellow-600/10' : 'bg-yellow-300/20'
        }`} style={{ animationDuration: '4s', animationDelay: '1s' }} />
      </div>

      {/* Content with proper spacing to avoid menu overlap */}
      <div className="relative p-6 pt-8">
        {/* Enhanced Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="header-content">
              <div className="flex items-center gap-4 mb-4">
                                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl ${
                   darkMode 
                     ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
                     : 'bg-gradient-to-br from-blue-500 to-purple-500'
                 } animate-pulse`}>
                   <FaStarOfLife className="text-white text-2xl animate-spin" style={{ animationDuration: '3s' }} />
                </div>
                <div>
                  <h1 className={`text-5xl font-black mb-2 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent' 
                      : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'
                  }`}>
                    Trang Tổng Quan
                  </h1>
                  <p className={`text-xl flex items-center gap-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <FaRocket className={`animate-bounce ${
                      darkMode ? 'text-cyan-400' : 'text-cyan-500'
                    }`} />
                    Hệ thống quản lý tuyển sinh HUTECH 2025
                    <FaHeart className={`animate-pulse ${
                      darkMode ? 'text-red-400' : 'text-red-500'
                    }`} />
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-4 rounded-2xl transition-all duration-300 hover:scale-110 ${
                  darkMode 
                    ? 'bg-gray-800/50 border-gray-700/50 text-yellow-400 hover:bg-gray-700/60' 
                    : 'bg-white/80 border-white/20 text-gray-600 hover:bg-white/90'
                } backdrop-blur-xl border shadow-xl`}
              >
                {darkMode ? <FaSun className="text-xl animate-spin" /> : <FaMoon className="text-xl" />}
              </button>

              {/* Enhanced Clock */}
              <div className={`backdrop-blur-xl px-6 py-4 rounded-2xl shadow-xl border relative overflow-hidden ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700/50' 
                  : 'bg-white/80 border-white/20'
              }`}>
                <div className={`absolute inset-0 ${
                  darkMode 
                    ? 'bg-gradient-to-r from-blue-600/10 to-purple-600/10' 
                    : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                } rounded-2xl`} />

                <div className="text-right relative z-10">
                  <p className={`text-sm mb-1 flex items-center justify-end gap-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <FaLightbulb className={`animate-pulse ${
                      darkMode ? 'text-yellow-400' : 'text-yellow-500'
                    }`} />
                    Thời gian thực
                  </p>
                  <div className={`text-2xl font-bold font-mono tracking-wider ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {currentTime.toLocaleTimeString("vi-VN")}
                  </div>
                  <p className={`text-sm flex items-center justify-end gap-2 mt-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <FaCalendarAlt className={`${
                      darkMode ? 'text-purple-400' : 'text-purple-500'
                    }`} />
                    {currentTime.toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Error Message */}
        {error && (
          <div className={`mb-8 border-l-4 p-6 rounded-lg shadow-lg ${
            darkMode 
              ? 'bg-red-900/20 border-red-500 text-red-300' 
              : 'bg-red-50 border-red-400 text-red-800'
          }`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaTimes className={`h-5 w-5 ${
                  darkMode ? 'text-red-400' : 'text-red-400'
                }`} />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">Lỗi tải dữ liệu</h3>
                <div className="mt-2 text-sm">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={fetchDashboardData}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      darkMode 
                        ? 'bg-red-800 hover:bg-red-700 text-red-200' 
                        : 'bg-red-100 hover:bg-red-200 text-red-800'
                    }`}
                  >
                    Thử lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Loading State */}
        {loading && (
          <div className={`mb-8 border-l-4 p-6 rounded-lg shadow-lg ${
            darkMode 
              ? 'bg-blue-900/20 border-blue-500 text-blue-300' 
              : 'bg-blue-50 border-blue-400 text-blue-800'
          }`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaClock className={`h-5 w-5 animate-spin ${
                  darkMode ? 'text-blue-400' : 'text-blue-400'
                }`} />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">Đang tải dữ liệu...</h3>
                <div className="mt-2 text-sm">
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
          <div className={`xl:col-span-2 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border relative overflow-hidden ${
            darkMode 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/80 border-white/20'
          }`}>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className={`text-2xl font-bold flex items-center gap-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    darkMode 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}>
                    <FaChartBar className="text-white text-lg" />
                  </div>
                  Top 5 Ngành Học Phổ Biến
                </h3>
                <div className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full ${
                  darkMode 
                    ? 'text-gray-300 bg-gray-700/50' 
                    : 'text-gray-600 bg-gray-100'
                }`}>
                  <FaFire className={`${
                    darkMode ? 'text-orange-400' : 'text-orange-500'
                  }`} />
                  Hot trends
                </div>
              </div>

              <div className="space-y-6">
                {topMajors.map((major, index) => (
                  <div key={major.name} className="group relative">
                    <div className={`flex items-center justify-between p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border relative overflow-hidden ${
                      darkMode 
                        ? 'bg-gradient-to-r from-gray-700/50 to-gray-600/30 border-gray-600/50 hover:bg-gray-600/60' 
                        : 'bg-gradient-to-r from-gray-50 to-white border-gray-100 hover:bg-white'
                    }`}>
                      <div className="relative z-10 flex items-center gap-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${getMajorColor(index)} rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                          {major.icon}
                        </div>
                        <div>
                          <h4 className={`text-lg font-bold mb-1 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {major.name}
                          </h4>
                          <div className="flex items-center gap-4">
                            <p className={`text-sm ${
                              darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {major.count} hồ sơ
                            </p>
                            <span className={`text-sm font-semibold flex items-center gap-1 ${
                              darkMode ? 'text-green-400' : 'text-green-600'
                            }`}>
                              <FaArrowUp className="text-xs animate-bounce" />
                              {major.trend}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 text-right">
                        <div className={`text-2xl font-black mb-2 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {major.percentage}%
                        </div>
                        <div className={`w-32 h-3 rounded-full overflow-hidden ${
                          darkMode ? 'bg-gray-600' : 'bg-gray-200'
                        }`}>
                          <div
                            className={`h-full bg-gradient-to-r ${getMajorColor(index)} shadow-lg transition-all duration-1000 ease-out`}
                            style={{ 
                              width: `${major.percentage}%`,
                              animation: `progressFill 2s ease-out ${1.2 + index * 0.1}s forwards`
                            }}
                          />
                        </div>
                      </div>

                      {/* Hover effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Applications */}
          <div className={`backdrop-blur-xl rounded-3xl shadow-2xl p-8 border relative overflow-hidden ${
            darkMode 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/80 border-white/20'
          }`}>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className={`text-xl font-bold flex items-center gap-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    darkMode 
                      ? 'bg-gradient-to-r from-orange-600 to-red-600' 
                      : 'bg-gradient-to-r from-orange-500 to-red-500'
                  }`}>
                    <FaBolt className="text-white text-sm" />
                  </div>
                  Hồ Sơ Gần Đây
                </h3>
                <div className={`text-sm px-3 py-1 rounded-full ${
                  darkMode 
                    ? 'text-gray-300 bg-gray-700/50' 
                    : 'text-gray-600 bg-gray-100'
                }`}>
                  {recentApplications.length} hồ sơ
                </div>
              </div>

              <div className="space-y-4">
                {recentApplications.map((app, index) => (
                  <div
                    key={app.id}
                    className={`group p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border cursor-pointer relative overflow-hidden ${
                      darkMode 
                        ? 'bg-gradient-to-r from-gray-700/50 to-gray-600/30 border-gray-600/50 hover:bg-gray-600/60' 
                        : 'bg-gradient-to-r from-gray-50 to-white border-gray-100 hover:bg-white'
                    }`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="relative">
                          <img
                            src={app.avatar}
                            alt={app.studentName}
                            className="w-12 h-12 rounded-full border-2 border-white shadow-lg transition-all duration-300 group-hover:scale-110"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            app.status === 'approved' ? 'bg-green-500' : 
                            app.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                          } animate-pulse`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold text-lg ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {app.studentName}
                          </h4>
                          <p className={`text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {app.major}
                          </p>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>

                      <div className={`flex items-center justify-between text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt />
                          {new Date(app.submittedAt).toLocaleDateString("vi-VN")}
                        </span>
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full font-semibold ${
                          darkMode 
                            ? 'bg-yellow-900/50 text-yellow-300' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          <FaStar className={`${
                            darkMode ? 'text-yellow-400' : 'text-yellow-500'
                          }`} />
                          GPA: {app.gpa}
                        </span>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <button
                          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1 ${
                            darkMode 
                              ? 'bg-blue-900/50 text-blue-300 hover:bg-blue-800/60' 
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                          onClick={() => handleViewProfile(app)}
                        >
                          <FaEye />
                          Xem
                        </button>
                        <button
                          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1 ${
                            darkMode 
                              ? 'bg-green-900/50 text-green-300 hover:bg-green-800/60' 
                              : 'bg-green-100 text-green-600 hover:bg-green-200'
                          }`}
                          onClick={() => handleEditProfile(app)}
                        >
                          <FaEdit />
                          Sửa
                        </button>
                      </div>
                    </div>

                    {/* Hover shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                  </div>
                ))}
              </div>

              <button className={`w-full mt-6 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-lg shadow-xl hover:scale-105 ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-600 text-white' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              }`}>
                <span className="flex items-center justify-center gap-2">
                  <FaGem className="animate-pulse" />
                  Xem tất cả hồ sơ
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`mt-12 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border relative overflow-hidden ${
          darkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/80 border-white/20'
        }`}>
          <div className="relative z-10">
            <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                darkMode 
                  ? 'bg-gradient-to-r from-green-600 to-blue-600' 
                  : 'bg-gradient-to-r from-green-500 to-blue-500'
              }`}>
                <FaMagic className="text-white text-lg animate-pulse" />
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
                  className={`p-6 bg-gradient-to-r ${action.color} text-white rounded-2xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden hover:scale-105`}
                >
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <action.icon className="text-xl" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-lg mb-1">{action.title}</div>
                      <div className="text-sm opacity-90 mb-2">{action.subtitle}</div>
                      <div className="text-xs bg-white/20 px-2 py-1 rounded-full inline-block">
                        {action.count}
                      </div>
                    </div>
                  </div>

                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Profile Modal */}
      {showProfileModal && selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className={`rounded-3xl p-8 max-w-lg w-full shadow-2xl relative border ${
            darkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <button
              className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                darkMode 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setShowProfileModal(false)}
            >
              <FaTimes />
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                darkMode 
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
                  : 'bg-gradient-to-br from-blue-500 to-purple-500'
              }`}>
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <h2 className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Chi tiết hồ sơ
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-xl ${
                darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className={`text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Họ tên
                </div>
                <div className={`font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedProfile.studentName}
                </div>
              </div>
              
              <div className={`p-4 rounded-xl ${
                darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className={`text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Email
                </div>
                <div className={`font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedProfile.email}
                </div>
              </div>
              
              <div className={`p-4 rounded-xl ${
                darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className={`text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Ngành
                </div>
                <div className={`font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedProfile.major}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <div className={`text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    GPA
                  </div>
                  <div className={`font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {selectedProfile.gpa}
                  </div>
                </div>
                
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <div className={`text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Trạng thái
                  </div>
                  <div>{getStatusBadge(selectedProfile.status)}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-right">
              <button
                className={`px-6 py-3 rounded-2xl transition-all duration-300 font-bold hover:scale-105 ${
                  darkMode 
                    ? 'bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-600 text-white' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                }`}
                onClick={() => setShowProfileModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: var(--target-width);
          }
        }

        /* Smooth transitions for dark mode */
        * {
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }

        /* Custom scrollbar for dark mode */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${darkMode ? '#374151' : '#f1f5f9'};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#6b7280' : '#cbd5e1'};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#9ca3af' : '#94a3b8'};
        }
      `}</style>
    </div>
  );
};

export default TongQuan;