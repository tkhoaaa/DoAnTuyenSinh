import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaEnvelope, 
  FaUser, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaArrowLeft,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaRocket,
  FaMagic
} from "react-icons/fa";

function QuenMatKhau() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: reset password

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(""); 
    setError(""); 
    setLoading(true);
    
    setTimeout(() => {
      setSuccess("Email xác nhận đã được gửi! Vui lòng kiểm tra hộp thư của bạn.");
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setSuccess("Mật khẩu đã được đặt lại thành công!");
      setLoading(false);
    }, 1500);
  };

  const getStepIcon = (stepNumber) => {
    return stepNumber === 1 ? FaEnvelope : FaLock;
  };

  const getStepTitle = (stepNumber) => {
    return stepNumber === 1 ? "Quên mật khẩu" : "Đặt lại mật khẩu";
  };

  const getStepDescription = (stepNumber) => {
    return stepNumber === 1 
      ? "Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu"
      : "Nhập mật khẩu mới cho tài khoản của bạn";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden p-4">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              left: `${5 + i * 12}%`,
              top: `${10 + i * 8}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <FaShieldAlt className="text-white text-3xl" />
          </motion.div>
          
          <motion.h1 
            className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            {getStepTitle(step)}
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {getStepDescription(step)}
          </motion.p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div 
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[1, 2].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                  step >= stepNumber 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                    : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {step >= stepNumber ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <getStepIcon stepNumber={stepNumber} />
                  </motion.div>
                ) : (
                  stepNumber
                )}
              </motion.div>
              {stepNumber < 2 && (
                <div className={`w-16 h-1 mx-2 rounded-full ${
                  step > stepNumber ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        >
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 -skew-x-12"
            animate={{ x: [-100, 300] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form
                  key="step1"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FaEnvelope className="text-blue-500" />
                      Email đăng ký
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                        placeholder="Nhập email của bạn"
                      />
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <FaSpinner className="text-white" />
                      </motion.div>
                    ) : (
                      <>
                        <FaRocket />
                        Gửi yêu cầu
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.form
                  key="step2"
                  onSubmit={handleResetPassword}
                  className="space-y-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FaLock className="text-blue-500" />
                      Mật khẩu mới
                    </label>
                    <div className="relative group">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full px-4 py-4 pl-12 pr-12 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                        placeholder="Nhập mật khẩu mới"
                      />
                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </motion.button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FaLock className="text-blue-500" />
                      Xác nhận mật khẩu
            </label>
                    <div className="relative group">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-4 py-4 pl-12 pr-12 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                        placeholder="Nhập lại mật khẩu mới"
                      />
                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </motion.button>
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <FaSpinner className="text-white" />
                      </motion.div>
                    ) : (
                      <>
                        <FaMagic />
                        Đặt lại mật khẩu
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Back Button for Step 2 */}
            {step === 2 && (
              <motion.button
                onClick={() => setStep(1)}
                className="w-full mt-4 py-3 text-gray-600 hover:text-gray-800 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FaArrowLeft />
                Quay lại
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {success && (
            <motion.div
              className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaCheckCircle className="text-green-600 text-xl" />
                </motion.div>
                <p className="text-green-800 font-semibold">{success}</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              className="mt-6 p-4 bg-gradient-to-r from-red-100 to-pink-100 border border-red-200 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ shake: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaExclamationTriangle className="text-red-600 text-xl" />
                </motion.div>
                <p className="text-red-800 font-semibold">{error}</p>
        </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-600 text-sm">
            Đã có tài khoản?{" "}
            <motion.a
              href="/dang-nhap"
              className="text-blue-600 hover:text-blue-700 font-semibold underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Đăng nhập ngay
            </motion.a>
          </p>
        </motion.div>
    </motion.div>
    </div>
  );
}

export default QuenMatKhau; 
