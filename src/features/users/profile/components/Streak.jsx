"use client";

import styles from "../styles/streak.module.css";

import { Flame } from "lucide-react";

import { usePage } from "../provider/profile.provider";

export default  function Streak() {

  const { longestStreak, latestStreak } = usePage();

  return (
    <div className={styles.streakCard}>
      <h3 className={styles.streakHeading}>
        <Flame className={styles.streakIcon} />
        Reading Streak
      </h3>

      <div className={styles.streakSummary}>
        <div className={styles.streakCount}>{latestStreak}</div>

        <div className={styles.streakLabel}>days in a row</div>
      </div>

      <p className={styles.streakBest}>
        Personal best: <strong>{longestStreak} days</strong>
      </p>
    </div>
  );
}
