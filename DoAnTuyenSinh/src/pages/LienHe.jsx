import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaUser,
  FaComments,
} from "react-icons/fa";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: "Địa chỉ",
    content: "475A Điện Biên Phủ, P.25, Q.Bình Thạnh, TP.HCM",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: FaPhone,
    title: "Điện thoại",
    content: "028.5445.7777",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: FaEnvelope,
    title: "Email",
    content: "tuyensinh@hutech.edu.vn",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: FaClock,
    title: "Giờ làm việc",
    content: "Thứ 2 - Thứ 6: 7:30 - 17:00",
    color: "from-purple-500 to-pink-500",
  },
];

const socialLinks = [
  {
    icon: FaFacebook,
    name: "Facebook",
    url: "https://facebook.com/hutech.edu.vn",
    color: "from-blue-600 to-blue-700",
  },
  {
    icon: FaYoutube,
    name: "YouTube",
    url: "https://www.youtube.com/@hutechuniversity",
    color: "from-red-600 to-red-700",
  },
  {
    icon: FaInstagram,
    name: "Instagram",
    url: "https://www.instagram.com/hutechuniversity/",
    color: "from-pink-600 to-purple-600",
  },
  {
    icon: FaLinkedin,
    name: "LinkedIn",
    url: "https://linkedin.com/company/hutech",
    color: "from-blue-700 to-blue-800",
  },
];

function LienHe() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    // Simulate form submission
    setTimeout(() => {
      setSuccess(
        "Tin nhắn của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi trong thời gian sớm nhất."
      );
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <SEO
        title="Liên hệ - HUTECH"
        description="Liên hệ với HUTECH để được tư vấn tuyển sinh, hỗ trợ thông tin và giải đáp thắc mắc."
        keywords="liên hệ HUTECH, tư vấn tuyển sinh, hỗ trợ sinh viên, thông tin liên hệ"
        canonical="/lien-he"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-90"></div>
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
                <FaEnvelope className="text-white text-3xl" />
              </motion.div>

              <h1 className="text-5xl font-bold text-white mb-4">
                Liên hệ với chúng tôi
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn mọi lúc, mọi
                nơi
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Info */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="py-16"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Thông tin liên hệ
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hãy liên hệ với chúng tôi qua các kênh sau để được hỗ trợ tốt
                nhất
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
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
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="group"
                >
                  <motion.div
                    className={`bg-gradient-to-r ${info.color} rounded-3xl p-6 text-white text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      <info.icon className="text-2xl" />
                    </motion.div>

                    <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {info.content}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Theo dõi chúng tôi
              </h3>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gradient-to-r ${social.color} w-12 h-12 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="text-xl" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="py-16 bg-white/50 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Gửi tin nhắn cho chúng tôi
                </h2>
                <p className="text-lg text-gray-600">
                  Hãy để lại thông tin và tin nhắn của bạn, chúng tôi sẽ phản
                  hồi trong thời gian sớm nhất
                </p>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8"
              >
                <AnimatePresence>
                  {success && (
                    <motion.div
                      className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      {success}
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ và tên
                      </label>
                      <Input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nhập họ và tên"
                        icon={FaUser}
                        required
                        className="w-full"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.0 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Nhập email"
                        icon={FaEnvelope}
                        required
                        className="w-full"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.1 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Nhập số điện thoại"
                        icon={FaPhone}
                        className="w-full"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Chủ đề
                      </label>
                      <Input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Nhập chủ đề"
                        icon={FaComments}
                        required
                        className="w-full"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.3 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tin nhắn
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Nhập nội dung tin nhắn..."
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="text-center"
                  >
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
                      <FaPaperPlane className="mr-2" />
                      {loading ? "Đang gửi..." : "Gửi tin nhắn"}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Map Section */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="py-16"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Vị trí của chúng tôi
              </h2>
              <p className="text-lg text-gray-600">
                Ghé thăm cơ sở chính của HUTECH tại TP.HCM
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.484123456789!2d106.709123456789!3d10.80123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e640d01%3A0xf89fba644b4c0b8!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBIdXRlY2g!5e0!3m2!1svi!2s!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
}

export default LienHe;
