import React, { useState, useEffect } from 'react';
import { useUser } from '../accounts/UserContext';
import { FaClock, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaDesktop, FaMobile, FaTablet, FaLaptop } from 'react-icons/fa';
import axios from 'axios';

const ActivityLog = () => {
  const { user } = useUser();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user/activity-logs?limit=100');
      if (response.data.success) {
        setActivities(response.data.data);
      }
    } catch (err) {
      setError('Lỗi khi tải lịch sử hoạt động');
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'failed':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getDeviceIcon = (deviceInfo) => {
    if (!deviceInfo) return <FaLaptop className="text-gray-500" />;
    
    switch (deviceInfo.deviceType) {
      case 'desktop': return <FaDesktop className="text-blue-500" />;
      case 'mobile': return <FaMobile className="text-green-500" />;
      case 'tablet': return <FaTablet className="text-purple-500" />;
      default: return <FaLaptop className="text-gray-500" />;
    }
  };

  const getActionLabel = (action) => {
    const actionLabels = {
      'login': 'Đăng nhập',
      'logout': 'Đăng xuất',
      'register': 'Đăng ký',
      'password_change': 'Đổi mật khẩu',
      'email_change': 'Đổi email',
      'profile_update': 'Cập nhật hồ sơ',
      'avatar_update': 'Cập nhật avatar',
      'application_submit': 'Nộp hồ sơ xét tuyển',
      'application_status_update': 'Cập nhật trạng thái hồ sơ',
      'consultation_request': 'Yêu cầu tư vấn',
      'scholarship_apply': 'Đăng ký học bổng',
      'device_deactivated': 'Vô hiệu hóa thiết bị',
      'password_reset_request': 'Yêu cầu đặt lại mật khẩu',
      'password_reset_complete': 'Đặt lại mật khẩu thành công'
    };
    return actionLabels[action] || action;
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    if (diffInMinutes < 43200) return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
    return `${Math.floor(diffInMinutes / 43200)} tháng trước`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.status === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Lịch sử hoạt động
        </h3>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="all">Tất cả</option>
            <option value="success">Thành công</option>
            <option value="warning">Cảnh báo</option>
            <option value="failed">Thất bại</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(activity.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {getActionLabel(activity.action)}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {getTimeAgo(activity.created_at)}
                  </span>
                </div>
                
                {activity.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {activity.description}
                  </p>
                )}
                
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-500">
                  {activity.device_info && (
                    <div className="flex items-center space-x-1">
                      {getDeviceIcon(activity.device_info)}
                      <span>{activity.device_info.browser} trên {activity.device_info.os}</span>
                    </div>
                  )}
                  
                  {activity.ip_address && (
                    <div className="flex items-center space-x-1">
                      <span>IP: {activity.ip_address}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-2 text-xs text-gray-400 dark:text-gray-600">
                  {formatDate(activity.created_at)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {filter === 'all' ? 'Không có hoạt động nào được ghi nhận' : `Không có hoạt động ${filter} nào`}
        </div>
      )}
    </div>
  );
};

export default ActivityLog; 