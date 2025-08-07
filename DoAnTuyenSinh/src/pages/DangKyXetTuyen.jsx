import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaCalendar,
  FaIdCard,
  FaMapMarkerAlt,
  FaSchool,
  FaFileUpload,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPlus,
  FaMinus,
  FaSave,
  FaTrash,
  FaRocket,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import FormField from "../components/ui/FormField";
import { useAutoSave } from "../hooks/useAutoSave";
import { showToast } from "../components/ui/Toast";
import PageTransition, { SectionTransition, StaggerContainer, StaggerItem } from "../components/ui/PageTransition";

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

  // Phương thức xét tuyển
  const [phuongThucXetTuyen, setPhuongThucXetTuyen] = useState("hoc_ba");

  // Học bạ THPT (hiện tại)
  const [diemHK1, setDiemHK1] = useState({});
  const [diemCaNam, setDiemCaNam] = useState({});

  // Thi THPT
  const [khoiThiList, setKhoiThiList] = useState([]);
  const [selectedKhoiThi, setSelectedKhoiThi] = useState("");
  const [diemThiTHPT, setDiemThiTHPT] = useState({});

  // Đánh giá năng lực
  const [diemDanhGiaNangLuc, setDiemDanhGiaNangLuc] = useState("");

  const [fileHoSo, setFileHoSo] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // TỰ động lưu bản náp
  const formData = {
    form,
    nganhIds,
    phuongThucXetTuyen,
    diemHK1,
    diemCaNam,
    selectedKhoiThi,
    diemThiTHPT,
    diemDanhGiaNangLuc,
  };
  
  const { saveNow, loadSaved, clearSaved } = useAutoSave(formData, 'dangky-xettuyen-draft', 3000);

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

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case 'ho_ten':
        if (!value.trim()) return 'Họ tên không được để trống';
        if (value.length < 2) return 'Họ tên phải có ít nhất 2 ký tự';
        if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(value)) return 'Họ tên chỉ được chứa chữ cái và khoảng trắng';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email không được để trống';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email không hợp lệ';
        return '';
      
      case 'sdt':
        if (!value.trim()) return 'Số điện thoại không được để trống';
        if (!/^[0-9]{10,11}$/.test(value)) return 'Số điện thoại phải có 10-11 chữ số';
        return '';
      
      case 'cccd':
        if (!value.trim()) return 'CCCD không được để trống';
        if (!/^[0-9]{12}$/.test(value)) return 'CCCD phải có 12 chữ số';
        return '';
      
      case 'ngay_sinh':
        if (!value) return 'Ngày sinh không được để trống';
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 15 || age > 30) return 'Tuổi phải từ 15-30';
        return '';
      
      default:
        return '';
    }
  };

  const handleFieldChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Validate field
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    
    // Mark as touched
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    
    // Validate ngành học
    if (nganhIds.length === 0 || nganhIds.every(id => !id)) {
      newErrors.nganh = 'Vui lòng chọn ít nhất một ngành học';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    // Load saved data first
    const savedData = loadSaved();
    if (savedData) {
      setForm(savedData.form || form);
      setNganhIds(savedData.nganhIds || nganhIds);
      setPhuongThucXetTuyen(savedData.phuongThucXetTuyen || phuongThucXetTuyen);
      setDiemHK1(savedData.diemHK1 || diemHK1);
      setDiemCaNam(savedData.diemCaNam || diemCaNam);
      setSelectedKhoiThi(savedData.selectedKhoiThi || selectedKhoiThi);
      setDiemThiTHPT(savedData.diemThiTHPT || diemThiTHPT);
      setDiemDanhGiaNangLuc(savedData.diemDanhGiaNangLuc || diemDanhGiaNangLuc);
      showToast.info('Đã khôi phục bản nháp đã lưu');
    }

    // Load majors
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

    // Load exam blocks
    axios
      .get("http://localhost:3001/api/auth/exam-blocks")
      .then((res) => {
        console.log("Exam blocks API response:", res.data);
        if (res.data.success) {
          setKhoiThiList(res.data.data);
        } else {
          setKhoiThiList([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching exam blocks:", error);
        setKhoiThiList([]);
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

  const handleDiemThiTHPTChange = (mon, value) => {
    setDiemThiTHPT({ ...diemThiTHPT, [mon]: value });
  };

  const handleKhoiThiChange = (khoiThiCode) => {
    setSelectedKhoiThi(khoiThiCode);
    const khoiThi = khoiThiList.find(k => k.code === khoiThiCode);
    if (khoiThi) {
      // Reset điểm khi đổi khối
      const newDiem = {};
      khoiThi.subjects.forEach(mon => {
        newDiem[mon] = "";
      });
      setDiemThiTHPT(newDiem);
    }
  };

  const handlePhuongThucChange = (method) => {
    setPhuongThucXetTuyen(method);
    // Reset dữ liệu khi đổi phương thức
    if (method !== "hoc_ba") {
      setDiemHK1({});
      setDiemCaNam({});
    }
    if (method !== "thi_thpt") {
      setSelectedKhoiThi("");
      setDiemThiTHPT({});
    }
    if (method !== "danh_gia_nang_luc") {
      setDiemDanhGiaNangLuc("");
    }
  };

  const handleFileChange = (e) => {
    setFileHoSo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      showToast.error('Vui lòng kiểm tra lại thông tin đã nhập');
      return;
    }
    
    setLoading(true);
    setSuccess("");
    setError("");
    
    const loadingToast = showToast.loading('Đang xử lý đăng ký...');
    
    try {
      const applicationData = {
        ...form,
        nganh_id: parseInt(nganhIds[0]) || null,
        nganh_ids: nganhIds.filter(Boolean).map((id) => parseInt(id)),
        phuong_thuc_xet_tuyen: phuongThucXetTuyen,
        user_id: localStorage.getItem("userId") || null,
      };

      // Add data based on admission method
      if (phuongThucXetTuyen === "hoc_ba") {
        applicationData.diem_hk1 = JSON.stringify(diemHK1);
        applicationData.diem_ca_nam = JSON.stringify(diemCaNam);
      } else if (phuongThucXetTuyen === "thi_thpt") {
        applicationData.khoi_thi = selectedKhoiThi;
        applicationData.diem_thi_thpt = diemThiTHPT;
      } else if (phuongThucXetTuyen === "danh_gia_nang_luc") {
        applicationData.diem_danh_gia_nang_luc = parseFloat(diemDanhGiaNangLuc);
      }

      console.log("Submitting application:", applicationData);

      const response = await axios.post(
        "http://localhost:3001/api/auth/apply",
        applicationData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      showToast.dismiss(loadingToast);
      
      if (response.data.success) {
        showToast.success('Đăng ký xét tuyển thành công! Mã hồ sơ: ' + response.data.data.application_code, 'Thành công');
        setSuccess(
          "Đăng ký thành công! Mã hồ sơ: " + response.data.data.application_code
        );
        
        // Clear saved draft
        clearSaved();
        
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
        setPhuongThucXetTuyen("hoc_ba");
        setDiemHK1({});
        setDiemCaNam({});
        setSelectedKhoiThi("");
        setDiemThiTHPT({});
        setDiemDanhGiaNangLuc("");
        setFileHoSo(null);
        setErrors({});
        setTouched({});
      } else {
        showToast.error(response.data.message || "Đăng ký thất bại!");
        setError(response.data.message || "Đăng ký thất bại!");
      }
    } catch (err) {
      showToast.dismiss(loadingToast);
      console.error("Submit error:", err);
      const errorMessage = err.response?.data?.message || "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!";
      showToast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <SEO
        title="Đăng ký xét tuyển"
        description="Đăng ký xét tuyển HUTECH 2025 - Nộp hồ sơ trực tuyến, chọn ngành học, xét tuyển theo nhiều phương thức. Quy trình đơn giản, nhanh chóng."
        keywords="đăng ký xét tuyển, HUTECH, nộp hồ sơ, xét tuyển online, tuyển sinh 2025"
        canonical="/dang-ky-xet-tuyen"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Modern Hero Section */}
        <SectionTransition className="relative py-24 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-indigo-600/90 to-purple-600/90 dark:from-blue-800/90 dark:via-indigo-800/90 dark:to-purple-800/90"></div>
            
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, 20],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Geometric Patterns */}
            <div className="absolute inset-0">
              <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 100 100">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <StaggerContainer className="text-center">
              <StaggerItem>
                <motion.div
                  className="relative inline-block mb-8"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-32 h-32 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto shadow-2xl border border-white/20">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-2 border-2 border-dashed border-white/30 rounded-3xl"
                    />
                    <FaGraduationCap className="text-white text-5xl relative z-10" />
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FaStar className="text-yellow-800 text-xs" />
                    </motion.div>
                  </div>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <motion.h1 
                  className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                    Đăng Ký Xét Tuyển
                  </span>
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold text-white/90 mt-4 flex items-center justify-center gap-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <FaRocket className="text-yellow-400" />
                    HUTECH 2025
                    <FaHeart className="text-red-400" />
                  </motion.div>
                </motion.h1>
              </StaggerItem>

              <StaggerItem>
                <motion.p 
                  className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="font-semibold">Nộp hồ sơ xét tuyển trực tuyến</span> - Quy trình thông minh, hiện đại
                  <br />
                                                    <span className="text-lg text-white/80 flex items-center justify-center gap-2 mt-2">
                                    <HiSparkles className="text-yellow-400" />
                                    Hỗ trợ tự động lưu bản nháp và validation thông minh
                                    <HiSparkles className="text-yellow-400" />
                                  </span>
                </motion.p>
              </StaggerItem>

              <StaggerItem>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    onClick={saveNow}
                    variant="outline"
                    size="lg"
                    className="bg-white/90 backdrop-blur-md border-white/50 text-blue-700 hover:bg-white hover:border-white/70 shadow-xl font-semibold"
                    leftIcon={<FaSave />}
                    whileTap={{ scale: 0.95 }}
                  >
                    Lưu bản nháp
                  </Button>
                  <Button
                    onClick={clearSaved}
                    variant="outline"
                    size="lg"
                    className="bg-white/90 backdrop-blur-md border-white/50 text-red-700 hover:bg-white hover:border-white/70 shadow-xl font-semibold"
                    leftIcon={<FaTrash />}
                    whileTap={{ scale: 0.95 }}
                  >
                    Xóa bản nháp
                  </Button>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </SectionTransition>

        {/* Main Content */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="py-20 relative"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="max-w-7xl mx-auto"
            >
              {/* Modern Form Container */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
                <div className="relative">
                  {/* Header Gradient */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  
                  <div className="p-8 md:p-12">
                    <motion.div
                      className="text-center mb-12"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        ĐĂNG KÝ THÔNG TIN XÉT TUYỂN 2025
                      </h2>
                      <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"></div>
                      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Hoàn thành form đăng ký để nhận học bổng HUTECH và tham gia xét tuyển
                      </p>
                    </motion.div>

                    <motion.form
                      className="space-y-12"
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
                        className="relative"
                      >
                        <Card className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-2xl overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                          
                          <div className="p-8">
                            <div className="flex items-center gap-4 mb-8">
                              <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                  <FaUser className="text-white text-xl" />
                                </div>
                                <motion.div
                                  className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <span className="text-white text-xs font-bold">1</span>
                                </motion.div>
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                  Thông tin thí sinh
                                </h3>
                                                                 <p className="text-gray-600 dark:text-gray-300">
                                   Vui lòng điền đầy đủ thông tin cá nhân
                                 </p>
                               </div>
                             </div>
                            
                            <StaggerContainer className="grid md:grid-cols-2 gap-6">
                              <StaggerItem>
                                <FormField
                                  label="Họ và tên"
                                  name="ho_ten"
                                  value={form.ho_ten}
                                  onChange={(e) => handleFieldChange('ho_ten', e.target.value)}
                                  placeholder="Nhập họ và tên đầy đủ"
                                  leftIcon={<FaUser className="text-blue-500" />}
                                  required
                                  error={errors.ho_ten}
                                  success={!errors.ho_ten && touched.ho_ten && form.ho_ten ? "Hợp lệ" : ""}
                                  className="group"
                                />
                              </StaggerItem>
                              
                              <StaggerItem>
                                <FormField
                                  label="Ngày sinh"
                                  name="ngay_sinh"
                                  type="date"
                                  value={form.ngay_sinh}
                                  onChange={(e) => handleFieldChange('ngay_sinh', e.target.value)}
                                  leftIcon={<FaCalendar className="text-purple-500" />}
                                  required
                                  error={errors.ngay_sinh}
                                  success={!errors.ngay_sinh && touched.ngay_sinh && form.ngay_sinh ? "Hợp lệ" : ""}
                                />
                              </StaggerItem>
                              
                              <StaggerItem>
                                <FormField
                                  label="Số CCCD"
                                  name="cccd"
                                  value={form.cccd}
                                  onChange={(e) => handleFieldChange('cccd', e.target.value)}
                                  placeholder="Nhập 12 chữ số CCCD"
                                  leftIcon={<FaIdCard className="text-green-500" />}
                                  required
                                  maxLength={12}
                                  error={errors.cccd}
                                  success={!errors.cccd && touched.cccd && form.cccd ? "Hợp lệ" : ""}
                                />
                              </StaggerItem>
                              
                              <StaggerItem>
                                <FormField
                                  label="Số điện thoại"
                                  name="sdt"
                                  type="tel"
                                  value={form.sdt}
                                  onChange={(e) => handleFieldChange('sdt', e.target.value)}
                                  placeholder="Nhập số điện thoại"
                                  leftIcon={<FaPhone className="text-orange-500" />}
                                  required
                                  maxLength={11}
                                  error={errors.sdt}
                                  success={!errors.sdt && touched.sdt && form.sdt ? "Hợp lệ" : ""}
                                />
                              </StaggerItem>
                              
                              <StaggerItem>
                                <FormField
                                  label="Email"
                                  name="email"
                                  type="email"
                                  value={form.email}
                                  onChange={(e) => handleFieldChange('email', e.target.value)}
                                  placeholder="Nhập địa chỉ email"
                                  leftIcon={<FaEnvelope className="text-red-500" />}
                                  required
                                  error={errors.email}
                                  success={!errors.email && touched.email && form.email ? "Hợp lệ" : ""}
                                />
                              </StaggerItem>
                              
                              <StaggerItem>
                                <FormField
                                  label="Nơi học lớp 12"
                                  name="noi_hoc_12"
                                  value={form.noi_hoc_12}
                                  onChange={(e) => handleFieldChange('noi_hoc_12', e.target.value)}
                                  placeholder="Tỉnh/Thành phố học lớp 12"
                                  leftIcon={<FaSchool className="text-teal-500" />}
                                  required
                                  error={errors.noi_hoc_12}
                                  success={!errors.noi_hoc_12 && touched.noi_hoc_12 && form.noi_hoc_12 ? "Hợp lệ" : ""}
                                />
                              </StaggerItem>
                              
                              <StaggerItem>
                                <FormField
                                  label="Trường THPT"
                                  name="truong_thpt"
                                  value={form.truong_thpt}
                                  onChange={(e) => handleFieldChange('truong_thpt', e.target.value)}
                                  placeholder="Tên trường THPT"
                                  leftIcon={<FaSchool className="text-indigo-500" />}
                                  required
                                  error={errors.truong_thpt}
                                  success={!errors.truong_thpt && touched.truong_thpt && form.truong_thpt ? "Hợp lệ" : ""}
                                />
                              </StaggerItem>
                              
                              <StaggerItem>
                                <FormField
                                  label="Tên lớp 12"
                                  name="ten_lop_12"
                                  value={form.ten_lop_12}
                                  onChange={(e) => handleFieldChange('ten_lop_12', e.target.value)}
                                  placeholder="Ví dụ: 12A1"
                                  leftIcon={<FaSchool className="text-pink-500" />}
                                  required
                                  error={errors.ten_lop_12}
                                  success={!errors.ten_lop_12 && touched.ten_lop_12 && form.ten_lop_12 ? "Hợp lệ" : ""}
                                />
                              </StaggerItem>
                              
                              <StaggerItem className="md:col-span-2">
                                <FormField
                                  label="Địa chỉ nhận giấy báo"
                                  name="dia_chi"
                                  value={form.dia_chi}
                                  onChange={(e) => handleFieldChange('dia_chi', e.target.value)}
                                  placeholder="Nhập địa chỉ chi tiết để nhận giấy báo"
                                  leftIcon={<FaMapMarkerAlt className="text-yellow-500" />}
                                  error={errors.dia_chi}
                                  success={!errors.dia_chi && touched.dia_chi && form.dia_chi ? "Hợp lệ" : ""}
                                />
                              </StaggerItem>
                            </StaggerContainer>
                          </div>
                        </Card>
                      </motion.section>

                      {/* Ngành đăng ký */}
                      <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="relative"
                      >
                        <Card className="bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200/50 dark:border-emerald-700/50 rounded-2xl overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500"></div>
                          
                          <div className="p-8">
                            <div className="flex items-center gap-4 mb-8">
                              <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                  <FaGraduationCap className="text-white text-xl" />
                                </div>
                                <motion.div
                                  className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                >
                                  <span className="text-white text-xs font-bold">2</span>
                                </motion.div>
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                  Ngành đăng ký xét tuyển đại học
                                </h3>
                                                                 <p className="text-gray-600 dark:text-gray-300">
                                   Chọn tối đa 5 ngành theo thứ tự ưu tiên
                                 </p>
                               </div>
                             </div>
                            
                            <div className="space-y-4">
                              {nganhIds.map((id, idx) => (
                                <motion.div
                                  key={idx}
                                  className="group"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 * idx }}
                                >
                                  <Card className="p-4 bg-white/50 dark:bg-gray-800/50 border border-emerald-200/50 dark:border-emerald-700/50 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-lg">
                                    <div className="flex items-center gap-4">
                                      <div className="flex items-center gap-3 min-w-[120px]">
                                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                          {idx + 1}
                                        </div>
                                        <label className="font-semibold text-gray-700 dark:text-gray-300">
                                          Ngành {idx + 1}
                                          <span className="text-red-500 ml-1">*</span>
                                        </label>
                                      </div>
                                      
                                      <select
                                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-300 dark:hover:border-emerald-600"
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
                                          size="icon-sm"
                                          onClick={() => handleRemoveNganh(idx)}
                                          className="text-red-500 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                                          whileTap={{ scale: 0.9 }}
                                        >
                                          <FaMinus />
                                        </Button>
                                      )}
                                    </div>
                                  </Card>
                                </motion.div>
                              ))}
                              
                              {nganhIds.length < 5 && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.1 * nganhIds.length }}
                                >
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="md"
                                    onClick={handleAddNganh}
                                    className="w-full border-dashed border-2 border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-600 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                                    leftIcon={<FaPlus />}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    Thêm ngành học
                                  </Button>
                                </motion.div>
                              )}
                              
                              <motion.p 
                                className="text-sm text-gray-500 dark:text-gray-400 mt-4 flex items-center gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                              >
                                <HiSparkles className="text-yellow-500" />
                                Thí sinh có thể chọn tối đa 5 ngành học theo thứ tự ưu tiên.
                              </motion.p>
                            </div>
                          </div>
                        </Card>
                      </motion.section>

                      {/* Phương thức xét tuyển */}
                      <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85 }}
                        className="relative"
                      >
                        <Card className="bg-gradient-to-br from-purple-50/50 to-violet-50/50 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200/50 dark:border-purple-700/50 rounded-2xl overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div>
                          
                          <div className="p-8">
                            <div className="flex items-center gap-4 mb-8">
                              <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                                  <FaFileUpload className="text-white text-xl" />
                                </div>
                                <motion.div
                                  className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                >
                                  <span className="text-white text-xs font-bold">3</span>
                                </motion.div>
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                  Phương thức xét tuyển
                                </h3>
                                                                 <p className="text-gray-600 dark:text-gray-300">
                                   Chọn phương thức xét tuyển phù hợp với bạn
                                 </p>
                               </div>
                             </div>
                            
                            <div className="grid md:grid-cols-3 gap-6">
                              {[
                                { 
                                  value: "hoc_ba", 
                                  label: "Học bạ THPT", 
                                  desc: "Xét tuyển bằng điểm học bạ 3 năm THPT",
                                  icon: FaGraduationCap,
                                  color: "from-blue-500 to-cyan-500"
                                },
                                { 
                                  value: "thi_thpt", 
                                  label: "Thi THPT", 
                                  desc: "Xét tuyển bằng điểm thi tốt nghiệp THPT",
                                  icon: FaFileUpload,
                                  color: "from-green-500 to-emerald-500"
                                },
                                { 
                                  value: "danh_gia_nang_luc", 
                                  label: "Đánh giá năng lực", 
                                  desc: "Xét tuyển bằng điểm đánh giá năng lực",
                                  icon: FaCheckCircle,
                                  color: "from-purple-500 to-pink-500"
                                },
                              ].map((method, index) => {
                                const IconComponent = method.icon;
                                return (
                                  <motion.div
                                    key={method.value}
                                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                                      phuongThucXetTuyen === method.value
                                        ? "border-purple-500 bg-purple-100/50 dark:bg-purple-900/30 shadow-lg scale-105"
                                        : "border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50"
                                    }`}
                                    onClick={() => handlePhuongThucChange(method.value)}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                  >
                                    <div className="flex flex-col items-center text-center">
                                      <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg transition-transform`}>
                                        <IconComponent className="text-white text-2xl" />
                                      </div>
                                      
                                      <div className="flex items-center mb-3">
                                        <input
                                          type="radio"
                                          name="phuongThucXetTuyen"
                                          value={method.value}
                                          checked={phuongThucXetTuyen === method.value}
                                          onChange={() => handlePhuongThucChange(method.value)}
                                          className="text-purple-600 mr-3 scale-125"
                                        />
                                        <h4 className="font-bold text-gray-800 dark:text-white text-lg">{method.label}</h4>
                                      </div>
                                      
                                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{method.desc}</p>
                                    </div>
                                    
                                    {phuongThucXetTuyen === method.value && (
                                      <motion.div
                                        className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                      >
                                        <FaCheckCircle className="text-white text-sm" />
                                      </motion.div>
                                    )}
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        </Card>
                      </motion.section>

                      {/* Thi THPT */}
                      {phuongThucXetTuyen === "thi_thpt" && (
                        <motion.section
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                          className="relative"
                        >
                          <Card className="bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-2xl overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                            
                            <div className="p-8">
                              <motion.div 
                                className="flex items-center gap-4 mb-8"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <div className="relative">
                                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <FaFileUpload className="text-white text-xl" />
                                  </div>
                                  <motion.div
                                    className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                                  >
                                    <span className="text-white text-xs font-bold">4</span>
                                  </motion.div>
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                    Điểm thi THPT
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    Nhập điểm thi tốt nghiệp THPT theo khối
                                  </p>
                                </div>
                              </motion.div>
                              
                              <div className="space-y-6">
                                <div>
                                  <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    Chọn khối thi <span className="text-red-500">*</span>
                                  </label>
                                  <select
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600"
                                    value={selectedKhoiThi}
                                    onChange={(e) => handleKhoiThiChange(e.target.value)}
                                    required
                                  >
                                    <option value="">--Chọn khối thi--</option>
                                    {khoiThiList.map((khoi) => (
                                      <option key={khoi.code} value={khoi.code}>
                                        {khoi.name} - {khoi.subjects.join(", ")}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {selectedKhoiThi && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid md:grid-cols-3 gap-4"
                                  >
                                    {khoiThiList
                                      .find(k => k.code === selectedKhoiThi)
                                      ?.subjects.map((mon, index) => (
                                        <motion.div 
                                          key={mon}
                                          initial={{ opacity: 0, scale: 0.9 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: 0.1 * index }}
                                          className="group"
                                        >
                                          <Card className="p-4 bg-white/50 dark:bg-gray-800/50 border border-blue-200/50 dark:border-blue-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                              Điểm {mon} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                              type="number"
                                              step="0.25"
                                              min="0"
                                              max="10"
                                              value={diemThiTHPT[mon] || ""}
                                              onChange={(e) => handleDiemThiTHPTChange(mon, e.target.value)}
                                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                              placeholder="0.00"
                                              required
                                            />
                                          </Card>
                                        </motion.div>
                                      ))}
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </Card>
                        </motion.section>
                      )}

                      {/* Đánh giá năng lực */}
                      {phuongThucXetTuyen === "danh_gia_nang_luc" && (
                        <motion.section
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                          className="relative"
                        >
                          <Card className="bg-gradient-to-br from-green-50/50 to-teal-50/50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200/50 dark:border-green-700/50 rounded-2xl overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-teal-500"></div>
                            
                            <div className="p-8">
                              <motion.div 
                                className="flex items-center gap-4 mb-8"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <div className="relative">
                                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <FaCheckCircle className="text-white text-xl" />
                                  </div>
                                  <motion.div
                                    className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                                  >
                                    <span className="text-white text-xs font-bold">4</span>
                                  </motion.div>
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                    Điểm đánh giá năng lực
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    Nhập điểm đánh giá năng lực của bạn
                                  </p>
                                </div>
                              </motion.div>
                              
                              <div className="max-w-md">
                                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                  Điểm đánh giá năng lực <span className="text-red-500">*</span>
                                </label>
                                <Card className="p-4 bg-white/50 dark:bg-gray-800/50 border border-green-200/50 dark:border-green-700/50">
                                  <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1200"
                                    value={diemDanhGiaNangLuc}
                                    onChange={(e) => setDiemDanhGiaNangLuc(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Nhập điểm đánh giá năng lực"
                                    required
                                  />
                                </Card>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
                                  <HiSparkles className="text-yellow-500" />
                                  Điểm tối đa: 1200 điểm
                                </p>
                              </div>
                            </div>
                          </Card>
                        </motion.section>
                      )}

                      {/* Bảng điểm lớp 12 (chỉ hiển thị khi chọn học bạ) */}
                      {phuongThucXetTuyen === "hoc_ba" && (
                        <motion.section
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.0 }}
                          className="relative"
                        >
                          <Card className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-700/50 rounded-2xl overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                            
                            <div className="p-8">
                              <motion.div 
                                className="flex items-center gap-4 mb-8"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <div className="relative">
                                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <FaGraduationCap className="text-white text-xl" />
                                  </div>
                                  <motion.div
                                    className="absolute -top-1 -right-1 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
                                  >
                                    <span className="text-white text-xs font-bold">4</span>
                                  </motion.div>
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                    Điểm các môn học năm lớp 12
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    Nhập điểm học kỳ 1 và cả năm lớp 12
                                  </p>
                                </div>
                              </motion.div>
                              
                              <div className="overflow-x-auto">
                                <Card className="bg-white/50 dark:bg-gray-800/50 border border-purple-200/50 dark:border-purple-700/50 rounded-xl overflow-hidden">
                                  <table className="min-w-full">
                                    <thead className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 dark:from-purple-900/50 dark:to-pink-900/50">
                                      <tr>
                                        <th className="px-4 py-4 text-base text-purple-900 dark:text-purple-100 font-bold text-center">
                                          Tên môn học
                                        </th>
                                        {monHoc.map((mon) => (
                                          <th
                                            key={mon}
                                            className="px-4 py-4 text-base text-purple-900 dark:text-purple-100 font-bold text-center"
                                          >
                                            {mon}
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-colors">
                                        <td className="font-semibold px-4 py-4 text-center bg-purple-50/50 dark:bg-purple-900/30 text-gray-800 dark:text-gray-200">
                                          Điểm HK1
                                        </td>
                                        {monHoc.map((mon) => (
                                          <td key={mon} className="px-2 py-3 text-center">
                                            <input
                                              type="number"
                                              step="0.01"
                                              min="0"
                                              max="10"
                                              className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-center"
                                              placeholder="Nhập"
                                              value={diemHK1[mon] || ""}
                                              onChange={(e) =>
                                                handleDiemChange("hk1", mon, e.target.value)
                                              }
                                            />
                                          </td>
                                        ))}
                                      </tr>
                                      <tr className="hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-colors">
                                        <td className="font-semibold px-4 py-4 text-center bg-purple-50/50 dark:bg-purple-900/30 text-gray-800 dark:text-gray-200">
                                          Điểm cả năm
                                        </td>
                                        {monHoc.map((mon) => (
                                          <td key={mon} className="px-2 py-3 text-center">
                                            <input
                                              type="number"
                                              step="0.01"
                                              min="0"
                                              max="10"
                                              className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-center"
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
                                </Card>
                              </div>
                            </div>
                          </Card>
                        </motion.section>
                      )}

                      {/* Upload file */}
                      <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        className="relative"
                      >
                        <Card className="bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200/50 dark:border-orange-700/50 rounded-2xl overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
                          
                          <div className="p-8">
                            <motion.div 
                              className="flex items-center gap-4 mb-8"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                                  <FaFileUpload className="text-white text-xl" />
                                </div>
                                <motion.div
                                  className="absolute -top-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: 3 }}
                                >
                                  <span className="text-white text-xs font-bold">5</span>
                                </motion.div>
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                  Hình học bạ và CCCD
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                  Upload file hình ảnh hoặc scan tài liệu
                                </p>
                              </div>
                            </motion.div>
                            
                            <div className="space-y-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <HiSparkles className="text-yellow-500" />
                                Thí sinh đính kèm ảnh chụp hoặc file scan tất cả các trang trong học bạ THPT/ Bảng điểm 3 năm học THPT và mặt trước CCCD.
                              </p>
                              
                              <div className="flex items-center gap-4">
                                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-orange-400 dark:border-orange-600 rounded-2xl cursor-pointer bg-white/50 dark:bg-gray-800/50 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300">
                                  <motion.div
                                    className="flex flex-col items-center"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  >
                                    <FaFileUpload className="w-12 h-12 text-orange-500 dark:text-orange-400 mb-3 group-hover:scale-110 transition-transform" />
                                    <span className="text-orange-600 dark:text-orange-400 font-semibold text-lg">
                                      Upload File
                                    </span>
                                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                      Dung lượng tối đa 10MB/file
                                    </span>
                                  </motion.div>
                                  <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="image/*,.pdf"
                                  />
                                </label>
                                
                                {fileHoSo && (
                                  <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="relative"
                                  >
                                    <Card className="p-2 bg-white/50 dark:bg-gray-800/50 border border-orange-200/50 dark:border-orange-700/50 rounded-xl">
                                      <img
                                        src={URL.createObjectURL(fileHoSo)}
                                        alt="Preview"
                                        className="h-32 w-32 object-cover rounded-lg"
                                      />
                                    </Card>
                                    <motion.div
                                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 300 }}
                                    >
                                      <FaCheckCircle className="text-white text-xs" />
                                    </motion.div>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.section>

                      {/* Cam kết và nút gửi */}
                      <motion.section
                        className="pt-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                      >
                        <Card className="bg-gradient-to-br from-gray-50/50 to-slate-50/50 dark:from-gray-800/50 dark:to-slate-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 to-slate-500"></div>
                          
                          <div className="p-8">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                              <div className="flex items-start gap-4">
                                <input
                                  type="checkbox"
                                  id="camket"
                                  className="mt-1 accent-blue-600 scale-125"
                                  required
                                />
                                <label
                                  htmlFor="camket"
                                  className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                                >
                                  <span className="font-semibold">Cam kết:</span> Tôi xin cam đoan các thông tin trên là đúng sự thật và
                                  hoàn toàn chịu trách nhiệm theo quy định của Nhà trường.
                                </label>
                              </div>
                              
                              <div className="flex gap-4">
                                <Button
                                  type="submit"
                                  variant="gradient"
                                  size="xl"
                                  loading={loading}
                                  disabled={loading}
                                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-xl"
                                  leftIcon={<FaGraduationCap />}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {loading ? "Đang xử lý..." : "Hoàn tất đăng ký"}
                                </Button>
                                
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="xl"
                                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold shadow-lg"
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Quay lại
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.section>

                      {/* Messages */}
                      <AnimatePresence>
                        {success && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Card className="p-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-400 dark:border-green-600 rounded-2xl">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                  <FaCheckCircle className="text-white text-xl" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-green-800 dark:text-green-200 text-lg">Thành công!</h4>
                                  <p className="text-green-700 dark:text-green-300">{success}</p>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        )}
                        
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Card className="p-6 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 border border-red-400 dark:border-red-600 rounded-2xl">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                                  <FaExclamationTriangle className="text-white text-xl" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-red-800 dark:text-red-200 text-lg">Có lỗi xảy ra!</h4>
                                  <p className="text-red-700 dark:text-red-300">{error}</p>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.form>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
}

export default DangKyXetTuyen;
