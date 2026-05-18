"use client";

import style from "./page.module.css";
import { BookOpen, TrendingUp, Calendar } from "lucide-react";
import StatCard from "../components/StatCard/page";

export default function StatsSection({
  totalBorrowsThisYear,
  currentBorrowsCount,
  nearestBorrows,
}) {
  const duedate =
    nearestBorrows.length > 0 ? nearestBorrows[0].duedate : "No dues";
  console.log(duedate);
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
        subtitle="need to be updated"
      />
      <StatCard
        icon={Calendar}
        label="Next Due Date"
        value={duedate}
        subtitle={books.map((element) => {
          return <span key={element}>{element},</span>;
        })}
      />
    </div>
  );
}
