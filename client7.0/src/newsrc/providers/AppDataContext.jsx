"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";

import { getAuthorString } from "#root/shared/utils/common.jsx";

export const AppDataContext = createContext();
export function AppDataProvider({ children, dashBoardData = {} }) {
  const [isOpen, setIsOpen] = useState(false);

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
  const updateStats = useCallback((updater) => {
    setStats((prevStats) =>
      typeof updater === "function"
        ? updater(prevStats)
        : { ...prevStats, ...updater },
    );
  }, []);
  console.count("AppDataProvider");
  // console.trace("setAvailableBooks called");
  const prev = useRef();

  useEffect(() => {
    console.log("stats changed", prev.current, stats);
    prev.current = stats;
  }, [stats]);

  useEffect(() => {
    console.log("isOpen changed", isOpen);
  }, [isOpen]);

  console.count("AppDataProvider");

  if (stats?.totalBorrowsThisYear > 0)
    console.log("stats from app data context", stats);

  const borrowedBookIds = useMemo(
    () => new Set((stats?.activeBorrows ?? []).map((b) => b.bookid)),
    [stats?.activeBorrows],
  );

  const loading = false;

  const value = useMemo(
    () => ({
      loading,

      stats,
      updateStats,
      isOpen,
      setIsOpen,
      borrowedBookIds,
    }),
    [loading, stats, isOpen, borrowedBookIds],
  );

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
