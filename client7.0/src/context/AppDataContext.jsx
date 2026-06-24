"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

import formatBook from "#root/features/users/shared/utils/formatBook.js";

export const AppDataContext = createContext();
export function AppDataProvider({ children, dashBoardData = {} }) {
  const {
    totalBorrows,
    totalBorrowsThisYear,
    activeBorrows,
    nearestBorrows,
    totalBorrowsThisMonth,
    totalBorrowsThisWeek,
  } = dashBoardData;

  const [stats, setStats] = useState({
    totalBorrows,
    activeBorrows: activeBorrows?.map((book) => formatBook(book)),
    totalBorrowsThisYear,
    currentBorrowsCount: activeBorrows?.length,
    nearestBorrows,
    totalBorrowsThisMonth,
    totalBorrowsThisWeek,
  });
  const updateStats = useCallback((updater) => {
    setStats((prevStats) =>
      typeof updater === "function"
        ? updater(prevStats)
        : { ...prevStats, ...updater },
    );
  }, []);

  if (stats?.totalBorrowsThisYear > 0)
    console.log("stats from app data context", stats);

  const borrowedBookIds = useMemo(
    () => new Set((stats?.activeBorrows ?? []).map((b) => b.bookid)),
    [stats?.activeBorrows],
  );

  const value = useMemo(
    () => ({
      stats,
      updateStats,
      borrowedBookIds,
    }),
    [stats, borrowedBookIds],
  );

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
