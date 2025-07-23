import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

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
      <motion.div
        className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
      <motion.div className="max-w-4xl mx-auto bg-white mt-8 p-10 rounded-3xl shadow-2xl">
        <motion.h2
          className="text-4xl font-extrabold text-blue-900 mb-8 text-center uppercase tracking-wide animate-fade-in-up"
          style={{ letterSpacing: 2 }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ĐĂNG KÝ THÔNG TIN ĐỂ XÉT HỌC BẠ 2025 VÀ HỌC BỔNG HUTECH
        </motion.h2>
        <form className="mt-6 space-y-10" onSubmit={handleSubmit}>
          {/* Thông tin thí sinh */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold text-xl mb-4 text-blue-700">
              1. Thông tin thí sinh
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1 text-blue-700">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  name="ho_ten"
                  value={form.ho_ten}
                  onChange={handleFormChange}
                  type="text"
                  required
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-blue-700">
                  Ngày sinh <span className="text-red-500">*</span>
                </label>
                <input
                  name="ngay_sinh"
                  value={form.ngay_sinh}
                  onChange={handleFormChange}
                  type="date"
                  required
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-blue-700">
                  Số CCCD <span className="text-red-500">*</span>
                </label>
                <input
                  name="cccd"
                  value={form.cccd}
                  onChange={handleFormChange}
                  type="text"
                  required
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-blue-700">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  name="sdt"
                  value={form.sdt}
                  onChange={handleFormChange}
                  type="tel"
                  required
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-blue-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  type="email"
                  required
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-blue-700">
                  Nơi học lớp 12 <span className="text-red-500">*</span>
                </label>
                <input
                  name="noi_hoc_12"
                  value={form.noi_hoc_12}
                  onChange={handleFormChange}
                  type="text"
                  required
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-blue-700">
                  Trường THPT <span className="text-red-500">*</span>
                </label>
                <input
                  name="truong_thpt"
                  value={form.truong_thpt}
                  onChange={handleFormChange}
                  type="text"
                  required
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-blue-700">
                  Tên lớp 12 <span className="text-red-500">*</span>
                </label>
                <input
                  name="ten_lop_12"
                  value={form.ten_lop_12}
                  onChange={handleFormChange}
                  type="text"
                  required
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1 text-blue-700">
                  Địa chỉ nhận giấy báo
                </label>
                <input
                  name="dia_chi"
                  value={form.dia_chi}
                  onChange={handleFormChange}
                  type="text"
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent"
                />
              </div>
            </div>
          </motion.section>

          {/* Ngành đăng ký */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold text-xl mb-4 text-blue-700">
              2. Ngành đăng ký xét tuyển đại học (tối đa 5 ngành)
            </h3>
            {nganhIds.map((id, idx) => (
              <div key={idx} className="flex items-center gap-4 mb-2">
                <label className="font-medium">
                  Ngành {idx + 1} <span className="text-red-500">*</span>
                </label>
                <select
                  className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
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
                  <button
                    type="button"
                    onClick={() => handleRemoveNganh(idx)}
                    className="text-red-500 hover:underline"
                  >
                    Xóa
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddNganh}
              className="text-blue-600 hover:underline mt-2 transition"
            >
              + Thêm ngành
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Thí sinh có thể chọn tối đa 5 ngành học.
            </p>
          </motion.section>

          {/* Bảng điểm lớp 12 */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-semibold text-2xl mb-6 text-blue-700 text-center">
              3. Điểm các môn học năm lớp 12
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-lg shadow-sm bg-white">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-3 text-base text-blue-900 font-bold text-center">
                      Tên môn học
                    </th>
                    {monHoc.map((mon) => (
                      <th
                        key={mon}
                        className="px-4 py-3 text-base text-blue-900 font-bold text-center"
                      >
                        {mon}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-blue-50 transition">
                    <td className="font-medium px-4 py-2 text-center">
                      Điểm HK1
                    </td>
                    {monHoc.map((mon) => (
                      <td key={mon} className="px-2 py-2 text-center">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="10"
                          className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-center"
                          placeholder="Nhập"
                          value={diemHK1[mon] || ""}
                          onChange={(e) =>
                            handleDiemChange("hk1", mon, e.target.value)
                          }
                        />
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-blue-50 transition">
                    <td className="font-medium px-4 py-2 text-center">
                      Điểm cả năm
                    </td>
                    {monHoc.map((mon) => (
                      <td key={mon} className="px-2 py-2 text-center">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="10"
                          className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-center"
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
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-semibold text-xl mb-4 text-blue-700">
              4. Hình học bạ và CCCD
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Thí sinh đính kèm ảnh chụp hoặc file scan tất cả các trang trong
              học bạ THPT/ Bảng điểm 3 năm học THPT và mặt trước CCCD.
            </p>
            <div className="flex items-center gap-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50 transition group">
                <svg
                  className="w-8 h-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-blue-600 font-semibold">Upload File</span>
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
                  className="h-24 rounded shadow-lg border-2 border-blue-200 animate-fade-in"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                />
              )}
            </div>
          </motion.section>

          {/* Cam kết và nút gửi */}
          <motion.section
            className="pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id="camket"
                className="mr-2 accent-blue-600"
                required
              />
              <label htmlFor="camket" className="text-sm">
                Tôi xin cam đoan các thông tin trên là đúng sự thật và hoàn toàn
                chịu trách nhiệm theo quy định của Nhà trường.
              </label>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-2 px-8 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2 text-lg"
              >
                {loading && (
                  <span className="loader border-white border-t-blue-600 animate-spin rounded-full w-5 h-5 border-2"></span>
                )}
                Hoàn tất đăng ký
              </button>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-8 rounded-full shadow transition-all duration-200"
              >
                Quay lại
              </button>
            </div>
          </motion.section>
          {success && (
            <motion.div
              className="mt-4 p-3 bg-green-100 text-green-700 rounded shadow text-center animate-fade-in"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              className="mt-4 p-3 bg-red-100 text-red-700 rounded shadow text-center animate-fade-in"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
        </form>
      </motion.div>
    </motion.div>
    </>
  );
}

export default DangKyXetTuyen;
