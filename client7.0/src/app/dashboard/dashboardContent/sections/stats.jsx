"use client";

import style from "./page.module.css";
import { BookOpen, TrendingUp, Calendar } from "lucide-react";
import StatCard from "../components/StatCard/page";

export default function StatsSection({
  totalBorrowsThisYear,
  currentBorrowsCount,
  nearestBorrows,
  borrowedBooks,
}) {
  const hasUpComing = nearestBorrows.length > 0;
  const duedate = hasUpComing ? nearestBorrows[0].duedate : null;

  const noOfOverdue = borrowedBooks.filter(
    (book) => new Date(book.duedate) < new Date(),
  ).length;

  const books = nearestBorrows.map((book) => book.title);
  return (
    <div className={style.statsGrid}>
      <StatCard
        icon={BookOpen}
        label="Currently Borrowed"
        value={currentBorrowsCount}
        subtitle="How many books are in this week?"
      />
      <StatCard
        icon={TrendingUp}
        label="Books Read This Year"
        value={totalBorrowsThisYear}
        subtitle="Books read this month"
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
