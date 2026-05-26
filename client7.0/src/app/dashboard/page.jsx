"use client";

import style from "./page.module.css";

import BorrowedBooksSection from "./sections/borrowedBooks";
import ReadingGoalSection from "./sections/Reading";
import RecommendationsSection from "./sections/recommendation";
import StatsSection from "./sections/stats";
import Header from "./sections/header";

import { useAuth } from "@/app/context/AuthContext";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useAuth();

  const [stats, setStats] = useState({
    activeBorrows: [],
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
          totalBorrowsThisYear,
          activeBorrows,
          nearestBorrows,
          totalBorrowsThisMonth,
          totalBorrowsThisWeek,
        } = body.data;

        updateStats({
          activeBorrows: activeBorrows,
          totalBorrowsThisYear,
          currentBorrowsCount: activeBorrows.length,
          nearestBorrows,
          totalBorrowsThisMonth,
          totalBorrowsThisWeek,
        });
      } catch (e) {
        console.log(e);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    loadDashBoardData();
  }, [user]);

  if (error) throw error;
  return (
    <div className={style.container}>
      {/* Main Content */}
      <main className={style.main}>
        <Header loading={loading} user={user} />

        <div className={style.content}>
          <StatsSection loading={loading} stats={stats} />

          <div className={style.mainGrid}>
            <BorrowedBooksSection
              loading={loading}
              stats={stats}
              updateStats={updateStats}
            />

            <div className={style.sidebar}>
              <RecommendationsSection
                loading={loading}
                updateStats={updateStats}
              />

              <ReadingGoalSection loading={loading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
