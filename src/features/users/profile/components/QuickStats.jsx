"use client";

import styles from "./component.module.css";

import { usePage } from "../provider/profile.provider";

const QuickStats = () => {
  const { QUICK_STATS } = usePage();

  return (
    <div className={styles.quickStats}>
      {QUICK_STATS?.map((s) => (
        <div key={s.label} className={styles.statCard}>
          <div className={styles.statValue}>{s.value}</div>

          <div className={styles.statLabel}>{s.label}</div>

          <div className={styles.statSub}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
