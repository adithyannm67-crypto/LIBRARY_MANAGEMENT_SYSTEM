import style from "./page.module.css";
import commonStyle from "#root/common.module.css";
import { BookOpen, TrendingUp, Calendar } from "lucide-react";
import StatCard from "../components/StatCard/page";

export default function StatsSection({ loading, stats }) {
  console.log(stats);
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
  if (loading) {
    return (
      <div className={style.statsGrid}>
        <div
          className={commonStyle.skeleton}
          style={{ width: "300px", height: "150px" }}
        ></div>
        <div
          className={commonStyle.skeleton}
          style={{ width: "300px", height: "150px" }}
        ></div>
        <div
          className={commonStyle.skeleton}
          style={{ width: "300px", height: "150px" }}
        ></div>
      </div>
    );
  }
  return (
    <div className={style.statsGrid}>
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
    </div>
  );
}
