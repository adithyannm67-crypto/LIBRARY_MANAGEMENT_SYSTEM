import styles from "./page.module.css";

import Link from "next/link";
import { TrendingUp, ChevronRight } from "lucide-react";

import MonthlyChart from "@/features/users/profile/components/MonthlyChart";
import ReadingGoal from "#root/features/users/profile/components/ReadingGoal.jsx";
import RecentReads from "#root/features/users/profile/components/recentReads.jsx";
import GenreBreakDown from "#root/features/users/profile/components/GenreBreakDown.jsx";
import Streak from "#root/features/users/profile/components/Streak.jsx";
import FavAuthor from "#root/features/users/profile/components/favouriteAuthor.jsx";

export default async function OverViewTab() {
  return (
    <div className={styles.overViewContainer}>
      <div className={styles.overViewLeft}>
        <ReadingGoal />

        <div className={styles.card}>
          <h3 className={styles.cardHeading}>
            <TrendingUp className={styles.cardHeadingIcon} />
            Monthly Activity
          </h3>

          <MonthlyChart />
        </div>

        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Recently Finished</h3>

            <Link
              href="/users/profile/readinghistory"
              className={styles.viewAllButton}
            >
              View all
              <ChevronRight className={styles.viewAllIcon} />
            </Link>
          </div>

          <RecentReads />
        </div>
      </div>

      <div className={styles.overViewRight}>
        <GenreBreakDown />

        <Streak />

        <FavAuthor />
      </div>
    </div>
  );
}
