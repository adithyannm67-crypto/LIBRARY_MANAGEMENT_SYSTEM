import style from "./page.module.css";

import BorrowedBooksSection from "@/features/users/dashboard/sections/borrowedBooks";
import ReadingGoalSection from "@/features/users/dashboard/sections/Reading";
import RecommendationsSection from "@/features/users/dashboard/sections/recommendation";
import StatsSection from "@/features/users/dashboard/sections/stats";

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
