import React, { useState, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCalendar, FaVenusMars, FaIdCard, FaMapMarkerAlt, FaStar, FaTrophy, FaUsers, FaFileUpload, FaList, FaPlus, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { UserContext } from "../accounts/UserContext";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function DangKyHocBong() {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('register');
  const [form, setForm] = useState({
    ho_ten: "",
    ngay_sinh: "",
    gioi_tinh: "",
    cccd: "",
    dia_chi: "",
    phone: "",
    email: "",
    nganh: "",
    lop: "",
    khoa: "",
    diem_tb: "",
    hoc_bong: "",
    thanh_tich: "",
    kinh_te: "",
    so_thanh_vien: "",
    ly_do: "",
    nguon_thong_tin: ""
  });
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [applications, setApplications] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setAttachments(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      
      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });
      
      attachments.forEach(file => {
        formData.append('attachments', file);
      });

      const res = await axios.post("http://localhost:3001/api/scholarship/apply", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess("Nộp đơn học bổng thành công!");
      setForm({
        ho_ten: "", ngay_sinh: "", gioi_tinh: "", cccd: "", dia_chi: "",
        phone: "", email: "", nganh: "", lop: "", khoa: "", diem_tb: "",
        hoc_bong: "", thanh_tich: "", kinh_te: "", so_thanh_vien: "",
        ly_do: "", nguon_thong_tin: ""
      });
      setAttachments([]);
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (Array.isArray(errors) && errors.length > 0) {
        setError(errors.map(e => e.msg).join(' | '));
      } else {
        setError(
          err.response?.data?.message ||
          "Nộp đơn thất bại!"
        );
      }
    }
    setLoading(false);
  };

  const loadApplications = async () => {
    if (!user?.email) {
      setError("Vui lòng đăng nhập để xem danh sách đơn");
      return;
    }
    
    setLoadingList(true);
    try {
      const res = await axios.get(`http://localhost:3001/api/scholarship/list?email=${user.email}`);
      setApplications(res.data.data || []);
    } catch (err) {
      setError("Không thể tải danh sách đơn: " + (err.response?.data?.message || err.message));
    }
    setLoadingList(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <>
      <SEO 
        title="Đăng ký học bổng - HUTECH"
        description="Đăng ký học bổng HUTECH 2025 - Học bổng khuyến khích học tập, tài năng, hỗ trợ sinh viên nghèo. Nộp đơn trực tuyến đơn giản."
        keywords="đăng ký học bổng, học bổng HUTECH, học bổng tài năng, học bổng khuyến khích"
        canonical="/dang-ky-hoc-bong"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-90"></div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <FaTrophy className="text-white text-3xl" />
              </motion.div>
              
              <h1 className="text-5xl font-bold text-white mb-4">
                Đăng Ký Học Bổng
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Cơ hội nhận học bổng giá trị từ HUTECH - Hỗ trợ tài chính cho sinh viên xuất sắc
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <motion.section 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="py-16"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Header với tabs */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mb-6"
                >
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Hệ Thống Học Bổng HUTECH
                  </h2>
                  <p className="text-white/90">
                    Chọn dịch vụ bạn muốn sử dụng
                  </p>
                </motion.div>
                
                {/* Tab buttons */}
                <motion.div 
                  className="flex justify-center space-x-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    variant={activeTab === 'register' ? "gradient" : "outline"}
                    size="lg"
                    onClick={() => setActiveTab('register')}
                    className={activeTab === 'register' ? 
                      "bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 font-bold" : 
                      "border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-bold"
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPlus className="mr-2" />
                    Nộp đơn mới
                  </Button>
                  <Button
                    variant={activeTab === 'list' ? "gradient" : "outline"}
                    size="lg"
                    onClick={() => {
                      setActiveTab('list');
                      loadApplications();
                    }}
                    className={activeTab === 'list' ? 
                      "bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 font-bold" : 
                      "border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-bold"
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaList className="mr-2" />
                    Danh sách đơn đã gửi
                  </Button>
                </motion.div>
              </div>

              {/* Tab content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'register' ? (
                    // Form đăng ký học bổng
                    <motion.form
                      key="register"
                      onSubmit={handleSubmit}
                      className="space-y-8"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Thông tin cá nhân */}
                      <motion.div 
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                            <FaUser className="text-white text-lg" />
                          </div>
                          Thông tin cá nhân
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Input
                            name="ho_ten"
                            value={form.ho_ten}
                            onChange={handleChange}
                            placeholder="Họ và tên"
                            icon={FaUser}
                            required
                            className="w-full"
                          />
                          <Input
                            name="ngay_sinh"
                            type="date"
                            value={form.ngay_sinh}
                            onChange={handleChange}
                            placeholder="Ngày sinh"
                            icon={FaCalendar}
                            required
                            className="w-full"
                          />
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Giới tính *
                            </label>
                            <select
                              name="gioi_tinh"
                              value={form.gioi_tinh}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Chọn giới tính</option>
                              <option value="Nam">Nam</option>
                              <option value="Nữ">Nữ</option>
                            </select>
                          </div>
                          <Input
                            name="cccd"
                            value={form.cccd}
                            onChange={handleChange}
                            placeholder="CCCD/CMND"
                            icon={FaIdCard}
                            required
                            className="w-full"
                          />
                          <Input
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Số điện thoại"
                            icon={FaPhone}
                            required
                            className="w-full"
                          />
                          <Input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            icon={FaEnvelope}
                            required
                            className="w-full"
                          />
                          <div className="md:col-span-2">
                            <Input
                              name="dia_chi"
                              value={form.dia_chi}
                              onChange={handleChange}
                              placeholder="Địa chỉ"
                              icon={FaMapMarkerAlt}
                              required
                              className="w-full"
                            />
                          </div>
                        </div>
                      </motion.div>

                      {/* Thông tin học tập */}
                      <motion.div 
                        className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                            <FaGraduationCap className="text-white text-lg" />
                          </div>
                          Thông tin học tập
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <Input
                            name="nganh"
                            value={form.nganh}
                            onChange={handleChange}
                            placeholder="Ngành học"
                            icon={FaGraduationCap}
                            required
                            className="w-full"
                          />
                          <Input
                            name="lop"
                            value={form.lop}
                            onChange={handleChange}
                            placeholder="Lớp"
                            icon={FaGraduationCap}
                            required
                            className="w-full"
                          />
                          <Input
                            name="khoa"
                            value={form.khoa}
                            onChange={handleChange}
                            placeholder="Khóa"
                            icon={FaGraduationCap}
                            required
                            className="w-full"
                          />
                          <Input
                            name="diem_tb"
                            type="number"
                            step="0.01"
                            min="0"
                            max="10"
                            value={form.diem_tb}
                            onChange={handleChange}
                            placeholder="Điểm trung bình"
                            icon={FaStar}
                            required
                            className="w-full"
                          />
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Loại học bổng mong muốn *
                            </label>
                            <select
                              name="hoc_bong"
                              value={form.hoc_bong}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Chọn loại học bổng</option>
                              <option value="Học bổng khuyến khích học tập">Học bổng khuyến khích học tập</option>
                              <option value="Học bổng tài năng">Học bổng tài năng</option>
                              <option value="Học bổng hỗ trợ sinh viên nghèo">Học bổng hỗ trợ sinh viên nghèo</option>
                            </select>
                          </div>
                          <div className="md:col-span-3">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Thành tích học tập
                            </label>
                            <textarea
                              name="thanh_tich"
                              value={form.thanh_tich}
                              onChange={handleChange}
                              rows="3"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                              placeholder="Mô tả thành tích học tập, giải thưởng..."
                            />
                          </div>
                        </div>
                      </motion.div>

                      {/* Hoàn cảnh gia đình */}
                      <motion.div 
                        className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                            <FaUsers className="text-white text-lg" />
                          </div>
                          Hoàn cảnh gia đình
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Hoàn cảnh kinh tế *
                            </label>
                            <select
                              name="kinh_te"
                              value={form.kinh_te}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Chọn hoàn cảnh</option>
                              <option value="Khó khăn">Khó khăn</option>
                              <option value="Trung bình">Trung bình</option>
                              <option value="Khá giả">Khá giả</option>
                            </select>
                          </div>
                          <Input
                            name="so_thanh_vien"
                            type="number"
                            min="1"
                            value={form.so_thanh_vien}
                            onChange={handleChange}
                            placeholder="Số thành viên trong gia đình"
                            icon={FaUsers}
                            required
                            className="w-full"
                          />
                        </div>
                      </motion.div>

                      {/* Lý do và nguồn thông tin */}
                      <motion.div 
                        className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                            <FaTrophy className="text-white text-lg" />
                          </div>
                          Thông tin bổ sung
                        </h3>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Lý do xin học bổng *
                            </label>
                            <textarea
                              name="ly_do"
                              value={form.ly_do}
                              onChange={handleChange}
                              required
                              rows="4"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                              placeholder="Trình bày lý do xin học bổng..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Nguồn thông tin *
                            </label>
                            <select
                              name="nguon_thong_tin"
                              value={form.nguon_thong_tin}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Chọn nguồn thông tin</option>
                              <option value="Website trường">Website trường</option>
                              <option value="Mạng xã hội">Mạng xã hội</option>
                              <option value="Bạn bè">Bạn bè</option>
                              <option value="Thầy cô">Thầy cô</option>
                              <option value="Khác">Khác</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>

                      {/* Upload file minh chứng */}
                      <motion.div 
                        className="bg-gradient-to-r from-teal-50 to-cyan-50 p-8 rounded-2xl border border-teal-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
                            <FaFileUpload className="text-white text-lg" />
                          </div>
                          File minh chứng (tùy chọn)
                        </h3>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tải lên file minh chứng (tối đa 5 file)
                          </label>
                          <div className="border-2 border-dashed border-teal-300 rounded-xl p-6 text-center hover:border-teal-400 transition-colors duration-200">
                            <input
                              type="file"
                              multiple
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={handleFileChange}
                              className="hidden"
                              id="file-upload"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer">
                              <FaFileUpload className="text-4xl text-teal-500 mx-auto mb-4" />
                              <p className="text-lg font-semibold text-gray-700 mb-2">
                                Chọn file hoặc kéo thả vào đây
                              </p>
                              <p className="text-sm text-gray-500">
                                Chấp nhận: PDF, DOC, DOCX, JPG, PNG (mỗi file tối đa 5MB)
                              </p>
                            </label>
                          </div>
                          {attachments.length > 0 && (
                            <motion.div 
                              className="mt-4"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <p className="text-sm font-semibold text-gray-700 mb-2">Files đã chọn:</p>
                              <div className="space-y-2">
                                {attachments.map((file, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-2 p-2 bg-teal-50 rounded-lg"
                                  >
                                    <FaFileUpload className="text-teal-500" />
                                    <span className="text-sm text-gray-700">{file.name}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>

                      {/* Submit button */}
                      <motion.div 
                        className="flex justify-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Button
                          type="submit"
                          variant="gradient"
                          size="lg"
                          loading={loading}
                          disabled={loading}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg px-12 py-4"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaTrophy className="mr-2" />
                          {loading ? "Đang xử lý..." : "Nộp đơn học bổng"}
                        </Button>
                      </motion.div>

                      {/* Messages */}
                      <AnimatePresence>
                        {success && (
                          <motion.div
                            className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl flex items-center gap-3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                          >
                            <FaCheckCircle className="text-green-500 text-xl" />
                            {success}
                          </motion.div>
                        )}
                        {error && (
                          <motion.div
                            className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                          >
                            <FaExclamationTriangle className="text-red-500 text-xl" />
                            {error}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.form>
                  ) : (
                    // Danh sách đơn đã gửi
                    <motion.div
                      key="list"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800">
                          Danh sách đơn học bổng đã gửi
                        </h3>
                        <Button
                          variant="outline"
                          size="md"
                          onClick={loadApplications}
                          loading={loadingList}
                          disabled={loadingList}
                          className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Làm mới
                        </Button>
                      </div>

                      {loadingList ? (
                        <motion.div 
                          className="text-center py-12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-gray-600">Đang tải danh sách...</p>
                        </motion.div>
                      ) : applications.length === 0 ? (
                        <motion.div 
                          className="text-center py-12"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <FaList className="text-6xl text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 text-lg">Chưa có đơn học bổng nào được gửi</p>
                        </motion.div>
                      ) : (
                        <motion.div 
                          className="space-y-6"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.1
                              }
                            }
                          }}
                          initial="hidden"
                          animate="visible"
                        >
                          {applications.map((app, index) => (
                            <motion.div
                              key={app.id || index}
                              variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                              }}
                              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <h4 className="text-xl font-bold text-gray-800">
                                  Đơn #{app.id} - {app.ho_ten}
                                </h4>
                                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                  {formatDate(app.created_at)}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                <div className="space-y-2">
                                  <p><strong>Ngành:</strong> {app.nganh}</p>
                                  <p><strong>Lớp:</strong> {app.lop}</p>
                                  <p><strong>Khóa:</strong> {app.khoa}</p>
                                  <p><strong>Điểm TB:</strong> {app.diem_tb}</p>
                                </div>
                                <div className="space-y-2">
                                  <p><strong>Loại học bổng:</strong> {app.hoc_bong}</p>
                                  <p><strong>Hoàn cảnh:</strong> {app.kinh_te}</p>
                                  <p><strong>Thành viên:</strong> {app.so_thanh_vien} người</p>
                                  <p><strong>Trạng thái:</strong> 
                                    <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                                      Đang xử lý
                                    </span>
                                  </p>
                                </div>
                              </div>
                              
                              {app.attachments && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <p className="text-sm font-semibold text-gray-700 mb-2">File đính kèm:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {JSON.parse(app.attachments).map((file, fileIndex) => (
                                      <span key={fileIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                        {file}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
}

export default DangKyHocBong; 