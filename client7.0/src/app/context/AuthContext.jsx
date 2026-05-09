"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [totalBorrowsThisYear, setTotalBorrowsThisYear] = useState(0);
  const [currentBorrowsCount, setCurrentBorrowsCount] = useState(0);
  const [nearestBorrows, setNearestBorrows] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = jwtDecode(token);
    setUser(decoded);

    
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        totalBorrowsThisYear,
        setTotalBorrowsThisYear,
        currentBorrowsCount,
        setCurrentBorrowsCount,
        nearestBorrows,
        setNearestBorrows,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

