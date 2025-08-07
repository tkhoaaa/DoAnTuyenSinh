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
  FaMagic,
  FaStar,
  FaKey
} from "react-icons/fa";
import { useDarkMode } from "../contexts/DarkModeContext";

function QuenMatKhau() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: reset password
  const { darkMode } = useDarkMode();

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
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden p-4 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900' 
        : 'bg-gradient-to-br from-purple-50 via-pink-50 to-red-50'
    }`}>
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10' 
                : 'bg-gradient-to-r from-purple-400/20 to-pink-400/20'
            }`}
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${5 + i * 8}%`,
              top: `${10 + i * 7}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 25, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Floating key icons */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              darkMode ? 'text-purple-400/30' : 'text-purple-500/40'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, -100],
              opacity: [0, 1, 0],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <FaKey className="text-lg" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-lg"
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
            className="relative w-24 h-24 mx-auto mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <FaShieldAlt className="text-white text-3xl" />
            </motion.div>
            <motion.div
              className="absolute -inset-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            {/* Floating mini stars */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute ${
                  darkMode ? 'text-purple-300' : 'text-purple-600'
                }`}
                style={{
                  left: `${15 + i * 20}%`,
                  top: `${10 + i * 15}%`,
                }}
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 180, 360],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <FaStar className="text-xs" />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.h1 
            className={`text-3xl font-black mb-3 ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            {getStepTitle(step)}
          </motion.h1>
          
          <motion.p 
            className={`text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
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
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold shadow-xl ${
                  step >= stepNumber 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : darkMode ? 'bg-gray-700' : 'bg-gray-300'
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
                <motion.div 
                  className={`w-20 h-2 mx-3 rounded-full ${
                    step > stepNumber 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                  animate={{ 
                    scaleX: step > stepNumber ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          className={`backdrop-blur-xl rounded-3xl shadow-2xl border p-8 relative overflow-hidden ${
            darkMode 
              ? 'bg-gray-900/85 border-purple-700/50' 
              : 'bg-white/90 border-purple-200/50'
          }`}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 -skew-x-12"
            animate={{ x: [-100, 400] }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
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
                    <label className={`block text-sm font-semibold mb-3 flex items-center gap-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <FaEnvelope className={darkMode ? 'text-purple-400' : 'text-purple-500'} />
                      Email đăng ký
                    </label>
                    <div className="relative group">
                      <motion.input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl focus:outline-none transition-all duration-300 ${
                          darkMode 
                            ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' 
                            : 'bg-white/70 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-purple-500'
                        }`}
                        placeholder="Nhập email của bạn"
                        whileFocus={{ scale: 1.02 }}
                      />
                      <FaEnvelope className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        darkMode 
                          ? 'text-gray-400 group-focus-within:text-purple-400' 
                          : 'text-gray-400 group-focus-within:text-purple-500'
                      }`} />
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <label className={`block text-sm font-semibold mb-3 flex items-center gap-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <FaLock className={darkMode ? 'text-purple-400' : 'text-purple-500'} />
                      Mật khẩu mới
                    </label>
                    <div className="relative group">
                      <motion.input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className={`w-full px-4 py-4 pl-12 pr-12 border-2 rounded-2xl focus:outline-none transition-all duration-300 ${
                          darkMode 
                            ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' 
                            : 'bg-white/70 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-purple-500'
                        }`}
                        placeholder="Nhập mật khẩu mới"
                        whileFocus={{ scale: 1.02 }}
                      />
                      <FaLock className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        darkMode 
                          ? 'text-gray-400 group-focus-within:text-purple-400' 
                          : 'text-gray-400 group-focus-within:text-purple-500'
                      }`} />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                          darkMode 
                            ? 'text-gray-400 hover:text-gray-200' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
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
                    <label className={`block text-sm font-semibold mb-3 flex items-center gap-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <FaLock className={darkMode ? 'text-purple-400' : 'text-purple-500'} />
                      Xác nhận mật khẩu
                    </label>
                    <div className="relative group">
                      <motion.input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={`w-full px-4 py-4 pl-12 pr-12 border-2 rounded-2xl focus:outline-none transition-all duration-300 ${
                          darkMode 
                            ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' 
                            : 'bg-white/70 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-purple-500'
                        }`}
                        placeholder="Nhập lại mật khẩu mới"
                        whileFocus={{ scale: 1.02 }}
                      />
                      <FaLock className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        darkMode 
                          ? 'text-gray-400 group-focus-within:text-purple-400' 
                          : 'text-gray-400 group-focus-within:text-purple-500'
                      }`} />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                          darkMode 
                            ? 'text-gray-400 hover:text-gray-200' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
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
                className={`w-full mt-4 py-3 font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
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
              className={`mt-6 p-4 rounded-2xl shadow-lg border ${
                darkMode 
                  ? 'bg-green-900/50 border-green-700 text-green-300' 
                  : 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-200 text-green-800'
              }`}
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
                  <FaCheckCircle className="text-green-600" />
                </motion.div>
                <p className="font-semibold">{success}</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              className={`mt-6 p-4 rounded-2xl shadow-lg border ${
                darkMode 
                  ? 'bg-red-900/50 border-red-700 text-red-300' 
                  : 'bg-gradient-to-r from-red-100 to-pink-100 border-red-200 text-red-800'
              }`}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaExclamationTriangle className="text-red-600" />
                </motion.div>
                <p className="font-semibold">{error}</p>
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
          <p className={`text-sm ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Đã có tài khoản?{" "}
            <motion.a
              href="/accounts/dang-nhap"
              className={`font-semibold underline transition-colors ${
                darkMode 
                  ? 'text-purple-400 hover:text-purple-300' 
                  : 'text-purple-600 hover:text-purple-700'
              }`}
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
