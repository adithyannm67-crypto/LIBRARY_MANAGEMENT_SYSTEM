import styles from "./page.module.css";

import DashboardContent from "./dashboardContent/page";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      {/* Main Content */}
      <main className={styles.main}>
        <DashboardContent />
      </main>
    </div>
  );
}
