import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaCheckCircle, FaEnvelope } from "react-icons/fa";

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
      setError("");
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
      setSuccess("");
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-yellow-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.form
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-blue-800 text-center mb-2">
          Đăng ký tài khoản
        </h2>
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block font-medium mb-1 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              Tên đăng nhập
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <label className="block font-medium mb-1 flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block font-medium mb-1 flex items-center gap-2">
              <FaLock className="text-blue-600" />
              Mật khẩu
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className="block font-medium mb-1 flex items-center gap-2">
              <FaCheckCircle className="text-blue-600" />
              Xác nhận mật khẩu
            </label>
            <input
              name="confirm"
              type="password"
              value={form.confirm}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <label className="block font-medium mb-1 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              Số điện thoại
            </label>
            <input
              name="phone"
              type="text"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
            />
          </motion.div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 mt-4 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold rounded-full shadow-lg transition-all duration-200 text-lg flex items-center justify-center gap-2"
        >
          {loading && (
            <span className="loader border-white border-t-blue-600 animate-spin rounded-full w-5 h-5 border-2"></span>
          )}
          Đăng ký
        </button>
        {success && (
          <motion.div
            className="mt-2 p-2 bg-green-100 text-green-700 rounded text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {success}
          </motion.div>
        )}
        {error && (
          <motion.div
            className="mt-2 p-2 bg-red-100 text-red-700 rounded text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
        <div className="mt-6 flex flex-col items-center gap-2 text-sm">
          <span>
            Đã có tài khoản?{" "}
            <Link
              to="/accounts/dang-nhap"
              className="text-blue-600 hover:underline font-semibold"
            >
              Đăng nhập ngay
            </Link>
          </span>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default DangKyTaiKhoan;
