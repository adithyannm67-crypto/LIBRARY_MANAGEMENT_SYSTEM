

import style from "./page.module.css";

import BorrowedBooksSection from "#root/features/usersHome/dashboard/sections/borrowedBooks";
import ReadingGoalSection from "#root/features/usersHome/dashboard/sections/Reading";
import RecommendationsSection from "@/features/usersHome/dashboard/sections/recommendation";
import StatsSection from "#root/features/usersHome/dashboard/sections/stats";

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
