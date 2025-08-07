import React, { createContext, useState, useEffect, useContext } from "react";
import { DEMO_USER } from "../config/demoData";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Thêm loading state

  useEffect(() => {
    const demoMode = localStorage.getItem("demoMode");
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");
    const storedUserData = localStorage.getItem("userData");
    
    console.log("UserContext useEffect - Checking stored data:", {
      demoMode,
      storedUserId,
      storedRole,
      storedUsername,
      hasUserData: !!storedUserData
    });
    
    if (demoMode === "true") {
      console.log("Setting demo mode");
      setIsDemoMode(true);
      setUser(DEMO_USER);
      setRole("admin");
      setUserId(DEMO_USER.id);
      setUsername(DEMO_USER.username);
    } else if (storedUserId && storedRole) {
      console.log("Restoring user session from localStorage");
      
      // Xử lý userData từ localStorage
      let processedUserData = storedUserData ? JSON.parse(storedUserData) : { 
        id: storedUserId, 
        username: storedUsername 
      };
      
      // Đảm bảo avatar được lưu đúng format (relative path)
      if (processedUserData.avatar && processedUserData.avatar.startsWith('http://localhost:3001')) {
        processedUserData.avatar = processedUserData.avatar.replace('http://localhost:3001', '');
      }

      setUserId(storedUserId);
      setRole(storedRole);
      setUsername(storedUsername || "");
      setUser(processedUserData);
      setIsDemoMode(false);
    } else {
      console.log("No valid session found, clearing state");
      setUser(null);
      setRole(null);
      setUsername("");
      setUserId("");
      setIsDemoMode(false);
    }
    
    // Đặt loading thành false sau khi đã kiểm tra xong
    setIsLoading(false);
  }, []); // Remove userId dependency to prevent infinite loops

  const login = (id, role, username, userData) => {
    // Debug logs
    console.log("Login called with:", { id, role, username, userData });

    // Xử lý trường hợp username undefined/null
    const validUsername = username || userData?.username || userData?.name || userData?.email || "Người dùng";

    // Đảm bảo avatar được lưu đúng format (relative path)
    let avatarPath = userData?.avatar || "";
    if (avatarPath && avatarPath.startsWith('http://localhost:3001')) {
      avatarPath = avatarPath.replace('http://localhost:3001', '');
    }

    setIsDemoMode(false);
    setUserId(id);
    setRole(role);
    setUsername(validUsername);
    setUser({
      ...userData, 
      username: validUsername, 
      avatar: avatarPath // Lưu relative path
    });
    setIsLoading(false); // Đảm bảo loading state được reset

    // Lưu vào localStorage
    localStorage.setItem("userId", id);
    localStorage.setItem("role", role);
    localStorage.setItem("username", validUsername);
    if (userData) {
      // Lưu userData với avatar path (relative)
      const userDataToStore = {
        ...userData,
        username: validUsername,
        avatar: avatarPath // Lưu relative path
      };
      localStorage.setItem("userData", JSON.stringify(userDataToStore));
    }
    localStorage.removeItem("demoMode");

    console.log("Login completed. New state:", {
      id,
      role,
      username: validUsername,
      avatar: avatarPath
    });
  };

  const updateUser = (updatedUserData) => {
    console.log("UpdateUser called with:", updatedUserData);
    
    // Đảm bảo avatar được lưu đúng format (relative path)
    let avatarPath = updatedUserData?.avatar || "";
    if (avatarPath && avatarPath.startsWith('http://localhost:3001')) {
      avatarPath = avatarPath.replace('http://localhost:3001', '');
    }

    const newUserData = {
      ...user,
      ...updatedUserData,
      avatar: avatarPath // Lưu relative path
    };

    setUser(newUserData);

    // Cập nhật localStorage
    const currentUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    const updatedStorageData = {
      ...currentUserData,
      ...updatedUserData,
      avatar: avatarPath // Lưu relative path
    };
    localStorage.setItem('userData', JSON.stringify(updatedStorageData));

    console.log("UpdateUser completed. New user data:", newUserData);
  };

  const loginDemo = () => {
    console.log("Demo login called");

    setIsDemoMode(true);
    setUserId(DEMO_USER.id);
    setRole("admin");
    setUsername(DEMO_USER.username);
    setUser(DEMO_USER);
    setIsLoading(false); // Đảm bảo loading state được reset

    // Lưu demo mode vào localStorage
    localStorage.setItem("demoMode", "true");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("userData");

    console.log("Demo login completed");
  };

  const logout = () => {
    console.log("Logout called");

    setUserId("");
    setRole(null);
    setUsername("");
    setIsDemoMode(false);
    setUser(null);
    setIsLoading(false); // Reset loading state
    
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("userData");
    localStorage.removeItem("demoMode");
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      role, 
      username, 
      login, 
      updateUser, 
      loginDemo, 
      logout, 
      isDemoMode, 
      isLoading 
    }}>
      {children}
    </UserContext.Provider>
  );
}
