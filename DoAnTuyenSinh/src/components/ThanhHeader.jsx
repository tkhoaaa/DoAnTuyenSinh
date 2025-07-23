import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaUserPlus,
  FaSearch,
  FaHandshake,
  FaQuestionCircle,
  FaEnvelope,
  FaSignInAlt,
  FaUserEdit,
  FaSignOutAlt,
  FaCog,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaGraduationCap,
  FaTrophy
} from "react-icons/fa";
import { UserContext } from "../accounts/UserContext";

const menu = [
  { label: "Trang chủ", path: "/", icon: <FaHome /> },
  {
    label: "Đăng ký xét tuyển",
    path: "/dang-ky-xet-tuyen",
    icon: <FaUserPlus />,
  },
  { label: "Tra cứu hồ sơ", path: "/tra-cuu-ket-qua", icon: <FaSearch /> },
  { label: "FAQ", path: "/faq", icon: <FaQuestionCircle /> },
  { label: "Liên hệ", path: "/lien-he", icon: <FaEnvelope /> },
];

function ThanhHeader() {
  const location = useLocation();
  const { user, username, role, logout } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Debug: log để kiểm tra giá trị
  console.log("User context:", { user, username, role });

  // Fallback để hiển thị tên người dùng
  const displayName =
    username || user?.username || user?.name || user?.email || "Người dùng";

  return (
    <motion.header 
      className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 shadow-2xl sticky top-0 z-50 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="relative"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://media.loveitopcdn.com/3807/logo-hutech-1.png"
              alt="Logo HUTECH"
              className="h-12 w-12 object-contain rounded-2xl border-2 border-white/20 shadow-lg bg-white/10 backdrop-blur-sm"
              style={{ minWidth: 48, minHeight: 48 }}
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-xl tracking-wide">
              HUTECH-S
            </span>
            <span className="text-blue-200 text-xs font-medium">
              Tuyển sinh 2025
            </span>
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center justify-center gap-1">
          {menu.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-white hover:bg-white/10 hover:text-yellow-300 ${
                  location.pathname === item.path
                    ? "bg-white/20 text-yellow-300 shadow-lg"
                    : ""
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </motion.div>
          ))}
          
          {/* Dropdown Tư vấn & Học bổng */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-white hover:bg-white/10 hover:text-yellow-300"
              onClick={() => setShowDropdown((v) => !v)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">
                <FaQuestionCircle />
              </span>
              <span>Tư vấn & Học bổng</span>
              <motion.div
                animate={{ rotate: showDropdown ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaChevronDown className="ml-1 text-xs" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 z-50 overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Link
                    to="/dang-ky-tu-van"
                    className="flex items-center gap-3 px-4 py-3 text-blue-700 hover:bg-blue-50 hover:text-blue-900 transition-all duration-200"
                    onClick={() => setShowDropdown(false)}
                  >
                    <FaQuestionCircle className="text-blue-500" />
                    <div>
                      <div className="font-semibold">Đăng ký tư vấn</div>
                      <div className="text-xs text-gray-500">Hỗ trợ tư vấn tuyển sinh</div>
                    </div>
                  </Link>
                  <Link
                    to="/dang-ky-hoc-bong"
                    className="flex items-center gap-3 px-4 py-3 text-blue-700 hover:bg-blue-50 hover:text-blue-900 transition-all duration-200"
                    onClick={() => setShowDropdown(false)}
                  >
                    <FaTrophy className="text-yellow-500" />
                    <div>
                      <div className="font-semibold">Đăng ký học bổng</div>
                      <div className="text-xs text-gray-500">Cơ hội nhận học bổng</div>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <motion.span 
                className="text-white font-semibold px-3 py-2 bg-white/10 rounded-xl backdrop-blur-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                Xin chào, {displayName}
              </motion.span>
              
              {/* Admin Dashboard Button */}
              {role === 'admin' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link
                    to="/admin/tong-quan"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaCog />
                    <span>Admin</span>
                  </Link>
                </motion.div>
              )}
              
              <motion.button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-white hover:bg-yellow-400 hover:text-blue-800 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <FaSignOutAlt />
                <span>Đăng xuất</span>
              </motion.button>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  to="/accounts/dang-nhap"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-white hover:bg-white/10 hover:text-yellow-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">
                    <FaSignInAlt />
                  </span>
                  <span>Đăng nhập</span>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link
                  to="/accounts/dang-ky"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-white hover:bg-white/10 hover:text-yellow-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">
                    <FaUserEdit />
                  </span>
                  <span>Đăng ký</span>
                </Link>
              </motion.div>
            </>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-all duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-white/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {menu.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      location.pathname === item.path
                        ? "bg-blue-600 text-white"
                        : "text-blue-700 hover:bg-blue-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Dropdown Items */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <Link
                  to="/dang-ky-tu-van"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-blue-700 hover:bg-blue-50 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaQuestionCircle />
                  <span>Đăng ký tư vấn</span>
                </Link>
                <Link
                  to="/dang-ky-hoc-bong"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-blue-700 hover:bg-blue-50 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaTrophy />
                  <span>Đăng ký học bổng</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default ThanhHeader;
