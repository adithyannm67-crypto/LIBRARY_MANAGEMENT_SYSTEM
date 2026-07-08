import styles from "../styles/monthlyChart.module.css";

import { fetchNoOfBorrowsPerMonth } from "#root/lib/server/services/books.service.js";

export default async function MonthlyChart() {
  const MONTH_DATA = await fetchNoOfBorrowsPerMonth();
  const maxBooks = MONTH_DATA.reduce(
    (max, book) => Math.max(max, book.books),
    0,
  );
  
  return (
    <div className={styles.monthlyChart}>
      {MONTH_DATA.map((m) => (
        <div key={m.month} className={styles.monthColumn}>
          <div className={styles.monthBarContainer}>
            <div
              className={styles.monthBar}
              style={{ height: `${(m.books / maxBooks) * 100}%` }}
            />
          </div>

          <span className={styles.monthLabel}>{m.month}</span>
        </div>
      ))}
    </div>
  );
}
