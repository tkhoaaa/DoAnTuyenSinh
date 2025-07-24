import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaGraduationCap,
  FaClock,
  FaGlobe,
} from "react-icons/fa";

function ChanTrang() {
  const socialLinks = [
    {
      icon: FaFacebook,
      href: "#",
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    { icon: FaYoutube, href: "#", label: "YouTube", color: "hover:bg-red-600" },
    {
      icon: FaInstagram,
      href: "#",
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
    {
      icon: FaLinkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:bg-blue-700",
    },
  ];

  const quickLinks = [
    { label: "Đăng ký xét tuyển", path: "/dang-ky-xet-tuyen" },
    { label: "Tra cứu kết quả", path: "/tra-cuu-ket-qua" },
    { label: "FAQ", path: "/faq" },
    { label: "Liên hệ", path: "/lien-he" },
  ];

  return (
    <motion.footer
      className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white relative mt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FaGraduationCap className="text-white text-xl" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">HUTECH Tuyển Sinh</h3>
                <p className="text-blue-200 text-sm">
                  Hệ thống tuyển sinh trực tuyến
                </p>
              </div>
            </div>
            <p className="text-blue-100 leading-relaxed mb-6">
              Trường Đại học Công nghệ TP.HCM (HUTECH) - Nơi ươm mầm tài năng,
              đào tạo nguồn nhân lực chất lượng cao cho xã hội. Hệ thống tuyển
              sinh trực tuyến giúp thí sinh dễ dàng đăng ký và theo dõi quá
              trình xét tuyển.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white transition-all duration-200 ${social.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <FaGlobe className="text-yellow-400" />
              Liên kết nhanh
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-blue-100 hover:text-yellow-300 transition-all duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-yellow-400 rounded-full group-hover:scale-150 transition-transform duration-200"></div>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <FaEnvelope className="text-yellow-400" />
              Liên hệ
            </h4>
            <div className="space-y-4">
              <motion.div
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaMapMarkerAlt className="text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-blue-100 font-semibold">Địa chỉ</p>
                  <p className="text-blue-200 text-sm">
                    475A Điện Biên Phủ, P.25, Q.Bình Thạnh, TP.HCM
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaPhone className="text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-blue-100 font-semibold">Hotline</p>
                  <p className="text-blue-200 text-sm">1900 2059</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaEnvelope className="text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-blue-100 font-semibold">Email</p>
                  <a
                    href="mailto:HUTECH@HUTECH.edu.vn"
                    className="text-blue-200 text-sm hover:text-yellow-300 transition-colors duration-200"
                  >
                    HUTECH@HUTECH.edu.vn
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaClock className="text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-blue-100 font-semibold">Giờ làm việc</p>
                  <p className="text-blue-200 text-sm">
                    Thứ 2 - Thứ 6: 8:00 - 17:00
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center md:text-left">
            <p className="text-blue-200 mb-2">
              © 2025 HUTECH Tuyển Sinh. All rights reserved.
            </p>
            <p className="text-blue-300 text-sm">
              Hệ thống tuyển sinh trực tuyến - Đại học Công nghệ TP.HCM
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/dang-ky-xet-tuyen"
              className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-200 text-lg fixed md:static bottom-6 right-6 md:bottom-auto md:right-auto z-50"
            >
              <FaUserPlus className="text-xl" />
              <span>ĐĂNG KÝ NGAY</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default ChanTrang;
