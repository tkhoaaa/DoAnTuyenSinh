import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaQuestionCircle,
  FaSearch,
  FaLightbulb,
} from "react-icons/fa";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const faqData = [
  {
    category: "Tuyển sinh",
    questions: [
      {
        question: "HUTECH có bao nhiêu phương thức xét tuyển?",
        answer:
          "HUTECH có 4 phương thức xét tuyển: Xét tuyển học bạ THPT, Xét tuyển kết quả thi THPT Quốc gia, Xét tuyển kết quả thi đánh giá năng lực, và Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      },
      {
        question: "Thời gian nhận hồ sơ xét tuyển khi nào?",
        answer:
          "Thời gian nhận hồ sơ xét tuyển thường bắt đầu từ tháng 3 và kéo dài đến tháng 8 hàng năm. Bạn có thể theo dõi thông tin chi tiết trên website chính thức của trường.",
      },
      {
        question: "HUTECH có bao nhiêu ngành đào tạo?",
        answer:
          "HUTECH có hơn 50 ngành đào tạo thuộc các lĩnh vực: Công nghệ thông tin, Kinh tế - Quản trị, Kỹ thuật, Ngoại ngữ, Du lịch, Y tế và nhiều ngành khác.",
      },
    ],
  },
  {
    category: "Học phí & Học bổng",
    questions: [
      {
        question: "Học phí tại HUTECH như thế nào?",
        answer:
          "Học phí tại HUTECH được tính theo tín chỉ và thay đổi theo từng ngành học. Mức học phí trung bình từ 15-25 triệu đồng/năm học. Trường có nhiều chính sách hỗ trợ học phí cho sinh viên.",
      },
      {
        question: "Có những loại học bổng nào?",
        answer:
          "HUTECH có nhiều loại học bổng: Học bổng khuyến khích học tập, Học bổng tài năng, Học bổng hỗ trợ sinh viên nghèo, Học bổng từ các doanh nghiệp đối tác.",
      },
      {
        question: "Làm thế nào để đăng ký học bổng?",
        answer:
          "Bạn có thể đăng ký học bổng thông qua form online trên website hoặc liên hệ trực tiếp với phòng Công tác sinh viên để được hướng dẫn chi tiết.",
      },
    ],
  },
  {
    category: "Cơ sở vật chất",
    questions: [
      {
        question: "HUTECH có những cơ sở nào?",
        answer:
          "HUTECH có 3 cơ sở chính tại TP.HCM: Cơ sở 1 (475A Điện Biên Phủ, Q.Bình Thạnh), Cơ sở 2 (31/36 Ung Văn Khiêm, Q.Bình Thạnh), và Cơ sở 3 (288 Đỗ Xuân Hợp, Q.9).",
      },
      {
        question: "Thư viện có đầy đủ tài liệu không?",
        answer:
          "Thư viện HUTECH có hơn 100,000 đầu sách, tài liệu điện tử, và các cơ sở dữ liệu trực tuyến. Sinh viên có thể truy cập 24/7 thông qua hệ thống thư viện số.",
      },
      {
        question: "Ký túc xá có sẵn cho sinh viên không?",
        answer:
          "HUTECH có ký túc xá với sức chứa hơn 2,000 sinh viên. Ký túc xá được trang bị đầy đủ tiện nghi với mức phí hợp lý. Sinh viên có thể đăng ký từ năm nhất.",
      },
    ],
  },
];

function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const toggleItem = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const filteredData = faqData
    .filter(
      (category) =>
        activeCategory === "Tất cả" || category.category === activeCategory
    )
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const allCategories = ["Tất cả", ...faqData.map((cat) => cat.category)];

  return (
    <>
      <SEO
        title="FAQ - Câu hỏi thường gặp"
        description="Tìm hiểu các câu hỏi thường gặp về tuyển sinh, học phí, học bổng và cơ sở vật chất tại HUTECH."
        keywords="FAQ, câu hỏi thường gặp, tuyển sinh HUTECH, học phí, học bổng"
        canonical="/faq"
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
                <FaQuestionCircle className="text-white text-3xl" />
              </motion.div>

              <h1 className="text-5xl font-bold text-white mb-4">
                Câu hỏi thường gặp
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Tìm câu trả lời cho những thắc mắc phổ biến về tuyển sinh, học
                phí, học bổng và cơ sở vật chất tại HUTECH
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Search & Filter */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="py-8 bg-white/50 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Search */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Tìm kiếm câu hỏi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={FaSearch}
                  className="w-full text-lg"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {allCategories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      activeCategory === category ? "gradient" : "outline"
                    }
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className={
                      activeCategory === category
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : "border-gray-300 text-gray-700 hover:border-blue-600"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Content */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="py-16"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {filteredData.length === 0 ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <FaLightbulb className="text-6xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">
                    Không tìm thấy câu hỏi phù hợp
                  </h3>
                  <p className="text-gray-500">
                    Hãy thử tìm kiếm với từ khóa khác hoặc liên hệ với chúng tôi
                    để được hỗ trợ
                  </p>
                </motion.div>
              ) : (
                <motion.div
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
                  className="space-y-8"
                >
                  {filteredData.map((category, categoryIndex) => (
                    <motion.div
                      key={category.category}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8"
                    >
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">
                            {categoryIndex + 1}
                          </span>
                        </div>
                        {category.category}
                      </h2>

                      <div className="space-y-4">
                        {category.questions.map((item, index) => {
                          const itemIndex = `${categoryIndex}-${index}`;
                          const isExpanded = expandedItems.has(itemIndex);

                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                              <button
                                onClick={() => toggleItem(itemIndex)}
                                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                              >
                                <span className="font-semibold text-gray-800 pr-4">
                                  {item.question}
                                </span>
                                <motion.div
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <FaChevronDown className="text-gray-500 flex-shrink-0" />
                                </motion.div>
                              </button>

                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-6 py-4 bg-white text-gray-700 leading-relaxed">
                                      {item.answer}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Vẫn chưa tìm thấy câu trả lời?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Đội ngũ tư vấn của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="gradient"
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-blue-900 font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Liên hệ tư vấn
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Gửi câu hỏi mới
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
}

export default FAQ;
