import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCog, FaSave, FaUndo, FaUpload, FaBell, FaUsers, FaBuilding, 
  FaEnvelope, FaPhone, FaGlobe, FaFileUpload, FaTrash, FaEdit,
  FaCheckCircle, FaTimesCircle, FaExclamationTriangle
} from 'react-icons/fa';
import { useUser } from '../../accounts/UserContext';
import { buildApiUrl } from '../../config/apiConfig';

const CaiDat = () => {
  const { isDemoMode } = useUser();
  const [activeTab, setActiveTab] = useState('system');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // System Information
  const [systemInfo, setSystemInfo] = useState({
    schoolName: 'Trường Đại học Công nghệ TP.HCM (HUTECH)',
    schoolCode: 'HUTECH',
    contactEmail: 'tuyensinh@hutech.edu.vn',
    contactPhone: '028 5445 7777',
    website: 'https://hutech.edu.vn',
    address: '475A Điện Biên Phủ, P.25, Q.Bình Thạnh, TP.HCM',
    description: 'Trường Đại học Công nghệ TP.HCM - HUTECH là một trong những trường đại học hàng đầu về đào tạo công nghệ và kinh tế tại Việt Nam.'
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    applicationSubmitted: true,
    applicationStatusChanged: true,
    newUserRegistered: false,
    systemAlerts: true,
    dailyReports: false,
    weeklyReports: true,
    emailTemplate: 'default'
  });

  // File Upload Settings
  const [uploadSettings, setUploadSettings] = useState({
    maxFileSize: 10, // MB
    allowedExtensions: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
    avatarMaxSize: 5, // MB
    documentMaxSize: 20, // MB
    autoCompress: true,
    storagePath: '/uploads',
    backupEnabled: true
  });



  // User Management State
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersPagination, setUsersPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });
  const [usersSearch, setUsersSearch] = useState('');
  const [usersStatus, setUsersStatus] = useState('all');



  useEffect(() => {
    if (isDemoMode) {
      // Use demo data
      return;
    }
    // TODO: Fetch settings from API
    fetchSettings();
  }, [isDemoMode]);

  // Fetch users data
  useEffect(() => {
    if (activeTab === 'users' && !isDemoMode) {
      fetchUsers();
    }
  }, [activeTab, usersPagination.page, usersPagination.limit, usersSearch, usersStatus, isDemoMode]);

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      const params = new URLSearchParams({
        page: usersPagination.page,
        limit: usersPagination.limit,
        search: usersSearch,
        status: usersStatus
      });
      
      const response = await fetch(`${buildApiUrl('/api/admin/users')}?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data.users);
        setUsersPagination({
          page: data.data.page,
          limit: data.data.limit,
          total: data.data.total,
          totalPages: data.data.totalPages
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setUsersLoading(false);
    }
  };

  const toggleUserStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`${buildApiUrl('/api/admin/users')}/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });

      const data = await response.json();
      if (data.success) {
        fetchUsers();
      } else {
        alert(data.message || 'Lỗi khi cập nhật trạng thái');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Lỗi khi cập nhật trạng thái');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa user này?')) {
      return;
    }

    try {
      const response = await fetch(`${buildApiUrl('/api/admin/users')}/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        fetchUsers();
      } else {
        alert(data.message || 'Lỗi khi xóa user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Lỗi khi xóa user');
    }
  };

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl('/api/admin/settings'));
      const data = await response.json();
      
      if (data.success) {
        setSystemInfo(data.data.systemInfo);
        setNotificationSettings(data.data.notificationSettings);
        setUploadSettings(data.data.uploadSettings);
      } else {
        // Fallback to demo data
        setSystemInfo({
          schoolName: 'Trường Đại học Công nghệ TP.HCM (HUTECH)',
          schoolCode: 'HUTECH',
          contactEmail: 'tuyensinh@hutech.edu.vn',
          contactPhone: '028 5445 7777',
          website: 'https://hutech.edu.vn',
          address: '475A Điện Biên Phủ, P.25, Q.Bình Thạnh, TP.HCM',
          description: 'Trường Đại học Công nghệ TP.HCM - HUTECH là một trong những trường đại học hàng đầu về đào tạo công nghệ và kinh tế tại Việt Nam.'
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      // Fallback to demo data
      setSystemInfo({
        schoolName: 'Trường Đại học Công nghệ TP.HCM (HUTECH)',
        schoolCode: 'HUTECH',
        contactEmail: 'tuyensinh@hutech.edu.vn',
        contactPhone: '028 5445 7777',
        website: 'https://hutech.edu.vn',
        address: '475A Điện Biên Phủ, P.25, Q.Bình Thạnh, TP.HCM',
        description: 'Trường Đại học Công nghệ TP.HCM - HUTECH là một trong những trường đại học hàng đầu về đào tạo công nghệ và kinh tế tại Việt Nam.'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (section) => {
    try {
      setLoading(true);
      setSaveStatus('saving');

      const response = await fetch(buildApiUrl('/api/admin/settings'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data: getSectionData(section) })
      });

      const data = await response.json();
      if (data.success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        throw new Error(data.message || 'Lỗi khi lưu cài đặt');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const getSectionData = (section) => {
    switch (section) {
      case 'system': return systemInfo;
      case 'notifications': return notificationSettings;
      case 'upload': return uploadSettings;
      default: return {};
    }
  };

  const tabs = [
    { id: 'system', name: 'Thông tin hệ thống', icon: FaBuilding },
    { id: 'users', name: 'Quản lý Users', icon: FaUsers },
    { id: 'notifications', name: 'Thông báo', icon: FaBell },
    { id: 'upload', name: 'Cấu hình Upload', icon: FaUpload }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-12 bg-gray-300 rounded"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <FaCog className="text-3xl text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
          </div>
          <p className="text-gray-600">
            Quản lý cấu hình hệ thống, tài khoản admin và các thiết lập khác
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          {/* System Information */}
          {activeTab === 'system' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Thông tin hệ thống</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => saveSettings('system')}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <FaSave />
                    Lưu thay đổi
                  </button>
                  <button
                    onClick={() => fetchSettings()}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <FaUndo />
                    Khôi phục
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaBuilding className="inline mr-2" />
                    Tên trường
                  </label>
                  <input
                    type="text"
                    value={systemInfo.schoolName}
                    onChange={(e) => setSystemInfo({...systemInfo, schoolName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã trường
                  </label>
                  <input
                    type="text"
                    value={systemInfo.schoolCode}
                    onChange={(e) => setSystemInfo({...systemInfo, schoolCode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2" />
                    Email liên hệ
                  </label>
                  <input
                    type="email"
                    value={systemInfo.contactEmail}
                    onChange={(e) => setSystemInfo({...systemInfo, contactEmail: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaPhone className="inline mr-2" />
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={systemInfo.contactPhone}
                    onChange={(e) => setSystemInfo({...systemInfo, contactPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaGlobe className="inline mr-2" />
                    Website
                  </label>
                  <input
                    type="url"
                    value={systemInfo.website}
                    onChange={(e) => setSystemInfo({...systemInfo, website: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={systemInfo.address}
                    onChange={(e) => setSystemInfo({...systemInfo, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    value={systemInfo.description}
                    onChange={(e) => setSystemInfo({...systemInfo, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* User Management */}
          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Quản lý Users</h2>
              </div>

              {/* Search and Filter */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm user..."
                    value={usersSearch}
                    onChange={(e) => setUsersSearch(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    value={usersStatus}
                    onChange={(e) => setUsersStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                </div>
                <div>
                  <select
                    value={usersPagination.limit}
                    onChange={(e) => setUsersPagination({...usersPagination, page: 1, limit: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={10}>10 items/page</option>
                    <option value={20}>20 items/page</option>
                    <option value={50}>50 items/page</option>
                  </select>
                </div>
              </div>

              {/* Users Table */}
              {usersLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Đang tải...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Tài khoản</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Số điện thoại</th>
                        <th className="px-6 py-3">Vai trò</th>
                        <th className="px-6 py-3">Trạng thái</th>
                        <th className="px-6 py-3">Ngày tạo</th>
                        <th className="px-6 py-3">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {user.username}
                          </td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">{user.phone}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.role === 'admin' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role === 'admin' ? 'Admin' : 'User'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.isActive ? 'Hoạt động' : 'Không hoạt động'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => toggleUserStatus(user.id, user.isActive)}
                                className={`p-1 rounded ${
                                  user.isActive 
                                    ? 'text-red-600 hover:bg-red-100' 
                                    : 'text-green-600 hover:bg-green-100'
                                }`}
                                title={user.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
                              >
                                {user.isActive ? <FaTimesCircle /> : <FaCheckCircle />}
                              </button>
                              <button
                                onClick={() => deleteUser(user.id)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                                title="Xóa"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {usersPagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-700">
                    Hiển thị {((usersPagination.page - 1) * usersPagination.limit) + 1} đến{' '}
                    {Math.min(usersPagination.page * usersPagination.limit, usersPagination.total)} trong tổng số{' '}
                    {usersPagination.total} users
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUsersPagination({...usersPagination, page: usersPagination.page - 1})}
                      disabled={usersPagination.page === 1}
                      className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Trước
                    </button>
                    <span className="px-3 py-1 text-sm">
                      Trang {usersPagination.page} / {usersPagination.totalPages}
                    </span>
                    <button
                      onClick={() => setUsersPagination({...usersPagination, page: usersPagination.page + 1})}
                      disabled={usersPagination.page === usersPagination.totalPages}
                      className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sau
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Cấu hình thông báo</h2>
                <button
                  onClick={() => saveSettings('notifications')}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <FaSave />
                  Lưu thay đổi
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Thông báo Email</h3>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Bật thông báo email</p>
                      <p className="text-sm text-gray-600">Gửi thông báo qua email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings, 
                          emailNotifications: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Hồ sơ mới được nộp</p>
                      <p className="text-sm text-gray-600">Thông báo khi có hồ sơ mới</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.applicationSubmitted}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings, 
                          applicationSubmitted: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Trạng thái hồ sơ thay đổi</p>
                      <p className="text-sm text-gray-600">Thông báo khi trạng thái hồ sơ thay đổi</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.applicationStatusChanged}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings, 
                          applicationStatusChanged: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Báo cáo tự động</h3>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Báo cáo hàng ngày</p>
                      <p className="text-sm text-gray-600">Gửi báo cáo thống kê hàng ngày</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.dailyReports}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings, 
                          dailyReports: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Báo cáo hàng tuần</p>
                      <p className="text-sm text-gray-600">Gửi báo cáo thống kê hàng tuần</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklyReports}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings, 
                          weeklyReports: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template email
                    </label>
                    <select
                      value={notificationSettings.emailTemplate}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings, 
                        emailTemplate: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="default">Mặc định</option>
                      <option value="custom">Tùy chỉnh</option>
                      <option value="minimal">Tối giản</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upload Settings */}
          {activeTab === 'upload' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Cấu hình Upload</h2>
                <button
                  onClick={() => saveSettings('upload')}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <FaSave />
                  Lưu thay đổi
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Giới hạn kích thước</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kích thước file tối đa (MB)
                    </label>
                    <input
                      type="number"
                      value={uploadSettings.maxFileSize}
                      onChange={(e) => setUploadSettings({
                        ...uploadSettings, 
                        maxFileSize: parseInt(e.target.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kích thước avatar tối đa (MB)
                    </label>
                    <input
                      type="number"
                      value={uploadSettings.avatarMaxSize}
                      onChange={(e) => setUploadSettings({
                        ...uploadSettings, 
                        avatarMaxSize: parseInt(e.target.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kích thước tài liệu tối đa (MB)
                    </label>
                    <input
                      type="number"
                      value={uploadSettings.documentMaxSize}
                      onChange={(e) => setUploadSettings({
                        ...uploadSettings, 
                        documentMaxSize: parseInt(e.target.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Cấu hình khác</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Định dạng file được phép
                    </label>
                    <input
                      type="text"
                      value={uploadSettings.allowedExtensions.join(', ')}
                      onChange={(e) => setUploadSettings({
                        ...uploadSettings, 
                        allowedExtensions: e.target.value.split(',').map(ext => ext.trim())
                      })}
                      placeholder="jpg, jpeg, png, pdf, doc, docx"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thư mục lưu trữ
                    </label>
                    <input
                      type="text"
                      value={uploadSettings.storagePath}
                      onChange={(e) => setUploadSettings({
                        ...uploadSettings, 
                        storagePath: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Tự động nén ảnh</p>
                      <p className="text-sm text-gray-600">Nén ảnh để tiết kiệm dung lượng</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={uploadSettings.autoCompress}
                        onChange={(e) => setUploadSettings({
                          ...uploadSettings, 
                          autoCompress: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Sao lưu tự động</p>
                      <p className="text-sm text-gray-600">Tự động sao lưu file upload</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={uploadSettings.backupEnabled}
                        onChange={(e) => setUploadSettings({
                          ...uploadSettings, 
                          backupEnabled: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Save Status */}
        {saveStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
              saveStatus === 'success' 
                ? 'bg-green-500 text-white' 
                : saveStatus === 'error' 
                ? 'bg-red-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              {saveStatus === 'success' && <FaCheckCircle />}
              {saveStatus === 'error' && <FaExclamationTriangle />}
              {saveStatus === 'saving' && <FaSave className="animate-spin" />}
              <span>
                {saveStatus === 'success' && 'Lưu thành công!'}
                {saveStatus === 'error' && 'Lỗi khi lưu!'}
                {saveStatus === 'saving' && 'Đang lưu...'}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CaiDat; 