import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCalendar, FaIdCard, FaMapMarkerAlt, FaSchool, FaFileUpload, FaCheckCircle, FaExclamationTriangle, FaPlus, FaMinus } from "react-icons/fa";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function DangKyXetTuyen() {
  const [nganhList, setNganhList] = useState([]);
  const [nganhIds, setNganhIds] = useState([""]);
  const [form, setForm] = useState({
    ho_ten: "",
    ngay_sinh: "",
    cccd: "",
    sdt: "",
    email: "",
    noi_hoc_12: "",
    truong_thpt: "",
    ten_lop_12: "",
    dia_chi: "",
  });
  const [diemHK1, setDiemHK1] = useState({});
  const [diemCaNam, setDiemCaNam] = useState({});
  const [fileHoSo, setFileHoSo] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const monHoc = [
    "Toán",
    "Văn",
    "Anh",
    "Lý",
    "GDCD",
    "Hóa",
    "Sinh",
    "Sử",
    "Địa",
    "Âm nhạc",
    "Vẽ",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/majors")
      .then((res) => {
        console.log("Majors API response:", res.data);
        if (res.data.success) {
          setNganhList(res.data.data);
        } else {
          setNganhList([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching majors:", error);
        setNganhList([]);
      });
  }, []);

  const handleNganhChange = (idx, value) => {
    const arr = [...nganhIds];
    arr[idx] = value;
    setNganhIds(arr);
  };
  const handleAddNganh = () => {
    if (nganhIds.length < 5) setNganhIds([...nganhIds, ""]);
  };
  const handleRemoveNganh = (idx) => {
    if (nganhIds.length > 1) setNganhIds(nganhIds.filter((_, i) => i !== idx));
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDiemChange = (type, mon, value) => {
    if (type === "hk1") setDiemHK1({ ...diemHK1, [mon]: value });
    else setDiemCaNam({ ...diemCaNam, [mon]: value });
  };

  const handleFileChange = (e) => {
    setFileHoSo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const applicationData = {
        ...form,
        nganh_id: parseInt(nganhIds[0]) || null,
        nganh_ids: nganhIds.filter(Boolean).map(id => parseInt(id)),
        diem_hk1: JSON.stringify(diemHK1),
        diem_ca_nam: JSON.stringify(diemCaNam),
        user_id: localStorage.getItem("userId") || null,
      };

      console.log("Submitting application:", applicationData);

      const response = await axios.post("http://localhost:3001/api/auth/apply", applicationData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        setSuccess("Đăng ký thành công! Mã hồ sơ: " + response.data.data.application_code);
        setForm({
          ho_ten: "",
          ngay_sinh: "",
          cccd: "",
          sdt: "",
          email: "",
          noi_hoc_12: "",
          truong_thpt: "",
          ten_lop_12: "",
          dia_chi: "",
        });
        setNganhIds([""]);
        setDiemHK1({});
        setDiemCaNam({});
        setFileHoSo(null);
      } else {
        setError(response.data.message || "Đăng ký thất bại!");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.response?.data?.message || "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Đăng ký xét tuyển"
        description="Đăng ký xét tuyển HUTECHS 2025 - Nộp hồ sơ trực tuyến, chọn ngành học, xét tuyển theo nhiều phương thức. Quy trình đơn giản, nhanh chóng."
        keywords="đăng ký xét tuyển, HUTECHS, nộp hồ sơ, xét tuyển online, tuyển sinh 2025"
        canonical="/dang-ky-xet-tuyen"
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
                <FaGraduationCap className="text-white text-3xl" />
              </motion.div>
              
              <h1 className="text-5xl font-bold text-white mb-4">
                Đăng Ký Xét Tuyển
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Nộp hồ sơ xét tuyển HUTECH 2025 - Quy trình đơn giản, nhanh chóng
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
              className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8"
            >
              <motion.h2
                className="text-4xl font-extrabold text-blue-900 mb-8 text-center uppercase tracking-wide"
                style={{ letterSpacing: 2 }}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                ĐĂNG KÝ THÔNG TIN ĐỂ XÉT HỌC BẠ 2025 VÀ HỌC BỔNG HUTECH
              </motion.h2>
              
              <motion.form 
                className="space-y-10" 
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {/* Thông tin thí sinh */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                      <FaUser className="text-white text-lg" />
                    </div>
                    1. Thông tin thí sinh
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      name="ho_ten"
                      value={form.ho_ten}
                      onChange={handleFormChange}
                      placeholder="Họ và tên"
                      icon={FaUser}
                      required
                      className="w-full"
                    />
                    <Input
                      name="ngay_sinh"
                      type="date"
                      value={form.ngay_sinh}
                      onChange={handleFormChange}
                      placeholder="Ngày sinh"
                      icon={FaCalendar}
                      required
                      className="w-full"
                    />
                    <Input
                      name="cccd"
                      value={form.cccd}
                      onChange={handleFormChange}
                      placeholder="Số CCCD"
                      icon={FaIdCard}
                      required
                      className="w-full"
                    />
                    <Input
                      name="sdt"
                      type="tel"
                      value={form.sdt}
                      onChange={handleFormChange}
                      placeholder="Số điện thoại"
                      icon={FaPhone}
                      required
                      className="w-full"
                    />
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="Email"
                      icon={FaEnvelope}
                      required
                      className="w-full"
                    />
                    <Input
                      name="noi_hoc_12"
                      value={form.noi_hoc_12}
                      onChange={handleFormChange}
                      placeholder="Nơi học lớp 12"
                      icon={FaSchool}
                      required
                      className="w-full"
                    />
                    <Input
                      name="truong_thpt"
                      value={form.truong_thpt}
                      onChange={handleFormChange}
                      placeholder="Trường THPT"
                      icon={FaSchool}
                      required
                      className="w-full"
                    />
                    <Input
                      name="ten_lop_12"
                      value={form.ten_lop_12}
                      onChange={handleFormChange}
                      placeholder="Tên lớp 12"
                      icon={FaSchool}
                      required
                      className="w-full"
                    />
                    <div className="md:col-span-2">
                      <Input
                        name="dia_chi"
                        value={form.dia_chi}
                        onChange={handleFormChange}
                        placeholder="Địa chỉ nhận giấy báo"
                        icon={FaMapMarkerAlt}
                        className="w-full"
                      />
                    </div>
                  </div>
                </motion.section>

                {/* Ngành đăng ký */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                      <FaGraduationCap className="text-white text-lg" />
                    </div>
                    2. Ngành đăng ký xét tuyển đại học (tối đa 5 ngành)
                  </h3>
                  <div className="space-y-4">
                    {nganhIds.map((id, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <label className="font-semibold text-gray-700 min-w-[80px]">
                          Ngành {idx + 1} <span className="text-red-500">*</span>
                        </label>
                        <select
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          value={id}
                          onChange={(e) => handleNganhChange(idx, e.target.value)}
                          required
                        >
                          <option value="">--Chọn ngành--</option>
                          {nganhList.map((nganh) => (
                            <option key={nganh.id} value={nganh.id}>
                              {nganh.name} ({nganh.code})
                            </option>
                          ))}
                        </select>
                        {nganhIds.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveNganh(idx)}
                            className="text-red-500 border-red-300 hover:bg-red-50"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaMinus />
                          </Button>
                        )}
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * nganhIds.length }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddNganh}
                        className="text-blue-600 border-blue-300 hover:bg-blue-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaPlus className="mr-2" />
                        Thêm ngành
                      </Button>
                    </motion.div>
                    <p className="text-sm text-gray-500 mt-2">
                      Thí sinh có thể chọn tối đa 5 ngành học.
                    </p>
                  </div>
                </motion.section>

                {/* Bảng điểm lớp 12 */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                      <FaGraduationCap className="text-white text-lg" />
                    </div>
                    3. Điểm các môn học năm lớp 12
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border rounded-xl shadow-sm bg-white">
                      <thead className="bg-gradient-to-r from-purple-100 to-pink-100">
                        <tr>
                          <th className="px-4 py-3 text-base text-purple-900 font-bold text-center">
                            Tên môn học
                          </th>
                          {monHoc.map((mon) => (
                            <th
                              key={mon}
                              className="px-4 py-3 text-base text-purple-900 font-bold text-center"
                            >
                              {mon}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-purple-50 transition">
                          <td className="font-semibold px-4 py-3 text-center bg-purple-50">
                            Điểm HK1
                          </td>
                          {monHoc.map((mon) => (
                            <td key={mon} className="px-2 py-2 text-center">
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                max="10"
                                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-center"
                                placeholder="Nhập"
                                value={diemHK1[mon] || ""}
                                onChange={(e) =>
                                  handleDiemChange("hk1", mon, e.target.value)
                                }
                              />
                            </td>
                          ))}
                        </tr>
                        <tr className="hover:bg-purple-50 transition">
                          <td className="font-semibold px-4 py-3 text-center bg-purple-50">
                            Điểm cả năm
                          </td>
                          {monHoc.map((mon) => (
                            <td key={mon} className="px-2 py-2 text-center">
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                max="10"
                                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-center"
                                placeholder="Nhập"
                                value={diemCaNam[mon] || ""}
                                onChange={(e) =>
                                  handleDiemChange("canam", mon, e.target.value)
                                }
                              />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.section>

                {/* Upload file */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-100"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                      <FaFileUpload className="text-white text-lg" />
                    </div>
                    4. Hình học bạ và CCCD
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Thí sinh đính kèm ảnh chụp hoặc file scan tất cả các trang trong
                    học bạ THPT/ Bảng điểm 3 năm học THPT và mặt trước CCCD.
                  </p>
                  <div className="flex items-center gap-4">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-orange-400 rounded-xl cursor-pointer hover:bg-orange-50 transition-all duration-200 group">
                      <FaFileUpload className="w-8 h-8 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-orange-600 font-semibold">Upload File</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <span className="text-xs text-gray-400 mt-1">
                        Dung lượng tối đa 10MB/file
                      </span>
                    </label>
                    {fileHoSo && (
                      <motion.img
                        src={URL.createObjectURL(fileHoSo)}
                        alt="Preview"
                        className="h-24 rounded-lg shadow-lg border-2 border-orange-200"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      />
                    )}
                  </div>
                </motion.section>

                {/* Cam kết và nút gửi */}
                <motion.section
                  className="pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="camket"
                      className="mt-1 accent-blue-600"
                      required
                    />
                    <label htmlFor="camket" className="text-sm text-gray-700 leading-relaxed">
                      Tôi xin cam đoan các thông tin trên là đúng sự thật và hoàn toàn
                      chịu trách nhiệm theo quy định của Nhà trường.
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      variant="gradient"
                      size="lg"
                      loading={loading}
                      disabled={loading}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg px-8 py-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGraduationCap className="mr-2" />
                      {loading ? "Đang xử lý..." : "Hoàn tất đăng ký"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 font-bold text-lg px-8 py-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Quay lại
                    </Button>
                  </div>
                </motion.section>
                
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
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
}

export default DangKyXetTuyen;
