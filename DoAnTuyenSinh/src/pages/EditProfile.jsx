import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../accounts/UserContext";
import { FaUser, FaEnvelope, FaLock, FaCamera, FaSave, FaTimes } from "react-icons/fa";
import apiClient from "../utils/apiClient";
import ThemeToggle from "../components/ThemeToggle";
import DeviceManager from "../components/DeviceManager";
import ActivityLog from "../components/ActivityLog";

function EditProfile() {
  const { user, username, role, login } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  // Fallback để hiển thị tên người dùng
  const displayName = username || user?.username || user?.name || user?.email || "Người dùng";
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [social, setSocial] = useState(user?.social || "");
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user) {
      // Tạo full URL cho avatar nếu có
      const avatarUrl = user.avatar 
        ? (user.avatar.startsWith('http') ? user.avatar : `http://localhost:3001${user.avatar}`)
        : "";
      setAvatar(avatarUrl);
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setBio(user.bio || "");
      setSocial(user.social || "");
    }
  }, [user]);

  // Debug: log để kiểm tra giá trị
  console.log("EditProfile - User context:", { user, username, role, displayName });

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      
      // Upload file
      const uploadRes = await apiClient.post("/user/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (uploadRes.success) {
        // Tạo full URL cho avatar
        const fullAvatarUrl = `http://localhost:3001${uploadRes.url}`;
        console.log("Avatar upload success:", {
          originalUrl: uploadRes.url,
          fullUrl: fullAvatarUrl,
          user: user.id
        });
        setAvatar(fullAvatarUrl);
        
        // Update avatar URL in database
        await apiClient.put("/user/update-avatar", {
          user_id: user.id,
          avatar_url: uploadRes.url, // Lưu relative path vào DB
        });
        
        // Cập nhật avatar trong UserContext
        const updatedUserData = {
          ...user,
          avatar: fullAvatarUrl
        };
        login(user.id, role, username, updatedUserData);
        
        setMessage("Cập nhật avatar thành công!");
      } else {
        setError("Lỗi khi upload ảnh lên server");
      }
    } catch (err) {
      console.error("Avatar upload error:", err);
      setError("Lỗi khi cập nhật avatar: " + (err.message || "Không xác định"));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await apiClient.put("/user/update-email", {
        user_id: user.id,
        email: email,
      });
      setMessage("Cập nhật email thành công!");
    } catch (err) {
      console.error("Email update error:", err);
      setError("Lỗi khi cập nhật email: " + (err.message || "Không xác định"));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await apiClient.put("/user/update-password", {
        user_id: user.id,
        current_password: currentPassword,
        new_password: newPassword,
      });
      setMessage("Cập nhật mật khẩu thành công!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Password update error:", err);
      setError("Lỗi khi cập nhật mật khẩu: " + (err.message || "Không xác định"));
    } finally {
      setLoading(false);
    }
  };

  const handleProfileInfoChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await apiClient.put("/user/update-profile-info", {
        user_id: user.id,
        phone,
        bio,
        social,
      });
      setMessage("Cập nhật thông tin cá nhân thành công!");
    } catch (err) {
      console.error("Profile update error:", err);
      setError("Lỗi khi cập nhật thông tin cá nhân: " + (err.message || "Không xác định"));
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Hồ sơ cá nhân', icon: <FaUser /> },
    { id: 'security', label: 'Bảo mật', icon: <FaLock /> },
    { id: 'devices', label: 'Thiết bị', icon: <FaCamera /> },
    { id: 'activity', label: 'Hoạt động', icon: <FaEnvelope /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Avatar section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Ảnh đại diện</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {console.log("Rendering avatar with URL:", avatar)}
                  <img
                    src={avatar || "https://via.placeholder.com/100x100?text=Avatar"}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                    onError={(e) => {
                      console.error("Avatar image failed to load:", avatar);
                      e.target.src = "https://via.placeholder.com/100x100?text=Avatar";
                    }}
                  />
                  <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                    <FaCamera className="text-sm" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cập nhật ảnh đại diện của bạn
                  </p>
                </div>
              </div>
            </div>

            {/* Profile info section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Thông tin cá nhân</h3>
              <form onSubmit={handleProfileInfoChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tên người dùng
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                    placeholder="Tên người dùng"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Tên người dùng không thể thay đổi
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Giới thiệu
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Giới thiệu về bản thân"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mạng xã hội
                  </label>
                  <input
                    type="url"
                    value={social}
                    onChange={(e) => setSocial(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Link mạng xã hội (Facebook, LinkedIn...)"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center gap-2"
                >
                  <FaSave />
                  {loading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </form>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            {/* Theme toggle */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Giao diện</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Chế độ tối/sáng</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Chuyển đổi giữa giao diện sáng và tối</p>
                </div>
                <ThemeToggle />
              </div>
            </div>

            {/* Email change */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Thay đổi email</h3>
              <form onSubmit={handleEmailChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email mới
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nhập email mới"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center gap-2"
                >
                  <FaSave />
                  {loading ? "Đang lưu..." : "Cập nhật email"}
                </button>
              </form>
            </div>

            {/* Password change */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Thay đổi mật khẩu</h3>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center gap-2"
                >
                  <FaSave />
                  {loading ? "Đang lưu..." : "Cập nhật mật khẩu"}
                </button>
              </form>
            </div>
          </div>
        );

      case 'devices':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <DeviceManager />
          </div>
        );

      case 'activity':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <ActivityLog />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Chỉnh sửa hồ sơ</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Quản lý thông tin cá nhân và cài đặt tài khoản
          </p>
        </div>

        {message && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Tab navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab content */}
        {renderTabContent()}
      </div>
    </div>
  );
}

export default EditProfile; 