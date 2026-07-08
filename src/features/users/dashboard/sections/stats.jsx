"use client";

import style from "./section.module.css";

import { BookOpen, TrendingUp, Calendar } from "lucide-react";

import StatCard from "../components/statsCard";

import { formatDate } from "#root/features/users/shared/utils/utils.js";

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
  const duedate = hasUpComing ? formatDate(nearestBorrows[0].duedate) : null;

  const hasOverdue =
    activeBorrows.filter((book) => new Date(book.duedate) < new Date()).length >
    0;

  const books = nearestBorrows.map((book) => book.title);

  const STATS = [
    {
      Icon: BookOpen,
      label: "Currently Borrowed",
      value: currentBorrowsCount,
      subtitle: (
        <>
          <span style={{ color: "#16A34A", fontWeight: "bold" }}>↑</span>{" "}
          {totalBorrowsThisWeek} this week
        </>
      ),
      color: "#4F46E5",
      background: "#EEF2FF",
    },
    {
      Icon: TrendingUp,
      label: "Books Read This Year",
      value: totalBorrowsThisYear,
      subtitle: (
        <>
          <span style={{ color: "#16A34A", fontWeight: "bold" }}>↑</span>{" "}
          {totalBorrowsThisMonth} this month
        </>
      ),
      color: "#16A34A",
      background: "#DCFCE7",
    },
    {
      Icon: Calendar,
      label: "Next Return",
      value: hasUpComing ? duedate : "Nothing to Return",
      subtitle: hasUpComing
        ? books.map((element, index) => {
            return (
              <span key={element}>
                {element}
                {index !== books.length - 1 && " | "}
              </span>
            );
          })
        : hasOverdue && (
            <span className={style.overdue}>{noOfOverdue} overdue</span>
          ),
      color: "#EA580C",
      background: "#FFF7ED",
    },
  ];

  return (
    <div className={style.statsGrid}>
      {STATS.map(({ label, Icon, value, subtitle, color, background }) => (
        <StatCard
          key={label}
          icon={Icon}
          label={label}
          value={value}
          subtitle={subtitle}
          color={color}
          background={background}
        />
      ))}
    </div>
  );
}
