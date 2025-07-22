import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
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
  {
    label: "Tư vấn & Học bổng",
    path: "/tu-van-hoc-bong",
    icon: <FaHandshake />,
  },
  { label: "FAQ", path: "/faq", icon: <FaQuestionCircle /> },
  { label: "Liên hệ", path: "/lien-he", icon: <FaEnvelope /> },
];

function ThanhHeader() {
  const location = useLocation();
  const { user, username, role, logout } = useContext(UserContext);

  // Debug: log để kiểm tra giá trị
  console.log("User context:", { user, username, role });

  // Fallback để hiển thị tên người dùng
  const displayName =
    username || user?.username || user?.name || user?.email || "Người dùng";

  return (
    <header className="bg-blue-700 shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-2 md:px-6 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://media.loveitopcdn.com/3807/logo-hutech-1.png"
            alt="Logo HUTECH"
            className="h-10 w-10 object-contain rounded-full border-2 border-white shadow bg-white"
            style={{ minWidth: 40, minHeight: 40 }}
          />
          <span className="text-white font-bold text-xl tracking-wide">
            HUTECH-S
          </span>
        </div>
        {/* Menu */}
        <nav className="flex-1 flex items-center justify-center gap-1 md:gap-2 lg:gap-4">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1 px-3 py-2 rounded-md font-semibold transition text-white hover:bg-blue-800 hover:text-yellow-400 ${
                location.pathname === item.path
                  ? "bg-blue-800 text-yellow-400"
                  : ""
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </nav>
        {/* Auth */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-white font-semibold px-2">
                Xin chào, {displayName}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1 px-3 py-2 rounded-md font-semibold transition text-white hover:bg-yellow-400 hover:text-blue-800"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/accounts/dang-nhap"
                className="flex items-center gap-1 px-3 py-2 rounded-md font-semibold transition text-white hover:bg-yellow-400 hover:text-blue-800"
              >
                <span className="text-lg">
                  <FaSignInAlt />
                </span>
                <span className="hidden sm:inline">Đăng nhập</span>
              </Link>
              <Link
                to="/accounts/dang-ky"
                className="flex items-center gap-1 px-3 py-2 rounded-md font-semibold transition text-white hover:bg-yellow-400 hover:text-blue-800"
              >
                <span className="text-lg">
                  <FaUserEdit />
                </span>
                <span className="hidden sm:inline">Đăng ký</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default ThanhHeader;
