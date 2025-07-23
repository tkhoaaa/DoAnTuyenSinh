import React, { useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCalendar, FaVenusMars, FaIdCard, FaMapMarkerAlt, FaStar, FaTrophy, FaUsers, FaFileUpload, FaList, FaPlus } from "react-icons/fa";
import { UserContext } from "../accounts/UserContext";

function DangKyHocBong() {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('register'); // 'register' hoặc 'list'
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
      
      // Thêm tất cả dữ liệu form
      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });
      
      // Thêm files
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
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          {/* Header với tabs */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center mb-4">
              Đăng Ký Học Bổng
            </h1>
            
            {/* Tab buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveTab('register')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'register'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <FaPlus />
                Nộp đơn mới
              </button>
              <button
                onClick={() => {
                  setActiveTab('list');
                  loadApplications();
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'list'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <FaList />
                Danh sách đơn đã gửi
              </button>
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === 'register' ? (
              // Form đăng ký học bổng
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Thông tin cá nhân */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaUser className="text-blue-600" />
                    Thông tin cá nhân
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Họ và tên *
                      </label>
                      <input
                        name="ho_ten"
                        value={form.ho_ten}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày sinh *
                      </label>
                      <input
                        name="ngay_sinh"
                        type="date"
                        value={form.ngay_sinh}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Giới tính *
                      </label>
                      <select
                        name="gioi_tinh"
                        value={form.gioi_tinh}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CCCD/CMND *
                      </label>
                      <input
                        name="cccd"
                        value={form.cccd}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại *
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Địa chỉ *
                      </label>
                      <input
                        name="dia_chi"
                        value={form.dia_chi}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Thông tin học tập */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaGraduationCap className="text-blue-600" />
                    Thông tin học tập
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngành học *
                      </label>
                      <input
                        name="nganh"
                        value={form.nganh}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lớp *
                      </label>
                      <input
                        name="lop"
                        value={form.lop}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Khóa *
                      </label>
                      <input
                        name="khoa"
                        value={form.khoa}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Điểm trung bình *
                      </label>
                      <input
                        name="diem_tb"
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={form.diem_tb}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loại học bổng mong muốn *
                      </label>
                      <select
                        name="hoc_bong"
                        value={form.hoc_bong}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Chọn loại học bổng</option>
                        <option value="Học bổng khuyến khích học tập">Học bổng khuyến khích học tập</option>
                        <option value="Học bổng tài năng">Học bổng tài năng</option>
                        <option value="Học bổng hỗ trợ sinh viên nghèo">Học bổng hỗ trợ sinh viên nghèo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Thành tích học tập
                      </label>
                      <textarea
                        name="thanh_tich"
                        value={form.thanh_tich}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Mô tả thành tích học tập, giải thưởng..."
                      />
                    </div>
                  </div>
                </div>

                {/* Hoàn cảnh gia đình */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaUsers className="text-blue-600" />
                    Hoàn cảnh gia đình
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hoàn cảnh kinh tế *
                      </label>
                      <select
                        name="kinh_te"
                        value={form.kinh_te}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Chọn hoàn cảnh</option>
                        <option value="Khó khăn">Khó khăn</option>
                        <option value="Trung bình">Trung bình</option>
                        <option value="Khá giả">Khá giả</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số thành viên trong gia đình *
                      </label>
                      <input
                        name="so_thanh_vien"
                        type="number"
                        min="1"
                        value={form.so_thanh_vien}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Lý do và nguồn thông tin */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaTrophy className="text-blue-600" />
                    Thông tin bổ sung
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lý do xin học bổng *
                      </label>
                      <textarea
                        name="ly_do"
                        value={form.ly_do}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Trình bày lý do xin học bổng..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nguồn thông tin *
                      </label>
                      <select
                        name="nguon_thong_tin"
                        value={form.nguon_thong_tin}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                </div>

                {/* Upload file minh chứng */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaFileUpload className="text-blue-600" />
                    File minh chứng (tùy chọn)
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tải lên file minh chứng (tối đa 5 file)
                    </label>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Chấp nhận: PDF, DOC, DOCX, JPG, PNG (mỗi file tối đa 5MB)
                    </p>
                    {attachments.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Files đã chọn:</p>
                        <ul className="text-sm text-gray-600">
                          {attachments.map((file, index) => (
                            <li key={index}>• {file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
                  >
                    {loading && (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {loading ? "Đang xử lý..." : "Nộp đơn học bổng"}
                  </button>
                </div>

                {/* Messages */}
                {success && (
                  <motion.div
                    className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {success}
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {error}
                  </motion.div>
                )}
              </motion.form>
            ) : (
              // Danh sách đơn đã gửi
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Danh sách đơn học bổng đã gửi
                  </h3>
                  <button
                    onClick={loadApplications}
                    disabled={loadingList}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    {loadingList && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    Làm mới
                  </button>
                </div>

                {loadingList ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-2 text-gray-600">Đang tải danh sách...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-8">
                    <FaList className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Chưa có đơn học bổng nào được gửi</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app, index) => (
                      <div key={app.id || index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-semibold text-gray-800">
                            Đơn #{app.id} - {app.ho_ten}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {formatDate(app.created_at)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><strong>Ngành:</strong> {app.nganh}</p>
                            <p><strong>Lớp:</strong> {app.lop}</p>
                            <p><strong>Khóa:</strong> {app.khoa}</p>
                            <p><strong>Điểm TB:</strong> {app.diem_tb}</p>
                          </div>
                          <div>
                            <p><strong>Loại học bổng:</strong> {app.hoc_bong}</p>
                            <p><strong>Hoàn cảnh:</strong> {app.kinh_te}</p>
                            <p><strong>Thành viên:</strong> {app.so_thanh_vien} người</p>
                            <p><strong>Trạng thái:</strong> 
                              <span className="ml-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                                Đang xử lý
                              </span>
                            </p>
                          </div>
                        </div>
                        
                        {app.attachments && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-700 mb-2">File đính kèm:</p>
                            <div className="flex flex-wrap gap-2">
                              {JSON.parse(app.attachments).map((file, fileIndex) => (
                                <span key={fileIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                  {file}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default DangKyHocBong; 