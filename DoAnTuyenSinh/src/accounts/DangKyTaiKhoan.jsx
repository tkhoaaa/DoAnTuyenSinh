import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaCheckCircle, FaEnvelope, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function DangKyTaiKhoan() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    
    if (form.password !== form.confirm) {
      setError("Mật khẩu xác nhận không khớp!");
      setLoading(false);
      return;
    }
    if (!form.phone) {
      setError("Số điện thoại không được để trống!");
      setLoading(false);
      return;
    }
    
    try {
      const res = await axios.post("http://localhost:3001/api/auth/register", {
        email: form.email,
        password: form.password,
        username: form.username,
        phone: form.phone
      });
      setSuccess("Đăng ký thành công!");
      setForm({
        username: "",
        email: "",
        password: "",
        confirm: "",
        phone: ""
      });
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (Array.isArray(errors) && errors.length > 0) {
        setError(errors.map(e => e.msg).join(' | '));
      } else {
        setError(
          err.response?.data?.message ||
          "Đăng ký thất bại!"
        );
      }
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
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
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur-xl opacity-20"></div>
        
        <motion.form
          className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onSubmit={handleSubmit}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Đăng ký tài khoản
            </h2>
            <p className="text-gray-600">
              Tạo tài khoản mới để bắt đầu
            </p>
          </motion.div>

          {/* Status messages */}
          <AnimatePresence>
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
                Tên đăng nhập
              </label>
              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Nhập tên đăng nhập"
                icon={FaUser}
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
                Email
              </label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Nhập email"
                icon={FaEnvelope}
                required
                className="w-full"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Số điện thoại
              </label>
              <Input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                icon={FaPhone}
                required
                className="w-full"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
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

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Input
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu"
                  icon={FaCheckCircle}
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirm ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Submit button */}
          <motion.div
            className="mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              loading={loading}
              disabled={loading}
              className="w-full text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </Button>
          </motion.div>

          {/* Links */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                to="/accounts/dang-nhap"
                className="text-green-600 hover:text-green-800 font-semibold transition-colors"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}

export default DangKyTaiKhoan; 
