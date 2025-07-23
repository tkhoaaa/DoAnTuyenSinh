import React, { useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCalendar, FaVenusMars, FaIdCard, FaMapMarkerAlt, FaComments, FaList, FaPlus, FaInfoCircle } from "react-icons/fa";
import { UserContext } from "../accounts/UserContext";

function DangKyTuVan() {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('register'); // 'register' hoặc 'list'
  const [form, setForm] = useState({
    ho_ten: "",
    ngay_sinh: "",
    gioi_tinh: "",
    phone: "",
    email: "",
    nganh: "",
    lop: "",
    khoa: "",
    diem_tb: "",
    phuong_thuc: "",
    noi_dung: "",
    nguon_thong_tin: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [consultations, setConsultations] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/api/consult/apply", form);
      setSuccess("Gửi yêu cầu tư vấn thành công!");
      setForm({
        ho_ten: "", ngay_sinh: "", gioi_tinh: "", phone: "", email: "",
        nganh: "", lop: "", khoa: "", diem_tb: "", phuong_thuc: "",
        noi_dung: "", nguon_thong_tin: ""
      });
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (Array.isArray(errors) && errors.length > 0) {
        setError(errors.map(e => e.msg).join(' | '));
      } else {
        setError(
          err.response?.data?.message ||
          "Gửi yêu cầu thất bại!"
        );
      }
    }
    setLoading(false);
  };

  const loadConsultations = async () => {
    if (!user?.email) {
      setError("Vui lòng đăng nhập để xem danh sách yêu cầu");
      return;
    }
    
    setLoadingList(true);
    try {
      const res = await axios.get(`http://localhost:3001/api/consult/list?email=${user.email}`);
      setConsultations(res.data.data || []);
    } catch (err) {
      setError("Không thể tải danh sách yêu cầu: " + (err.response?.data?.message || err.message));
    }
    setLoadingList(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-8"
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
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center mb-4">
              Đăng Ký Tư Vấn
            </h1>
            
            {/* Tab buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveTab('register')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'register'
                    ? 'bg-white text-green-600 shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <FaPlus />
                Gửi yêu cầu mới
              </button>
              <button
                onClick={() => {
                  setActiveTab('list');
                  loadConsultations();
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'list'
                    ? 'bg-white text-green-600 shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <FaList />
                Danh sách yêu cầu đã gửi
              </button>
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === 'register' ? (
              // Form đăng ký tư vấn
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
                    <FaUser className="text-green-600" />
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </select>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Thông tin học tập */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaGraduationCap className="text-green-600" />
                    Thông tin học tập
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngành học *
                      </label>
                      <input
                        name="nganh"
                        value={form.nganh}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Thông tin tư vấn */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaComments className="text-green-600" />
                    Thông tin tư vấn
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phương thức tư vấn mong muốn *
                      </label>
                      <select
                        name="phuong_thuc"
                        value={form.phuong_thuc}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Chọn phương thức</option>
                        <option value="Tư vấn trực tiếp">Tư vấn trực tiếp</option>
                        <option value="Tư vấn qua điện thoại">Tư vấn qua điện thoại</option>
                        <option value="Tư vấn qua email">Tư vấn qua email</option>
                        <option value="Tư vấn qua video call">Tư vấn qua video call</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nội dung cần tư vấn *
                      </label>
                      <textarea
                        name="noi_dung"
                        value={form.noi_dung}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Mô tả chi tiết vấn đề cần tư vấn, thắc mắc, khó khăn gặp phải..."
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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

                {/* Submit button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
                  >
                    {loading && (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {loading ? "Đang xử lý..." : "Gửi yêu cầu tư vấn"}
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
              // Danh sách yêu cầu đã gửi
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Danh sách yêu cầu tư vấn đã gửi
                  </h3>
                  <button
                    onClick={loadConsultations}
                    disabled={loadingList}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    {loadingList && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    Làm mới
                  </button>
                </div>

                {loadingList ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-2 text-gray-600">Đang tải danh sách...</p>
                  </div>
                ) : consultations.length === 0 ? (
                  <div className="text-center py-8">
                    <FaList className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Chưa có yêu cầu tư vấn nào được gửi</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {consultations.map((consult, index) => (
                      <div key={consult.id || index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-semibold text-gray-800">
                            Yêu cầu #{consult.id} - {consult.ho_ten}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {formatDate(consult.created_at)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p><strong>Ngành:</strong> {consult.nganh}</p>
                            <p><strong>Lớp:</strong> {consult.lop}</p>
                            <p><strong>Khóa:</strong> {consult.khoa}</p>
                            <p><strong>Điểm TB:</strong> {consult.diem_tb}</p>
                          </div>
                          <div>
                            <p><strong>Phương thức:</strong> {consult.phuong_thuc}</p>
                            <p><strong>Trạng thái:</strong> 
                              <span className="ml-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                                Đang xử lý
                              </span>
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="text-sm font-medium text-gray-700 mb-2">Nội dung tư vấn:</p>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">{consult.noi_dung}</p>
                        </div>
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

export default DangKyTuVan; 