import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import StructuredData, { faqData as faqStructuredData } from "../components/StructuredData";
import { FaQuestionCircle, FaSearch, FaMeh } from "react-icons/fa";

const categories = [
  "Tuyển sinh",
  "Học phí",
  "Học bổng",
  "Chương trình đào tạo",
  "Hồ sơ",
  "Khác",
];
// thêm nộ dung FAQ mẫu
// Bạn có thể thay đổi hoặc thêm các câu hỏi và câu trả lời khác
const faqData = [
  {
    question: "HUTECH-S tuyển sinh những ngành nào?",
    answer:
      "Trường tuyển sinh đa ngành, chi tiết xem tại mục Thông tin tuyển sinh.",
    category: "Tuyển sinh",
  },
  {
    question: "Học phí năm 2025 là bao nhiêu?",
    answer: "Học phí ổn định, tham khảo tại mục Học phí trên website.",
    category: "Học phí",
  },
  {
    question: "Có những loại học bổng nào?",
    answer:
      "HUTECH-S có nhiều loại học bổng: học bổng tài năng, học bổng khuyến khích, học bổng hỗ trợ...",
    category: "Học bổng",
  },
  {
    question: "Cần chuẩn bị hồ sơ gì để đăng ký xét tuyển?",
    answer: "Thí sinh cần chuẩn bị CCCD, học bạ, bảng điểm, ảnh thẻ...",
    category: "Hồ sơ",
  },
  {
    question: "Thời gian nhập học dự kiến?",
    answer: "Thời gian nhập học dự kiến vào tháng 8/2025.",
    category: "Tuyển sinh",
  },
];

function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filteredFaq = faqData.filter(
    (item) =>
      (currentCategory === "" || item.category === currentCategory) &&
      (searchTerm === "" ||
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <SEO 
        title="Câu hỏi thường gặp (FAQ)"
        description="Câu hỏi thường gặp về HUTECHS - Tuyển sinh, học phí, học bổng, chương trình đào tạo và các thông tin hữu ích khác."
        keywords="FAQ HUTECHS, câu hỏi thường gặp, tuyển sinh, học phí, học bổng, chương trình đào tạo"
        canonical="/faq"
      />
      <StructuredData data={faqStructuredData} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 pb-10">
      {/* Header & Search */}
      <motion.section
        className="py-10 bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg flex items-center justify-center gap-2 animate-fade-in-up"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FaQuestionCircle className="text-yellow-300" /> Câu hỏi thường gặp
            (FAQ)
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 animate-fade-in-up"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Tìm kiếm câu trả lời cho các thắc mắc của bạn về HUTECH-S.
          </motion.p>
          <form
            className="mt-6 flex justify-center animate-fade-in-up"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex w-full max-w-xl bg-white rounded-full shadow-lg overflow-hidden">
              <input
                type="text"
                name="searchTerm"
                className="flex-1 px-5 py-3 outline-none text-gray-700 text-lg bg-transparent"
                placeholder="Nhập từ khóa tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-bold text-lg flex items-center gap-2 hover:bg-yellow-400 hover:text-blue-800 transition"
              >
                <FaSearch /> Tìm kiếm
              </button>
            </div>
          </form>
        </div>
      </motion.section>

      {/* Category Filters */}
      <motion.div
        className="container mx-auto mb-8 flex flex-wrap gap-3 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          className={`px-5 py-2 rounded-full font-semibold shadow transition-all duration-200 ${
            currentCategory === ""
              ? "bg-blue-700 text-yellow-300"
              : "bg-white text-blue-700 hover:bg-blue-100"
          }`}
          onClick={() => setCurrentCategory("")}
        >
          Tất cả chủ đề
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-5 py-2 rounded-full font-semibold shadow transition-all duration-200 ${
              currentCategory === cat
                ? "bg-blue-700 text-yellow-300"
                : "bg-white text-blue-700 hover:bg-blue-100"
            }`}
            onClick={() => setCurrentCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* FAQ List */}
      <div className="container mx-auto px-4">
        {filteredFaq.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-16 animate-fade-in-up"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaMeh className="text-5xl text-blue-400 mb-4 animate-bounce" />
            <h4 className="text-xl font-bold mb-2 text-blue-700">
              Không tìm thấy câu hỏi nào phù hợp.
            </h4>
            <p className="text-gray-600 mb-4">
              Vui lòng thử lại với từ khóa hoặc chủ đề khác.
            </p>
            {(searchTerm || currentCategory) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCurrentCategory("");
                }}
                className="text-blue-600 hover:underline font-semibold"
              >
                Hiển thị tất cả câu hỏi
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="max-w-3xl mx-auto animate-fade-in-up"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="space-y-4">
              <AnimatePresence>
                {filteredFaq.map((item, idx) => {
                  const isOpen = expanded === idx;
                  return (
                    <motion.div
                      key={item.question}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      layout
                      className="border rounded-xl shadow bg-white"
                    >
                      <button
                        className={`w-full flex items-center gap-3 px-6 py-5 text-lg font-semibold text-blue-800 focus:outline-none transition-all duration-200 ${
                          isOpen ? "bg-blue-50" : "bg-white"
                        }`}
                        onClick={() => setExpanded(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                      >
                        <FaQuestionCircle className="text-blue-600 text-xl" />
                        <span>{item.question}</span>
                        <span
                          className={`ml-auto transition-transform duration-200 ${
                            isOpen ? "rotate-180" : "rotate-0"
                          }`}
                        >
                          ▼
                        </span>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 pb-5 text-gray-700 text-base"
                          >
                            <div>{item.answer}</div>
                            <div className="mt-2 text-xs text-gray-500">
                              Chủ đề: {item.category}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </div>
    </>
  );
}

export default FAQ;
