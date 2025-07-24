import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaTrophy,
  FaUsers,
  FaStar,
  FaPlay,
  FaArrowRight,
  FaHandshake,
  FaSearch,
  FaEnvelope,
} from "react-icons/fa";
import SEO from "../components/SEO";
import StructuredData, {
  organizationData,
  websiteData,
} from "../components/StructuredData";
import OptimizedImage from "../components/OptimizedImage";
import Button from "../components/ui/Button";
import VideoModal from "../components/VideoModal";

const bannerUrl =
  "https://file1.hutech.edu.vn/file/editor/homepage1/792764-xep-hang-scimago-2025-713x475.jpg";

const sectionFade = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, type: "spring" },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function TrangChu() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoUrl = "https://youtu.be/ayTTBNBtNpk?si=7byB99-BkTZPRP0n";

  const handleVideoClick = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <>
      <SEO
        title="Trang chủ"
        description="HUTECH - Trường Đại học Công nghệ TP.HCM. Tuyển sinh 2025 với nhiều ngành học hiện đại, học bổng hấp dẫn, môi trường giáo dục chất lượng cao."
        keywords="HUTECH, tuyển sinh 2025, đại học công nghệ, TP.HCM, QS Stars, học bổng, ngành học"
        canonical="/"
      />
      <StructuredData data={organizationData} />
      <StructuredData data={websiteData} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="relative py-20 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-90"></div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 px-4 relative z-10">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/2"
            >
              <OptimizedImage
                src={bannerUrl}
                alt="HUTECH đạt xếp hạng QS Stars 4 sao - Minh chứng cho chất lượng giáo dục hàng đầu"
                className="rounded-3xl shadow-2xl w-full object-cover"
                loading="eager"
              />
            </motion.div>

            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              >
                <FaStar className="text-yellow-400" />
                QS Stars 4 Sao chu kỳ 2
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                                      HUTECH
                </span>
                <br />
                <span className="text-white">Tuyển sinh 2025</span>
              </motion.h1>

              <motion.p
                className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Trường Đại học Công nghệ TP.HCM - Đa ngành, hiện đại,
                <span className="text-yellow-300 font-semibold">
                  {" "}
                  được giảm 25% học bổng khi đăng kí xét tuyển
                </span>
                , đăng ký nguyện vọng 1 tại HUTECH cũng có thể nhận được học
                bổng 50% học phí.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <Button
                  as={Link}
                  to="/dang-ky-xet-tuyen"
                  variant="gradient"
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-blue-900 font-bold text-lg px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGraduationCap className="mr-2" />
                  Đăng ký xét tuyển ngay
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold text-lg px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVideoClick}
                >
                  <FaPlay className="mr-2" />
                  Xem video giới thiệu
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-16 bg-white/50 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={staggerContainer}
            >
              {[
                { icon: FaUsers, number: "50,000+", label: "Sinh viên" },
                { icon: FaTrophy, number: "QS 4★", label: "Chuẩn quốc tế" },
                { icon: FaGraduationCap, number: "50+", label: "Ngành học" },
                { icon: FaStar, number: "Top 11", label: "Việt Nam" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemAnimation}
                  className="text-center group"
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <stat.icon className="text-white text-2xl" />
                  </motion.div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Thành tựu nổi bật */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Thành tựu nổi bật
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Những minh chứng cho chất lượng giáo dục hàng đầu của HUTECH
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {[
                {
                                  img: "https://file1.hutech.edu.vn/file/editor/homepage1/213688-dat-chung-nhan-qs-stars-4-sao-713x475.jpg",
                title: "QS Stars 4 Sao chu kỳ 2",
                desc: "HUTECH đạt chuẩn đánh giá quốc tế QS Stars 4 Sao chu kỳ 2.",
                link: "https://www.hutech.edu.vn/homepage/tin-hutech/14623064-hutech-don-tin-vui-dau-nam-2025-dat-chung-nhan-qs-stars-4-sao-o-chu-ky-2",
                },
                {
                                  img: "https://file1.hutech.edu.vn/file/editor/tuyensinh/679403-jpeg-optimizer_482063183_992252426347806_2741441194146505700_n.jpg",
                title: "Chất lượng đào tạo top đầu miền Nam",
                desc: "Chất lượng đào tạo đứng đầu trong những top đầu của các trường Đại học miền Nam.",
                link: "https://www.hutech.edu.vn/tuyensinh/moi-truong-hutech/14622762-chat-luong-dao-tao-cua-hutech",
                },
                {
                  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC2mEQgq-ntbDuSAoMWyZJ1ALx4jU1sExLSA&s",
                  title: "Top 11 trường đại học hàng đầu Việt Nam",
                  desc: "HUTECH xếp thứ 11 trong số 53 trường đại học và viện nghiên cứu hàng đầu Việt Nam.",
                  link: "https://www.facebook.com/share/p/1W74ULtPFd/",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemAnimation}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  onClick={() => window.open(item.link, '_blank')}
                >
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <OptimizedImage
                      src={item.img}
                      alt={`${item.title} - Thành tựu nổi bật của HUTECH`}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      height="192"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.desc}
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(item.link, '_blank');
                    }}
                  >
                    Xem chi tiết
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Bắt đầu hành trình của bạn
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Chọn dịch vụ phù hợp để bắt đầu quá trình tuyển sinh
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {[
                {
                  icon: FaSearch,
                  title: "Tra cứu hồ sơ",
                  desc: "Kiểm tra trạng thái hồ sơ xét tuyển của bạn",
                  link: "/tra-cuu-ket-qua",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: FaHandshake,
                  title: "Tư vấn & Học bổng",
                  desc: "Đăng ký tư vấn và xin học bổng",
                  link: "/dang-ky-hoc-bong",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: FaEnvelope,
                  title: "Liên hệ",
                  desc: "Liên hệ với chúng tôi để được hỗ trợ",
                  link: "/lien-he",
                  color: "from-orange-500 to-red-500",
                },
              ].map((action, index) => (
                <motion.div
                  key={index}
                  variants={itemAnimation}
                  className="group"
                >
                  <motion.div
                    className={`bg-gradient-to-r ${action.color} rounded-3xl p-8 text-white text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      <action.icon className="text-2xl" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4">{action.title}</h3>
                    <p className="text-white/90 mb-6 leading-relaxed">
                      {action.desc}
                    </p>

                    <Button
                      as={Link}
                      to={action.link}
                      variant="outline"
                      size="lg"
                      className="border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Truy cập ngay
                      <FaArrowRight className="ml-2" />
                    </Button>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideoModal}
        videoUrl={videoUrl}
      />
    </>
  );
}

export default TrangChu;
