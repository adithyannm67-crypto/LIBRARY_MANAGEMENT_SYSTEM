import style from "./section.module.css";

import "react-loading-skeleton/dist/skeleton.css";

import StatCard from "../components/statsCard";

import { BookOpen, TrendingUp, Calendar } from "lucide-react";

import { useAppData } from "#root/context/AppDataContext.jsx";

export default function StatsSection() {
  const { stats } = useAppData();
  const {
    nearestBorrows,
    activeBorrows,
    currentBorrowsCount,
    totalBorrowsThisYear,
    totalBorrowsThisMonth,
    totalBorrowsThisWeek,
  } = stats;
  const hasUpComing = nearestBorrows.length > 0;
  const duedate = hasUpComing
    ? new Date(nearestBorrows[0].duedate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
    : null;

  const noOfOverdue = activeBorrows.filter(
    (book) => new Date(book.duedate) < new Date(),
  ).length;

  const books = nearestBorrows.map((book) => book.title);

  return (
    <div className={style.statsGrid}>
      <>
        <StatCard
          icon={BookOpen}
          label="Currently Borrowed"
          value={currentBorrowsCount}
          subtitle={`This week: ${totalBorrowsThisWeek}`}
        />
        <StatCard
          icon={TrendingUp}
          label="Books Read This Year"
          value={totalBorrowsThisYear}
          subtitle={`This month: ${totalBorrowsThisMonth}`}
        />
        <StatCard
          icon={Calendar}
          label="Next Return"
          value={hasUpComing ? duedate : "Nothing to Return"}
          subtitle={
            hasUpComing
              ? books.map((element, index) => {
                  return (
                    <span key={element}>
                      {element}
                      {index !== books.length - 1 && " | "}
                    </span>
                  );
                })
              : noOfOverdue > 0 && (
                  <span className={style.overdue}>{noOfOverdue} overdue</span>
                )
          }
        />
      </>
    </div>
  );
}
