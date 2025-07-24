import React, { useState, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { UserContext } from "./UserContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function DangNhap() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, loginDemo, user, role } = useContext(UserContext);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleDemoLogin = () => {
    setError("");
    setSuccess("");
    loginDemo();
    setSuccess("Đăng nhập Demo thành công!");
    setTimeout(() => {
      navigate("/admin");
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      console.log('Đang gửi request đăng nhập:', { identifier: form.identifier, password: form.password });
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        identifier: form.identifier,
        password: form.password
      });

      console.log('Response từ server:', res.data);

      // Lấy thông tin user từ response
      if (res.data.success) {
        const user = res.data.data.user;
        const role = user.role;
        const username = user.full_name || user.username || user.email;

        console.log("Login success:", { user, role, username });

        // Lưu thông tin đăng nhập vào localStorage đơn giản (không cần JWT)
        login(user.id, role, username, user);
        setSuccess("Đăng nhập thành công!");
        if (role === "admin") navigate("/admin");
        else navigate("/");
      } else {
        throw new Error(res.data.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error response:", err.response?.data);
      
      // Hiển thị lỗi chi tiết hơn
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        setError(err.response.data.errors.map(e => e.msg).join(' | '));
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.code === 'ECONNREFUSED') {
        setError("Không thể kết nối đến server. Vui lòng kiểm tra server có đang chạy không.");
      } else {
        setError("Đăng nhập thất bại! Sai tài khoản hoặc mật khẩu.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-full max-w-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-20"></div>
        
        <motion.form
          className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20"
          onSubmit={handleSubmit}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Đăng nhập
            </h2>
            <p className="text-gray-600">
              Chào mừng bạn quay trở lại!
            </p>
          </motion.div>

          {/* Status messages */}
          <AnimatePresence>
            {user && (
              <motion.div
                className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                Đã đăng nhập với tài khoản: {user.email}
                <br />
                Vai trò: {role}
              </motion.div>
            )}
            {success && (
              <motion.div
                className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                {success}
              </motion.div>
            )}
            {error && (
              <motion.div
                className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form fields */}
          <div className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email hoặc Tên đăng nhập
              </label>
              <Input
                name="identifier"
                type="text"
                value={form.identifier}
                onChange={handleChange}
                placeholder="Nhập email hoặc tên đăng nhập"
                icon={FaEnvelope}
                required
                className="w-full"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  icon={FaLock}
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Submit button */}
          <motion.div
            className="mt-8 space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              loading={loading}
              disabled={loading}
              className="w-full text-lg font-semibold"
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </Button>

            {/* Demo Login Button */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">hoặc</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full text-lg font-semibold border-amber-300 text-amber-600 hover:bg-amber-50"
            >
              🎯 Xem Demo Admin Dashboard
            </Button>
            <p className="text-xs text-center text-gray-500 mt-2">
              * Demo mode dành cho Vercel deployment (không cần backend)
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            className="mt-6 text-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                to="/accounts/dang-ky"
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                Đăng ký ngay
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              <Link
                to="/accounts/quen-mat-khau"
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                Quên mật khẩu?
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}

export default DangNhap;
