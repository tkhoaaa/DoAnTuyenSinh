import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaEye,
  FaQuestionCircle,
  FaSave,
  FaTimes
} from 'react-icons/fa';

const QuanLyFAQ = () => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "HUTECHS tuyển sinh những ngành nào?",
      answer: "Trường tuyển sinh đa ngành với 61 ngành đào tạo từ trình độ đại học đến tiến sĩ, chi tiết xem tại mục Thông tin tuyển sinh.",
      category: "Tuyển sinh",
      isActive: true,
      createdAt: "2025-01-20",
      views: 245
    },
    {
      id: 2,
      question: "Học phí năm 2025 là bao nhiêu?",
      answer: "Học phí ổn định với nhiều chính sách học bổng hấp dẫn, tham khảo chi tiết tại website chính thức.",
      category: "Học phí",
      isActive: true,
      createdAt: "2025-01-19",
      views: 189
    },
    {
      id: 3,
      question: "Có những loại học bổng nào?",
      answer: "HUTECHS có nhiều loại học bổng: học bổng tài năng, học bổng khuyến khích, học bổng hỗ trợ và các học bổng đặc biệt khác.",
      category: "Học bổng",
      isActive: true,
      createdAt: "2025-01-18",
      views: 167
    },
    {
      id: 4,
      question: "Thời gian nộp hồ sơ xét tuyển?",
      answer: "Thời gian nộp hồ sơ từ tháng 3 đến tháng 8 năm 2025. Thí sinh có thể nộp hồ sơ trực tuyến qua website hoặc trực tiếp tại trường.",
      category: "Hồ sơ",
      isActive: true,
      createdAt: "2025-01-17",
      views: 298
    }
  ]);

  const [categories] = useState([
    "Tuyển sinh",
    "Học phí", 
    "Học bổng",
    "Chương trình đào tạo",
    "Hồ sơ",
    "Khác"
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "Tuyển sinh",
    isActive: true
  });

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || faq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddNew = () => {
    setEditingFAQ(null);
    setFormData({
      question: "",
      answer: "",
      category: "Tuyển sinh",
      isActive: true
    });
    setShowModal(true);
  };

  const handleEdit = (faq) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      isActive: faq.isActive
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingFAQ) {
      // Update existing FAQ
      setFaqs(prev => prev.map(faq => 
        faq.id === editingFAQ.id 
          ? { ...faq, ...formData }
          : faq
      ));
    } else {
      // Add new FAQ
      const newFAQ = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        views: 0
      };
      setFaqs(prev => [newFAQ, ...prev]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa câu hỏi này?")) {
      setFaqs(prev => prev.filter(faq => faq.id !== id));
    }
  };

  const toggleActive = (id) => {
    setFaqs(prev => prev.map(faq => 
      faq.id === id 
        ? { ...faq, isActive: !faq.isActive }
        : faq
    ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản Lý FAQ</h1>
            <p className="text-gray-600">Quản lý câu hỏi thường gặp trên website</p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            Thêm câu hỏi mới
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả chủ đề</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Stats */}
          <div className="flex items-center text-sm text-gray-600">
            <FaQuestionCircle className="mr-2" />
            Tổng cộng: {faqs.length} câu hỏi
          </div>
        </div>
      </div>

      {/* FAQ Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng câu hỏi</p>
              <p className="text-2xl font-bold text-gray-900">{faqs.length}</p>
            </div>
            <FaQuestionCircle className="text-blue-500 text-xl" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang hiển thị</p>
              <p className="text-2xl font-bold text-green-600">
                {faqs.filter(faq => faq.isActive).length}
              </p>
            </div>
            <FaEye className="text-green-500 text-xl" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng lượt xem</p>
              <p className="text-2xl font-bold text-purple-600">
                {faqs.reduce((total, faq) => total + faq.views, 0)}
              </p>
            </div>
            <FaEye className="text-purple-500 text-xl" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Chủ đề</p>
              <p className="text-2xl font-bold text-orange-600">{categories.length}</p>
            </div>
            <FaFilter className="text-orange-500 text-xl" />
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="divide-y divide-gray-200">
          {filteredFAQs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full mr-3 ${
                      faq.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {faq.isActive ? 'Hiển thị' : 'Ẩn'}
                    </span>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {faq.category}
                    </span>
                    <span className="ml-auto text-xs text-gray-500">
                      {faq.views} lượt xem
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  
                  <p className="text-gray-600 mb-3">
                    {faq.answer.length > 200 
                      ? `${faq.answer.substring(0, 200)}...` 
                      : faq.answer
                    }
                  </p>
                  
                  <div className="text-xs text-gray-500">
                    Tạo ngày: {faq.createdAt}
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => toggleActive(faq.id)}
                    className={`p-2 rounded ${
                      faq.isActive 
                        ? 'text-green-600 hover:bg-green-100' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    title={faq.isActive ? 'Ẩn câu hỏi' : 'Hiển thị câu hỏi'}
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEdit(faq)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                    title="Chỉnh sửa"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded"
                    title="Xóa"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowModal(false)}></div>
            <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingFAQ ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Câu hỏi
                  </label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setFormData({...formData, question: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập câu hỏi..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Câu trả lời
                  </label>
                  <textarea
                    value={formData.answer}
                    onChange={(e) => setFormData({...formData, answer: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập câu trả lời..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chủ đề
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trạng thái
                    </label>
                    <select
                      value={formData.isActive}
                      onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={true}>Hiển thị</option>
                      <option value={false}>Ẩn</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <FaSave className="mr-2" />
                  {editingFAQ ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyFAQ; 