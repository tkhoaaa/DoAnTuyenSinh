import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaCheck,
  FaTimes,
  FaClock,
  FaDownload,
  FaEdit,
  FaTrash,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaCalendar
} from 'react-icons/fa';

const QuanLyHoSo = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      studentName: "Nguyễn Văn An",
      email: "nguyenvanan@email.com",
      phone: "0912345678",
      cccd: "123456789012",
      major: "Công nghệ Thông tin",
      admissionMethod: "Học bạ THPT",
      submittedAt: "2025-01-23 14:30",
      status: "pending",
      gpa: 8.5,
      documents: ["Học bạ", "CCCD", "Giấy khai sinh"],
      assignedTo: null
    },
    {
      id: 2,
      studentName: "Trần Thị Bình",
      email: "tranthibinh@email.com",
      phone: "0987654321",
      cccd: "987654321098",
      major: "Quản trị Kinh doanh",
      admissionMethod: "Điểm thi THPT",
      submittedAt: "2025-01-23 13:15",
      status: "approved",
      gpa: 9.2,
      documents: ["Học bạ", "CCCD", "Giấy khai sinh", "Giấy chứng nhận"],
      assignedTo: "Nguyễn Minh"
    },
    {
      id: 3,
      studentName: "Lê Minh Cường",
      email: "leminhcuong@email.com",
      phone: "0911223344",
      cccd: "456789123456",
      major: "Kỹ thuật Cơ khí",
      admissionMethod: "Học bạ THPT",
      submittedAt: "2025-01-23 12:45",
      status: "pending",
      gpa: 7.8,
      documents: ["Học bạ", "CCCD"],
      assignedTo: "Phạm Lan"
    },
    {
      id: 4,
      studentName: "Phan Thị Dung",
      email: "phanthidung@email.com",
      phone: "0933556677",
      cccd: "789123456789",
      major: "Kế toán",
      admissionMethod: "Điểm ĐGNL",
      submittedAt: "2025-01-23 11:20",
      status: "rejected",
      gpa: 6.5,
      documents: ["Học bạ", "CCCD", "Giấy khai sinh"],
      assignedTo: "Lê Hương"
    }
  ]);

  const [filteredApplications, setFilteredApplications] = useState(applications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [majorFilter, setMajorFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filter applications
  useEffect(() => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.cccd.includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (majorFilter !== "all") {
      filtered = filtered.filter(app => app.major === majorFilter);
    }

    setFilteredApplications(filtered);
  }, [searchTerm, statusFilter, majorFilter, applications]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ duyệt', icon: FaClock },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Đã duyệt', icon: FaCheck },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Từ chối', icon: FaTimes }
    };
    
    const config = statusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="mr-1" />
        {config.label}
      </span>
    );
  };

  const handleStatusChange = (applicationId, newStatus) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailModal(true);
  };

  const majors = [...new Set(applications.map(app => app.major))];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản Lý Hồ Sơ Đăng Ký</h1>
        <p className="text-gray-600">Quản lý và xử lý các hồ sơ xét tuyển của thí sinh</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, CCCD..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ duyệt</option>
            <option value="approved">Đã duyệt</option>
            <option value="rejected">Từ chối</option>
          </select>

          {/* Major Filter */}
          <select
            value={majorFilter}
            onChange={(e) => setMajorFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả ngành</option>
            {majors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>

          {/* Export Button */}
          <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <FaDownload className="mr-2" />
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng hồ sơ</p>
              <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
            </div>
            <FaUser className="text-blue-500 text-xl" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Chờ duyệt</p>
              <p className="text-2xl font-bold text-yellow-600">
                {applications.filter(app => app.status === 'pending').length}
              </p>
            </div>
            <FaClock className="text-yellow-500 text-xl" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã duyệt</p>
              <p className="text-2xl font-bold text-green-600">
                {applications.filter(app => app.status === 'approved').length}
              </p>
            </div>
            <FaCheck className="text-green-500 text-xl" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Từ chối</p>
              <p className="text-2xl font-bold text-red-600">
                {applications.filter(app => app.status === 'rejected').length}
              </p>
            </div>
            <FaTimes className="text-red-500 text-xl" />
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thí sinh
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngành đăng ký
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phương thức
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm TB
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phụ trách
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <motion.tr
                  key={application.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {application.studentName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.email}
                      </div>
                      <div className="text-xs text-gray-400">
                        CCCD: {application.cccd}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.major}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.admissionMethod}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.gpa}/10</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(application.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {application.assignedTo || 'Chưa phân công'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(application)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Xem chi tiết"
                      >
                        <FaEye />
                      </button>
                      {application.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(application.id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                            title="Duyệt hồ sơ"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleStatusChange(application.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                            title="Từ chối hồ sơ"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowDetailModal(false)}></div>
            <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Chi tiết hồ sơ - {selectedApplication.studentName}
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Họ tên</label>
                    <p className="text-sm text-gray-900">{selectedApplication.studentName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                    <p className="text-sm text-gray-900">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CCCD</label>
                    <p className="text-sm text-gray-900">{selectedApplication.cccd}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ngành đăng ký</label>
                    <p className="text-sm text-gray-900">{selectedApplication.major}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phương thức xét tuyển</label>
                    <p className="text-sm text-gray-900">{selectedApplication.admissionMethod}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Điểm trung bình</label>
                    <p className="text-sm text-gray-900">{selectedApplication.gpa}/10</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                    {getStatusBadge(selectedApplication.status)}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Giấy tờ đính kèm</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.documents.map((doc, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Đóng
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Tải xuống hồ sơ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyHoSo; 