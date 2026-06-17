"use client";

import style from "./page.module.css";

import BorrowedBooksSection from "#root/components/usersHome/sections/borrowedBooks";
import ReadingGoalSection from "#root/components/usersHome/sections/Reading";
import RecommendationsSection from "#root/components/usersHome/sections/recommendation";
import StatsSection from "#root/components/usersHome/sections/stats";

export default function Dashboard() {
  return (
    <div className={style.container}>
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
