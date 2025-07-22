import React, { useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { UserContext } from "./UserContext";

function DangNhap() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login, user, role } = useContext(UserContext);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/login", form);

      // DEBUG: Log toàn bộ response từ backend
      console.log("=== LOGIN DEBUG ===");
      console.log("Full response:", res);
      console.log("Response data:", res.data);
      console.log("Available fields:", Object.keys(res.data));

      // Kiểm tra các field có thể chứa username
      console.log("token:", res.data.token);
      console.log("role:", res.data.role);
      console.log("username:", res.data.username);
      console.log("name:", res.data.name);
      console.log("full_name:", res.data.full_name);
      console.log("displayName:", res.data.displayName);
      console.log("user object:", res.data.user);

      // Thử nhiều cách để lấy username
      const token = res.data.token;
      const role = res.data.role;
      const username =
        res.data.username ||
        res.data.name ||
        res.data.full_name ||
        res.data.displayName ||
        res.data.user?.username ||
        res.data.user?.name ||
        res.data.user?.full_name ||
        form.identifier || // Fallback: dùng identifier đã nhập
        "Người dùng";

      console.log("Final values to pass to login:");
      console.log({ token, role, username });
      console.log("===================");

      // Đảm bảo backend trả về res.data.username
      login(token, role, username);
      setSuccess("Đăng nhập thành công!");
      if (role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error response:", err.response?.data);
      setError("Đăng nhập thất bại! Sai tài khoản/email hoặc mật khẩu.");
    } finally {
      setLoading(false);
    }
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
          Đăng nhập
        </h2>
        {/* Hiển thị trạng thái đăng nhập */}
        {user && (
          <motion.div
            className="mb-2 p-2 bg-green-100 text-green-700 rounded text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Đã đăng nhập với token: {user.token}
            <br />
            Vai trò: {role}
          </motion.div>
        )}
        {success && (
          <motion.div
            className="mb-2 p-2 bg-green-100 text-green-700 rounded text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {success}
          </motion.div>
        )}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block font-medium mb-1 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              Tên đăng nhập hoặc Email
            </label>
            <input
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
              placeholder="Nhập tên đăng nhập hoặc email"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
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
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 mt-4 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold rounded-full shadow-lg transition-all duration-200 text-lg flex items-center justify-center gap-2"
        >
          {loading && (
            <span className="loader border-white border-t-blue-600 animate-spin rounded-full w-5 h-5 border-2"></span>
          )}
          Đăng nhập
        </button>
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
            Chưa có tài khoản?{" "}
            <Link
              to="/accounts/dang-ky"
              className="text-blue-600 hover:underline font-semibold"
            >
              Đăng ký ngay
            </Link>
          </span>
          <span>
            <Link
              to="/accounts/quen-mat-khau"
              className="text-blue-600 hover:underline font-semibold"
            >
              Quên mật khẩu?
            </Link>
          </span>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default DangNhap;
