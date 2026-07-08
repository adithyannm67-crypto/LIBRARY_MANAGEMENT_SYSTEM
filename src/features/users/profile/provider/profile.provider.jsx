"use client";

import { createContext, useContext, useState } from "react";

import { useAppData } from "#root/context/AppDataContext.jsx";

const PageContext = createContext();

export default function ProfilePageProvider({
  children,
  borrowedBooks,
  streaks,
}) {
  const [activeTab, setActiveTab] = useState("overview");

  const { stats } = useAppData();

  const readingHistory = borrowedBooks;

  const longestStreak = Math.max(...streaks);
  const latestStreak = streaks[0];

  const QUICK_STATS = [
    {
      label: "Books Read",
      value: stats.totalBorrowsThisYear,
      sub: "this year",
    },
    {
      label: "Current Streak",
      value: `${latestStreak} days`,
      sub: `personal best: ${longestStreak} days`,
    },
    { label: "Total Borrowed", value: stats.totalBorrows, sub: "all time" },
  ];
  return (
    <PageContext.Provider
      value={{
        activeTab,
        setActiveTab,
        readingHistory,
        longestStreak,
        latestStreak,
        QUICK_STATS,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
