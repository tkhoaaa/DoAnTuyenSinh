import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    if (token) {
      const storedRole = localStorage.getItem("role");
      const storedUsername = localStorage.getItem("username");

      // Debug logs
      console.log("Token found:", token);
      console.log("Stored username:", storedUsername);
      console.log("Stored role:", storedRole);

      setRole(storedRole);
      setUsername(storedUsername || "");
      setUser({ token, username: storedUsername });
    } else {
      setUser(null);
      setRole(null);
      setUsername("");
    }
  }, [token]);

  const login = (token, role, username) => {
    // Debug logs
    console.log("Login called with:", { token, role, username });

    // Xử lý trường hợp username undefined/null
    const validUsername = username || "Người dùng";

    setToken(token);
    setRole(role);
    setUsername(validUsername);

    // Chỉ lưu vào localStorage nếu giá trị hợp lệ
    if (token) localStorage.setItem("token", token);
    if (role) localStorage.setItem("role", role);
    if (validUsername) localStorage.setItem("username", validUsername);

    setUser({ token, username: validUsername });

    console.log("Login completed. New state:", {
      token,
      role,
      username: validUsername,
    });
  };

  const logout = () => {
    console.log("Logout called");

    setToken("");
    setRole(null);
    setUsername("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, role, username, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
