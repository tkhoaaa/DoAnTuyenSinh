import React, { useState } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import {
  FaUser,
  FaEnvelope,
  FaPen,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebookF,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";

function LienHe() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    setTimeout(() => {
      setSuccess("Đã gửi tin nhắn thành công!");
      setLoading(false);
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <>
      <SEO 
        title="Liên hệ"
        description="Liên hệ với HUTECHS - Địa chỉ, số điện thoại, email và form liên hệ trực tuyến. Hỗ trợ tư vấn tuyển sinh và giải đáp thắc mắc."
        keywords="liên hệ HUTECHS, địa chỉ trường, số điện thoại, email, tư vấn tuyển sinh"
        canonical="/lien-he"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 pb-10">
      {/* Hero Section */}
      <motion.section
        className="py-10 bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg animate-fade-in-up"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Liên hệ với chúng tôi
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 animate-fade-in-up"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="container mx-auto grid md:grid-cols-2 gap-10 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Contact Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col justify-center animate-fade-in-up"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">
            Gửi tin nhắn cho chúng tôi
          </h3>
          {success && (
            <motion.div
              className="mb-3 p-2 bg-green-100 text-green-700 rounded text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              className="mb-3 p-2 bg-red-100 text-red-700 rounded text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <span className="absolute left-3 top-3 text-blue-600">
                <FaUser />
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Họ và tên"
                className="w-full pl-10 pr-3 py-3 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent rounded"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-3 text-blue-600">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full pl-10 pr-3 py-3 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent rounded"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-3 text-blue-600">
                <FaPen />
              </span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Tin nhắn"
                className="w-full pl-10 pr-3 py-3 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition bg-transparent rounded resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold rounded-full shadow-lg transition-all duration-200 text-lg flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="loader border-white border-t-blue-600 animate-spin rounded-full w-5 h-5 border-2"></span>
              )}
              <span>Gửi tin nhắn</span>
              <FaPaperPlane />
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-up flex flex-col justify-center"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">
              Thông tin liên hệ
            </h3>
            <p className="text-gray-600">
              Liên hệ với chúng tôi bằng một trong những cách sau
            </p>
          </div>
          <div className="space-y-6 mb-6">
            <div className="flex items-center gap-4">
              <span className="text-blue-600 text-2xl">
                <FaMapMarkerAlt />
              </span>
              <div>
                <h4 className="font-semibold text-blue-700">Địa chỉ</h4>
                <p>475A Điện Biên Phủ, P.25, Q.Bình Thạnh, TP.HCM</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-blue-600 text-2xl">
                <FaPhoneAlt />
              </span>
              <div>
                <h4 className="font-semibold text-blue-700">Hotline</h4>
                <p>1900 2059</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-blue-600 text-2xl">
                <FaEnvelope />
              </span>
              <div>
                <h4 className="font-semibold text-blue-700">Email</h4>
                <p>
                  <a
                    href="mailto:hutech@hutech.edu.vn"
                    className="text-blue-600 hover:underline"
                  >
                    hutech@hutech.edu.vn
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold text-blue-700 mb-2">
              Theo dõi chúng tôi
            </h4>
            <div className="flex gap-4 justify-center">
              <a
                href="https://www.facebook.com/hutechuniversity"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-800 text-white rounded-full p-3 shadow transition-transform hover:scale-110"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.tiktok.com/hutechuniversity"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-800 text-white rounded-full p-3 shadow transition-transform hover:scale-110"
              >
                <FaTiktok />
              </a>
              <a
                href="https://www.instagram.com/hutechuniversity/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-tr from-pink-500 to-yellow-400 text-white rounded-full p-3 shadow transition-transform hover:scale-110"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Map Section */}
      <motion.section
        className="mt-10 rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1231308962456!2d106.71242021531647!3d10.801590892304064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a459cb43ab%3A0x6c3d29d370b52a7e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVFAuSENNIChIVVRFQ0gp!5e0!3m2!1svi!2s!4v1645429405751!5m2!1svi!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="HUTECH Map"
        ></iframe>
      </motion.section>
    </div>
    </>
  );
}

export default LienHe;
