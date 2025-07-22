import React, { useState } from "react";
import { motion } from "framer-motion";

function QuenMatKhau() {
  const [value, setValue] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess(""); setError(""); setLoading(true);
    setTimeout(() => {
      setSuccess("Nếu tài khoản tồn tại, hướng dẫn đặt lại mật khẩu đã được gửi về email!");
      setLoading(false);
    }, 1200);
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-yellow-100"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.form
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, type: "spring" }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-blue-800 text-center mb-2">Quên mật khẩu</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1 flex items-center gap-2">
              <span className="material-icons text-blue-600">Tên đăng nhập hoặc Email</span>
            </label>
            <input name="username" value={value} onChange={e => setValue(e.target.value)} required
              className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent" />
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-2 mt-4 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold rounded-full shadow-lg transition-all duration-200 text-lg flex items-center justify-center gap-2">
          {loading && <span className="loader border-white border-t-blue-600 animate-spin rounded-full w-5 h-5 border-2"></span>}
          Gửi yêu cầu
        </button>
        {success && <motion.div className="mt-2 p-2 bg-green-100 text-green-700 rounded text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{success}</motion.div>}
        {error && <motion.div className="mt-2 p-2 bg-red-100 text-red-700 rounded text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}
      </motion.form>
    </motion.div>
  );
}

export default QuenMatKhau; 