"use client";

import styles from "./page.module.css";

import DashboardContent from "./dashboardContent/page";
import { BorrowProvider } from "../context/borrowContext";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      {/* Main Content */}
      <main className={styles.main}>
        <BorrowProvider>
          <DashboardContent />
        </BorrowProvider>
      </main>
    </div>
  );
}
