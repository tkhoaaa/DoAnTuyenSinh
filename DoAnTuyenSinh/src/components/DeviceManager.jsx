import React, { useState, useEffect } from 'react';
import { useUser } from '../accounts/UserContext';
import { FaDesktop, FaMobile, FaTablet, FaLaptop, FaTrash, FaSignOutAlt, FaShieldAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

const DeviceManager = () => {
  const { user } = useUser();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user/devices');
      if (response.data.success) {
        setDevices(response.data.data);
      }
    } catch (err) {
      setError('Lỗi khi tải danh sách thiết bị');
      console.error('Error fetching devices:', err);
    } finally {
      setLoading(false);
    }
  };

  const deactivateDevice = async (sessionToken) => {
    try {
      const response = await axios.delete(`/api/user/devices/${sessionToken}`);
      if (response.data.success) {
        setDevices(devices.filter(device => device.session_token !== sessionToken));
      }
    } catch (err) {
      setError('Lỗi khi vô hiệu hóa thiết bị');
      console.error('Error deactivating device:', err);
    }
  };

  const deactivateOtherDevices = async () => {
    try {
      const response = await axios.delete('/api/user/devices');
      if (response.data.success) {
        // Chỉ giữ lại thiết bị hiện tại
        setDevices(devices.filter(device => device.is_active));
      }
    } catch (err) {
      setError('Lỗi khi vô hiệu hóa thiết bị khác');
      console.error('Error deactivating other devices:', err);
    }
  };

  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case 'desktop': return <FaDesktop className="text-blue-500" />;
      case 'mobile': return <FaMobile className="text-green-500" />;
      case 'tablet': return <FaTablet className="text-purple-500" />;
      default: return <FaLaptop className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
  };

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
          Thiết bị đăng nhập
        </h3>
        {devices.length > 1 && (
          <button
            onClick={deactivateOtherDevices}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
          >
            <FaSignOutAlt />
            Vô hiệu hóa tất cả thiết bị khác
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {devices.map((device) => (
          <div
            key={device.id}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              device.is_active
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">
                  {getDeviceIcon(device.device_type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {device.device_name || `${device.os} - ${device.browser}`}
                    </h4>
                    {device.is_active && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        <FaShieldAlt className="mr-1" />
                        Hoạt động
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {device.browser} trên {device.os}
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500 mt-2">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      {device.ip_address}
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-1" />
                      {getTimeAgo(device.last_activity)}
                    </div>
                  </div>
                </div>
              </div>
              
              {device.is_active && (
                <button
                  onClick={() => deactivateDevice(device.session_token)}
                  className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  title="Vô hiệu hóa thiết bị"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {devices.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Không có thiết bị nào được ghi nhận
        </div>
      )}
    </div>
  );
};

export default DeviceManager; 