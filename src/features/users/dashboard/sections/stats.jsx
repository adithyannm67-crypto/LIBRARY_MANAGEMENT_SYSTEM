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
      subtitle: `This week: ${totalBorrowsThisWeek}`,
    },
    {
      Icon: TrendingUp,
      label: "Books Read This Year",
      value: totalBorrowsThisYear,
      subtitle: `This month: ${totalBorrowsThisMonth}`,
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
    },
  ];

  return (
    <div className={style.statsGrid}>
      <>
        {STATS.map(({ label, Icon, value, subtitle }) => (
          <StatCard
            key={label}
            icon={Icon}
            label={label}
            value={value}
            subtitle={subtitle}
          />
        ))}
        {/* <StatCard
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
        /> */}
      </>
    </div>
  );
}
