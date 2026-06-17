"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";

import { getAuthorString } from "#root/common.jsx";

export const AppDataContext = createContext();
export function AppDataProvider({ children, dashBoardData = {} }) {
  const [isOpen, setIsOpen] = useState(false);

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

  const {
    totalBorrows,
    totalBorrowsThisYear,
    activeBorrows,
    nearestBorrows,
    totalBorrowsThisMonth,
    totalBorrowsThisWeek,
  } = dashBoardData;
  useEffect(() => {
    updateStats({
      totalBorrows,
      activeBorrows: activeBorrows?.map((book) => ({
        ...book,
        authorString: getAuthorString(book.authors),
      })),
      totalBorrowsThisYear,
      currentBorrowsCount: activeBorrows?.length,
      nearestBorrows,
      totalBorrowsThisMonth,
      totalBorrowsThisWeek,
    });
  }, [
    totalBorrows,
    activeBorrows,
    totalBorrowsThisYear,
    nearestBorrows,
    totalBorrowsThisMonth,
    totalBorrowsThisWeek,
  ]);

  if (stats?.totalBorrowsThisYear > 0)
    console.log("stats from app data context", stats);

  const borrowedBookIds = useMemo(
    () => new Set((stats?.activeBorrows ?? []).map((b) => b.bookid)),
    [stats?.activeBorrows],
  );

  const loading = false;

  return (
    <AppDataContext.Provider
      value={{
        loading,

        stats,
        updateStats,
        isOpen,
        setIsOpen,
        borrowedBookIds,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
