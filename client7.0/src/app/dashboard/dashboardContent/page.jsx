"use client";

import style from "./page.module.css";

import BorrowedBooksSection from "./sections/borrowedBooks";
import ReadingGoalSection from "./sections/Reading";
import RecommendationsSection from "./sections/recommendation";
import StatsSection from "./sections/stats";
import Header from "./sections/header";

import { useAuth } from "@/app/context/AuthContext";

import { useEffect, useState } from "react";

export default function DashboardContent() {
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
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:5000/api/loadDashboard/`, {
          headers: { Authorization: `Bearer ${token}` },
          method: "GET",
        });

        const body = await res.json();

        if (!body.success || !res.ok) throw new Error("fetching Failed");

        console.log("DashBoardData  : ", body);

        if (!body.success) throw new Error(body.message);

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
        //errors should be handled
      }
    }

    loadDashBoardData();
  }, [user]);

  return (
    <div className={style.container}>
      <Header user={user} />

      <div className={`${style.containerInner} ${style.content}`}>
        <StatsSection stats={stats} />

        <div className={style.mainGrid}>
          <BorrowedBooksSection stats={stats} updateStats={updateStats} />

          <div className={style.sidebar}>
            <RecommendationsSection updateStats={updateStats} />

            <ReadingGoalSection />
          </div>
        </div>
      </div>
    </div>
  );
}
