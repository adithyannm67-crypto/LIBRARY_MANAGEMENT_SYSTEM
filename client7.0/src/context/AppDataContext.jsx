"use client";


import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

import { getAuthorString } from "#root/common.jsx";

export const AppDataContext = createContext();
export function AppDataProvider({ children }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [stats, setStats] = useState({
    activeBorrows: [],
    totalBorrows: 0,
    totalBorrowsThisYear: 0,
    currentBorrowsCount: 0,
    nearestBorrows: [],
    totalBorrowsThisMonth: 0,
    totalBorrowsThisWeek: 0,
  });
  const updateStats = (updater) => {
    setStats((prevStats) =>
      typeof updater === "function"
        ? updater(prevStats)
        : { ...prevStats, ...updater },
    );
  };

  useEffect(() => {
    async function loadDashBoardData() {
      if (!user) return;

      try {
        setError(false);
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/loadDashboard/`, {
          headers: { Authorization: `Bearer ${token}` },
          method: "GET",
        });

        const body = await res.json();

        if (!body.success || !res.ok)
          throw new Error(body?.message || "Failed to load dashboard data");

        const {
          totalBorrows,
          totalBorrowsThisYear,
          activeBorrows,
          nearestBorrows,
          totalBorrowsThisMonth,
          totalBorrowsThisWeek,
        } = body.data;

        updateStats({
          totalBorrows,
          activeBorrows: activeBorrows?.map((book) => ({
            ...book,
            authorString: getAuthorString(book.authors),
          })),
          totalBorrowsThisYear,
          currentBorrowsCount: activeBorrows.length,
          nearestBorrows,
          totalBorrowsThisMonth,
          totalBorrowsThisWeek,
        });
      } catch (e) {
        console.error(e);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    loadDashBoardData();
  }, [user]);
  if (stats?.totalBorrowsThisYear > 0)
    console.log("stats from app data context", stats);

  return (
    <AppDataContext.Provider value={{ loading, error, stats, updateStats }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
