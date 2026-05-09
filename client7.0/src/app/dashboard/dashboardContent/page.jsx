
import style from "./page.module.css";

import BorrowedBooksSection from "./sections/borrowedBooks";
import ReadingGoalSection from "./sections/Reading";
import RecommendationsSection from "./sections/recommendation";
import StatsSection from "./sections/stats";
import Header from "./sections/header";

import { useBorrow } from "@/app/context/borrowContext";
import { useAuth } from "@/app/context/AuthContext";

export default function DashboardContent() {
  const { user } = useAuth();
  const { borrowedBooks } = useBorrow();


  return (
    <div className={style.container}>
      <Header user={user} />

      <div className={`${style.containerInner} ${style.content}`}>
        <StatsSection borrowedBooks={borrowedBooks} />

        <div className={style.mainGrid}>
          <BorrowedBooksSection borrowedBooks={borrowedBooks} />

          <div className={style.sidebar}>
            <RecommendationsSection user={user}  />

            <ReadingGoalSection />
          </div>
        </div>
      </div>
    </div>
  );
}
