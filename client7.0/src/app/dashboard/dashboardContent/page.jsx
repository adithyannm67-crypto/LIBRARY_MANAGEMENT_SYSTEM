"use client";

import style from "./page.module.css";
import commonStyle from "#root/common.module.css";
import Link from "next/link";
import { TriangleAlert, RotateCcw } from "lucide-react";

import BorrowedBooksSection from "./sections/borrowedBooks";
import ReadingGoalSection from "./sections/Reading";
import RecommendationsSection from "./sections/recommendation";
import StatsSection from "./sections/stats";
import Header from "./sections/header";

import { useAuth } from "@/app/context/AuthContext";

import { useEffect, useState } from "react";


/*

i should create skeletons using modules.....


*/












export default function DashboardContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useAuth();

  const [stats, setStats] = useState({
    activeBorrows: [],
    totalBorrowsThisYear: 0,
    currentBorrowsCount: 0,
    nearestBorrows: [],
    totalBorrowsThisMonth: 0,
    totalBorrowsThisWeek: 0,
  });
  const updateStats = (updater) => {
    setStats((prevStats) =>
      typeof updater === "function"
        ? updater(prevStats)
        : { ...prevStats, ...updater },
    );
  };

  useEffect(() => {
    async function loadDashBoardData() {
      if (!user) return;

      try {
        setError(false);
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/loadDashboard/`, {
          headers: { Authorization: `Bearer ${token}` },
          method: "GET",
        });

        const body = await res.json();

        if (!body.success || !res.ok)
          throw new Error(body?.message || "Failed to load dashboard data");

        const {
          totalBorrowsThisYear,
          activeBorrows,
          nearestBorrows,
          totalBorrowsThisMonth,
          totalBorrowsThisWeek,
        } = body.data;

        updateStats({
          activeBorrows: activeBorrows,
          totalBorrowsThisYear,
          currentBorrowsCount: activeBorrows.length,
          nearestBorrows,
          totalBorrowsThisMonth,
          totalBorrowsThisWeek,
        });
      } catch (e) {
        console.log(e);
        setError("Failed to load dashboard data");
      } finally {
        // setLoading(false);
      }
    }

    loadDashBoardData();
  }, [user]);

  // if (loading) {
  //   return <LoadingState />;
  // }
  if (error) {
    return <ErrorState error={error} />;
  }
  return (
    <Dashboard
      loading={loading}
      stats={stats}
      updateStats={updateStats}
      user={user}
    />
  );
}

function LoadingState() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

function ErrorState({ error }) {
  
  return (
    <div className={style.errorState}>
      <TriangleAlert size={32} />
      <h2>Something went wrong</h2>
      <p>
        {error}.
        <br />
        Please try again or return to login.
      </p>

      <div className={style.errorActions}>
        <button
          className={commonStyle.btnPrimary}
          onClick={() => window.location.reload()}
        >
          <RotateCcw size={12} /> Retry
        </button>
        <Link
          className={commonStyle.backBtn}
          href="/auth"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.clear();
          }}
        >
          ← Back to Login
        </Link>
      </div>
    </div>
  );
}

function Dashboard({ loading, stats, updateStats, user }) {
  return (
    <div className={style.container}>
      <Header loading={loading} user={user} />

      <div className={`${style.containerInner} ${style.content}`}>
        <StatsSection loading={loading} stats={stats} />

        <div className={style.mainGrid}>
          <BorrowedBooksSection
            loading={loading}
            stats={stats}
            updateStats={updateStats}
          />

          <div className={style.sidebar}>
            <RecommendationsSection
              loading={loading}
              updateStats={updateStats}
            />

            <ReadingGoalSection loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
