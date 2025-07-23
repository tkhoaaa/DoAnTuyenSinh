import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    if (userId) {
      const storedRole = localStorage.getItem("role");
      const storedUsername = localStorage.getItem("username");
      const storedUserData = localStorage.getItem("userData");

      console.log("User ID found:", userId);
      console.log("Stored username:", storedUsername);
      console.log("Stored role:", storedRole);

      setRole(storedRole);
      setUsername(storedUsername || "");
      setUser(storedUserData ? JSON.parse(storedUserData) : { id: userId, username: storedUsername });
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

    setUserId(id);
    setRole(role);
    setUsername(validUsername);
    setUser(userData || { id, username: validUsername });

    // Lưu vào localStorage
    localStorage.setItem("userId", id);
    localStorage.setItem("role", role);
    localStorage.setItem("username", validUsername);
    if (userData) localStorage.setItem("userData", JSON.stringify(userData));

    console.log("Login completed. New state:", {
      id,
      role,
      username: validUsername,
    });
  };

  const logout = () => {
    console.log("Logout called");

    setUserId("");
    setRole(null);
    setUsername("");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, role, username, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
