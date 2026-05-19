"use client";

import style from "./page.module.css";

import BorrowedBooksSection from "./sections/borrowedBooks";
import ReadingGoalSection from "./sections/Reading";
import RecommendationsSection from "./sections/recommendation";
import StatsSection from "./sections/stats";
import Header from "./sections/header";

import { useAuth } from "@/app/context/AuthContext";

import { useEffect, useState } from "react";

export default function DashboardContent() {
  const { user } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [totalBorrowsThisYear, setTotalBorrowsThisYear] = useState(0);
  const [currentBorrowsCount, setCurrentBorrowsCount] = useState(0);
  const [nearestBorrows, setNearestBorrows] = useState([]);
  //look recommnedation/popup for creating good ui for  nearest borrow

  useEffect(() => {
    async function loadDashBoardData() {
      if (!user) return;
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:5000/api/loadDashboard/`, {
          headers: { Authorization: `Bearer ${token}` },
          method: "GET",
        });

        const body = await res.json();

        if (!body) throw new Error("fetching Failed");

        console.log("DashBoardData  : ", body);

        if (!body.success) throw new Error(body.message);

        const { currentBorrows, totalBorrowsThisYear } = body.data;

        const upcomingDates = currentBorrows
          .filter((record) => new Date() <= new Date(record.duedate))
          .map((record) => new Date(record.duedate).getTime());
        const nearestDate =
          upcomingDates.length > 0
            ? new Date(Math.min(...upcomingDates)).toISOString().split("T")[0]
            : null;

        const nearestBorrows =
          nearestDate === null
            ? []
            : currentBorrows
                .filter(
                  (record) =>
                    new Date(record.duedate).toISOString().split("T")[0] ===
                    nearestDate,
                )
                .map((record) => ({
                  title: record.title,
                  duedate: record.duedate,
                }));

        setBorrowedBooks(currentBorrows);
        setTotalBorrowsThisYear(totalBorrowsThisYear);
        setCurrentBorrowsCount(currentBorrows.length);
        setNearestBorrows(nearestBorrows);
      } catch (e) {
        console.error(e);
      }
    }

    loadDashBoardData();
  }, [user]);

  return (
    <div className={style.container}>
      <Header user={user} />

      <div className={`${style.containerInner} ${style.content}`}>
        <StatsSection
          totalBorrowsThisYear={totalBorrowsThisYear}
          currentBorrowsCount={currentBorrowsCount}
          nearestBorrows={nearestBorrows}
          borrowedBooks={borrowedBooks}
        />

        <div className={style.mainGrid}>
          <BorrowedBooksSection
            borrowedBooks={borrowedBooks}
            setBorrowedBooks={setBorrowedBooks}
            setCurrentBorrowsCount={setCurrentBorrowsCount}
            setTotalBorrowsThisYear={setTotalBorrowsThisYear}
            setNearestBorrows={setNearestBorrows}
          />

          <div className={style.sidebar}>
            <RecommendationsSection
              setBorrowedBooks={setBorrowedBooks}
              setCurrentBorrowsCount={setCurrentBorrowsCount}
              setTotalBorrowsThisYear={setTotalBorrowsThisYear}
              setNearestBorrows={setNearestBorrows}
            />

            <ReadingGoalSection />
          </div>
        </div>
      </div>
    </div>
  );
}
