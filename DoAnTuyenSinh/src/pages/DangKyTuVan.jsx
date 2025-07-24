import React, { useState, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaCalendar,
  FaVenusMars,
  FaIdCard,
  FaMapMarkerAlt,
  FaComments,
  FaList,
  FaPlus,
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaStar,
} from "react-icons/fa";
import { UserContext } from "../accounts/UserContext";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function DangKyTuVan() {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("register"); // 'register' hoặc 'list'
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
    nguon_thong_tin: "",
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
      const res = await axios.post(
        "http://localhost:3001/api/consult/apply",
        form
      );
      setSuccess("Gửi yêu cầu tư vấn thành công!");
      setForm({
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
        nguon_thong_tin: "",
      });
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (Array.isArray(errors) && errors.length > 0) {
        setError(errors.map((e) => e.msg).join(" | "));
      } else {
        setError(err.response?.data?.message || "Gửi yêu cầu thất bại!");
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
      const res = await axios.get(
        `http://localhost:3001/api/consult/list?email=${user.email}`
      );
      setConsultations(res.data.data || []);
    } catch (err) {
      setError(
        "Không thể tải danh sách yêu cầu: " +
          (err.response?.data?.message || err.message)
      );
    }
    setLoadingList(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <>
      <SEO
        title="Đăng ký tư vấn - HUTECH"
        description="Đăng ký tư vấn tuyển sinh HUTECH 2025 - Tư vấn trực tiếp, qua điện thoại, email. Hỗ trợ thông tin chi tiết về ngành học, học phí, học bổng."
        keywords="đăng ký tư vấn, tư vấn tuyển sinh, HUTECH, tư vấn ngành học, học phí"
        canonical="/dang-ky-tu-van"
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600 opacity-90"></div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

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
                <FaComments className="text-white text-3xl" />
              </motion.div>

              <h1 className="text-5xl font-bold text-white mb-4">
                Đăng Ký Tư Vấn
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Đội ngũ tư vấn chuyên nghiệp sẵn sàng hỗ trợ bạn mọi thắc mắc về
                tuyển sinh
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
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mb-6"
                >
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Dịch Vụ Tư Vấn HUTECH
                  </h2>
                  <p className="text-white/90">Chọn dịch vụ bạn muốn sử dụng</p>
                </motion.div>

                {/* Tab buttons */}
                <motion.div
                  className="flex justify-center space-x-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    variant={activeTab === "register" ? "gradient" : "outline"}
                    size="lg"
                    onClick={() => setActiveTab("register")}
                    className={
                      activeTab === "register"
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-green-900 font-bold"
                        : "border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-bold"
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPlus className="mr-2" />
                    Gửi yêu cầu mới
                  </Button>
                  <Button
                    variant={activeTab === "list" ? "gradient" : "outline"}
                    size="lg"
                    onClick={() => {
                      setActiveTab("list");
                      loadConsultations();
                    }}
                    className={
                      activeTab === "list"
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-green-900 font-bold"
                        : "border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-bold"
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaList className="mr-2" />
                    Danh sách yêu cầu đã gửi
                  </Button>
                </motion.div>
              </div>

              {/* Tab content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {activeTab === "register" ? (
                    // Form đăng ký tư vấn
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
                        className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
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
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Chọn giới tính</option>
                              <option value="Nam">Nam</option>
                              <option value="Nữ">Nữ</option>
                            </select>
                          </div>
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
                          <div className="md:col-span-2">
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
                          </div>
                        </div>
                      </motion.div>

                      {/* Thông tin học tập */}
                      <motion.div
                        className="bg-gradient-to-r from-teal-50 to-cyan-50 p-8 rounded-2xl border border-teal-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
                            <FaGraduationCap className="text-white text-lg" />
                          </div>
                          Thông tin học tập
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        </div>
                      </motion.div>

                      {/* Thông tin tư vấn */}
                      <motion.div
                        className="bg-gradient-to-r from-emerald-50 to-green-50 p-8 rounded-2xl border border-emerald-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl flex items-center justify-center">
                            <FaComments className="text-white text-lg" />
                          </div>
                          Thông tin tư vấn
                        </h3>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Phương thức tư vấn mong muốn *
                            </label>
                            <select
                              name="phuong_thuc"
                              value={form.phuong_thuc}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Chọn phương thức</option>
                              <option value="Tư vấn trực tiếp">
                                Tư vấn trực tiếp
                              </option>
                              <option value="Tư vấn qua điện thoại">
                                Tư vấn qua điện thoại
                              </option>
                              <option value="Tư vấn qua email">
                                Tư vấn qua email
                              </option>
                              <option value="Tư vấn qua video call">
                                Tư vấn qua video call
                              </option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Nội dung cần tư vấn *
                            </label>
                            <textarea
                              name="noi_dung"
                              value={form.noi_dung}
                              onChange={handleChange}
                              required
                              rows="6"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                              placeholder="Mô tả chi tiết vấn đề cần tư vấn, thắc mắc, khó khăn gặp phải..."
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
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Chọn nguồn thông tin</option>
                              <option value="Website trường">
                                Website trường
                              </option>
                              <option value="Mạng xã hội">Mạng xã hội</option>
                              <option value="Bạn bè">Bạn bè</option>
                              <option value="Thầy cô">Thầy cô</option>
                              <option value="Khác">Khác</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>

                      {/* Submit button */}
                      <motion.div
                        className="flex justify-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Button
                          type="submit"
                          variant="gradient"
                          size="lg"
                          loading={loading}
                          disabled={loading}
                          className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold text-lg px-12 py-4"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaComments className="mr-2" />
                          {loading ? "Đang xử lý..." : "Gửi yêu cầu tư vấn"}
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
                    // Danh sách yêu cầu đã gửi
                    <motion.div
                      key="list"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800">
                          Danh sách yêu cầu tư vấn đã gửi
                        </h3>
                        <Button
                          variant="outline"
                          size="md"
                          onClick={loadConsultations}
                          loading={loadingList}
                          disabled={loadingList}
                          className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
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
                          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-gray-600">Đang tải danh sách...</p>
                        </motion.div>
                      ) : consultations.length === 0 ? (
                        <motion.div
                          className="text-center py-12"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <FaList className="text-6xl text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 text-lg">
                            Chưa có yêu cầu tư vấn nào được gửi
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          className="space-y-6"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.1,
                              },
                            },
                          }}
                          initial="hidden"
                          animate="visible"
                        >
                          {consultations.map((consult, index) => (
                            <motion.div
                              key={consult.id || index}
                              variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                              }}
                              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <h4 className="text-xl font-bold text-gray-800">
                                  Yêu cầu #{consult.id} - {consult.ho_ten}
                                </h4>
                                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                  {formatDate(consult.created_at)}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-4">
                                <div className="space-y-2">
                                  <p>
                                    <strong>Ngành:</strong> {consult.nganh}
                                  </p>
                                  <p>
                                    <strong>Lớp:</strong> {consult.lop}
                                  </p>
                                  <p>
                                    <strong>Khóa:</strong> {consult.khoa}
                                  </p>
                                  <p>
                                    <strong>Điểm TB:</strong> {consult.diem_tb}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <p>
                                    <strong>Phương thức:</strong>{" "}
                                    {consult.phuong_thuc}
                                  </p>
                                  <p>
                                    <strong>Trạng thái:</strong>
                                    <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                                      Đang xử lý
                                    </span>
                                  </p>
                                </div>
                              </div>

                              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <p className="text-sm font-semibold text-gray-700 mb-2">
                                  Nội dung tư vấn:
                                </p>
                                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                                  {consult.noi_dung}
                                </p>
                              </div>
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

export default DangKyTuVan;
