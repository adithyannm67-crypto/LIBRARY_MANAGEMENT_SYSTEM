"use client";

import style from "./page.module.css";

import BorrowedBooksSection from "#root/components/usersHome/sections/borrowedBooks";
import ReadingGoalSection from "#root/components/usersHome/sections/Reading";
import RecommendationsSection from "#root/components/usersHome/sections/recommendation";
import StatsSection from "#root/components/usersHome/sections/stats";
import { useAppData } from "#root/context/AppDataContext.jsx";

export default function Dashboard() {
  const { loading, error, stats, updateStats } = useAppData();
  if (error) throw error;
  return (
    <div className={style.container}>
      {/* Main Content */}

      <StatsSection />

      <div className={style.mainGrid}>
        <BorrowedBooksSection />

        <div className={style.sidebar}>
          <RecommendationsSection />

          <ReadingGoalSection />
        </div>
      </div>
    </div>
  );
}
