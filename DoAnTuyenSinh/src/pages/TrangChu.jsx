import React from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import StructuredData, { organizationData, websiteData } from "../components/StructuredData";
import OptimizedImage from "../components/OptimizedImage";

const bannerUrl = "https://file1.hutech.edu.vn/file/editor/homepage1/792764-xep-hang-scimago-2025-713x475.jpg";

const sectionFade = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, type: "spring" }
  })
};

function TrangChu() {
  return (
    <>
      <SEO 
        title="Trang chủ"
        description="HUTECHS - Trường Đại học Công nghệ TP.HCM. Tuyển sinh 2025 với nhiều ngành học hiện đại, học bổng hấp dẫn, môi trường giáo dục chất lượng cao."
        keywords="HUTECHS, tuyển sinh 2025, đại học công nghệ, TP.HCM, QS Stars, học bổng, ngành học"
        canonical="/"
      />
      <StructuredData data={organizationData} />
      <StructuredData data={websiteData} />
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Banner */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionFade} className="py-8 bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
                      <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full md:w-2/3"
            >
              <OptimizedImage
                src={bannerUrl}
                alt="HUTECHS đạt xếp hạng QS Stars 4 sao - Minh chứng cho chất lượng giáo dục hàng đầu"
                className="rounded-2xl shadow-2xl w-full object-cover animate-fade-in"
                loading="eager"
              />
            </motion.div>
          <div className="flex-1 flex flex-col items-center md:items-start mt-6 md:mt-0">
            <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg text-yellow-300 animate-fade-in-up" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              HUTECHS - Tuyển sinh 2025
            </motion.h1>
            <motion.p className="text-lg md:text-xl mb-6 text-white/90 animate-fade-in-up" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              Trường Đại học Công nghệ TP.HCM (HUTECH) - Đa ngành, hiện đại, học bổng hấp dẫn, môi trường năng động.
            </motion.p>
            <motion.a href="/dang-ky-xet-tuyen" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-8 rounded-full shadow-xl text-lg transition-all duration-200 animate-bounce" whileHover={{ scale: 1.08 }}>
              Đăng ký xét tuyển ngay
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Section: Thành tựu nổi bật */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionFade} className="py-12">
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl font-extrabold text-blue-900 text-center mb-10 animate-fade-in-up" initial="hidden" animate="visible">Thành tựu nổi bật</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              img: "https://file1.hutech.edu.vn/file/editor/homepage1/213688-dat-chung-nhan-qs-stars-4-sao-713x475.jpg",
              title: "QS Stars 4 Sao chu kỳ 2",
              desc: "HUTECH đạt chuẩn đánh giá quốc tế QS Stars 4 Sao chu kỳ 2.",
              link: "https://www.hutech.edu.vn/homepage/tin-hutech/14623064-hutech-don-tin-vui-dau-nam-2025-dat-chung-nhan-qs-stars-4-sao-o-chu-ky-2"
            }, {
              img: "https://file1.hutech.edu.vn/file/editor/tuyensinh/679403-jpeg-optimizer_482063183_992252426347806_2741441194146505700_n.jpg",
              title: "Chất lượng đào tạo top đầu miền Nam",
              desc: "Chất lượng đào tạo đứng đầu trong những top đầu của các trường Đại học miền Nam.",
              link: "https://www.hutech.edu.vn/tuyensinh/moi-truong-hutech/14622762-chat-luong-dao-tao-cua-hutech"
            }, {
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC2mEQgq-ntbDuSAoMWyZJ1ALx4jU1sExLSA&s",
              title: "Top 11 trường đại học hàng đầu Việt Nam",
              desc: "HUTECH xếp thứ 11 trong số 53 trường đại học và viện nghiên cứu hàng đầu Việt Nam.",
              link: "https://www.facebook.com/share/p/1W74ULtPFd/"
                          }].map((item, i) => (
                <motion.div key={i} className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 animate-fade-in-up flex flex-col items-center" custom={i} variants={sectionFade}>
                  <OptimizedImage 
                    src={item.img} 
                    alt={`${item.title} - Thành tựu nổi bật của HUTECHS`}
                    className="rounded-xl mb-4 mx-auto h-40 object-cover shadow-md" 
                    height="160"
                  />
                  <div className="font-bold text-lg mb-2 text-blue-800">{item.title}</div>
                  <div className="text-gray-600 mb-3">{item.desc}</div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-lg shadow hover:bg-yellow-300 transition mt-auto">Xem chi tiết →</a>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.section>

      {/* Section: Video & Slogan */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionFade} className="py-12 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
          <motion.div className="w-full md:w-1/2 mb-6 md:mb-0 rounded-3xl overflow-hidden shadow-xl animate-fade-in-up" initial="hidden" animate="visible">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/ayTTBNBtNpk?si=A3ZVgpC6BSuH3sQp"
              title="Giới thiệu trường"
              frameBorder="0"
              allowFullScreen
              className="w-full h-64 md:h-80"
            ></iframe>
          </motion.div>
          <motion.div className="w-full md:w-1/2 animate-fade-in-up" initial="hidden" animate="visible">
            <div className="bg-blue-900 rounded-2xl p-8 text-yellow-400 relative shadow-lg">
              <h2 className="mb-3 font-extrabold text-2xl md:text-3xl">Giới thiệu về trường Đại học HUTECHS</h2>
              <p className="text-white text-base md:text-lg mb-4">
                Năm 2025, Đại học Công nghệ TP.HCM (HUTECH) tiếp tục là một trong những trường đại học đa ngành, đào tạo từ trình độ đại học đến tiến sĩ, với 61 ngành theo 4 phương thức xét tuyển. HUTECH cam kết mang đến môi trường học tập chất lượng, hiện đại, với nhiều chính sách học bổng hấp dẫn và học phí ổn định.
              </p>
              <a
                href="https://www.hutech.edu.vn/tuyensinh"
                className="inline-block bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded-lg mt-3 shadow hover:bg-yellow-300 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tìm hiểu thêm về chúng tôi <span className="ml-2">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section: Tin tức & Sự kiện nổi bật */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionFade} className="py-12 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl font-extrabold text-blue-900 text-center mb-10 animate-fade-in-up" initial="hidden" animate="visible">Tin tức & Sự kiện nổi bật</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              img: "https://file1.hutech.edu.vn/file/editor/homepage1/893218-dsc09307.jpg",
              title: "HUTECH dự kiến tuyển sinh 13.500 chỉ tiêu cho 61 ngành đào tạo với 4 phương thức xét tuyển độc lập.",
              desc: "Hoạt động xét tuyển của HUTECHS",
              link: "https://www.hutech.edu.vn/tuyensinh/tin-tuyen-sinh/14623527-tuyen-sinh-dai-hoc-2025-hutech-du-kien-xet-tuyen-03-phuong-thuc-61-nganh-voi-nhieu-chinh-sach-hoc-bo#:~:text=Tr%C6%B0%E1%BB%9Dng%20%C4%90%E1%BA%A1i%20h%E1%BB%8Dc%20C%C3%B4ng%20ngh%E1%BB%87,cho%20th%C3%AD%20sinh%20c%E1%BA%A3%20n%C6%B0%E1%BB%9Bc."
            }, {
              img: "https://file1.hutech.edu.vn/file/editor/homepage1/35611-dsc09338.jpg",
              title: "HUTECH công bố chính sách học phí và học bổng tuyển sinh đặc biệt năm 2025",
              desc: "Chính sách học bổng",
              link: "https://www.hutech.edu.vn/tuyensinh/tin-tuyen-sinh/14623320-hutech-cong-bo-chinh-sach-hoc-phi-va-hoc-bong-tuyen-sinh-dac-biet-nam-2025#:~:text=C%E1%BB%A5%20th%E1%BB%83%2C%20nh%C3%A2n%20d%E1%BB%8Bp%20k%E1%BB%B7,06/2025%20ngay%20T%E1%BA%A0I%20%C4%90%C3%82Y."
            }, {
              img: "https://file1.hutech.edu.vn/file/editor/homepage1/941122-backdrop-led-2.jpg",
              title: "Hội nghị Sinh viên Nghiên cứu Khoa học HUTECH 2025 sẽ diễn ra vào 18/6 tới",
              desc: "Sự kiện Khoa",
              link: "https://www.hutech.edu.vn/homepage/tin-hutech/14626009-hoi-nghi-sinh-vien-nghien-cuu-khoa-hoc-hutech-2025-se-dien-ra-vao-186-toi#:~:text=18/6%20t%E1%BB%9Bi-,H%E1%BB%99i%20ngh%E1%BB%8B%20Sinh%20vi%C3%AAn%20Nghi%C3%AAn%20c%E1%BB%A9u%20Khoa%20h%E1%BB%8Dc%20HUTECH%202025,ra%20v%C3%A0o%2018/6%20t%E1%BB%9Bi&text=Ng%C3%A0y%2018/6%20s%E1%BA%AFp%20t%E1%BB%9Bi,l%E1%BA%ADp%20cho%20th%E1%BA%BF%20h%E1%BB%87%20tr%E1%BA%BB." 
                          }].map((item, i) => (
                <motion.div key={i} className="bg-white rounded-2xl shadow-lg p-5 hover:scale-105 hover:shadow-2xl transition-transform duration-300 animate-fade-in-up flex flex-col items-center" custom={i} variants={sectionFade}>
                  <OptimizedImage 
                    src={item.img} 
                    alt={`${item.title} - Tin tức và sự kiện nổi bật tại HUTECHS`}
                    className="rounded-xl mb-3 w-full h-40 object-cover" 
                    height="160"
                  />
                  <div className="font-bold text-lg mb-2 text-blue-800">{item.title}</div>
                  <div className="text-gray-600 mb-2">{item.desc}</div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-auto font-bold text-black border-2 border-black px-5 py-2 rounded-md bg-yellow-100 hover:bg-yellow-300 transition">Tìm hiểu <span className="ml-1">→</span></a>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.section>
      </div>
    </>
  );
}

export default TrangChu; 