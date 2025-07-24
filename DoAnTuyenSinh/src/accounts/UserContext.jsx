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

  useEffect(() => {
    const demoMode = localStorage.getItem("demoMode");
    
    if (demoMode === "true") {
      setIsDemoMode(true);
      setUser(DEMO_USER);
      setRole("admin");
      setUserId(DEMO_USER.id);
      setUsername(DEMO_USER.username);
    } else if (userId) {
      const storedRole = localStorage.getItem("role");
      const storedUsername = localStorage.getItem("username");
      const storedUserData = localStorage.getItem("userData");

      console.log("User ID found:", userId);
      console.log("Stored username:", storedUsername);
      console.log("Stored role:", storedRole);

      // Xử lý avatar URL
      let processedUserData = storedUserData ? JSON.parse(storedUserData) : { id: userId, username: storedUsername };
      const avatarUrl = processedUserData.avatar 
        ? (processedUserData.avatar.startsWith('http') 
            ? processedUserData.avatar 
            : `http://localhost:3001${processedUserData.avatar}`) 
        : "";

      setRole(storedRole);
      setUsername(storedUsername || "");
      setUser({
        ...processedUserData,
        avatar: avatarUrl
      });
    } else {
      setUser(null);
      setRole(null);
      setUsername("");
    }
  }, [userId]);

  const login = (id, role, username, userData) => {
    // Debug logs
    console.log("Login called with:", { id, role, username, userData });

    // Xử lý trường hợp username undefined/null
    const validUsername = username || "Người dùng";

    // Xử lý avatar URL
    const avatarUrl = userData?.avatar 
      ? (userData.avatar.startsWith('http') 
          ? userData.avatar 
          : `http://localhost:3001${userData.avatar}`) 
      : "";

    setIsDemoMode(false);
    setUserId(id);
    setRole(role);
    setUsername(validUsername);
    setUser({
      ...userData, 
      username: validUsername, 
      avatar: avatarUrl
    });

    // Lưu vào localStorage
    localStorage.setItem("userId", id);
    localStorage.setItem("role", role);
    localStorage.setItem("username", validUsername);
    if (userData) {
      // Lưu userData với avatar URL đầy đủ
      const userDataToStore = {
        ...userData,
        username: validUsername,
        avatar: avatarUrl
      };
      localStorage.setItem("userData", JSON.stringify(userDataToStore));
    }
    localStorage.removeItem("demoMode");

    console.log("Login completed. New state:", {
      id,
      role,
      username: validUsername,
      avatar: avatarUrl
    });
  };

  const loginDemo = () => {
    console.log("Demo login called");

    setIsDemoMode(true);
    setUserId(DEMO_USER.id);
    setRole("admin");
    setUsername(DEMO_USER.username);
    setUser(DEMO_USER);

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
    
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("userData");
    localStorage.removeItem("demoMode");
  };

  return (
    <UserContext.Provider value={{ user, role, username, login, loginDemo, logout, isDemoMode }}>
      {children}
    </UserContext.Provider>
  );
}
