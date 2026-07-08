import styles from "./page.module.css";

import QuickStats from "#root/features/users/profile/components/QuickStats.jsx";
import TabBar from "#root/features/users/profile/components/TabsBar.jsx";

import { fetchBorrowedBooks,calculateStreaks } from "#root/lib/server/services/books.service.js";

import formatBook from "#root/features/users/shared/utils/formatBook.js";

import ProfilePageProvider from "#root/features/users/profile/provider/profile.provider.jsx";
import ProfileHeader from "#root/features/users/profile/components/ProfileHeader.jsx";

export default async function ProfilePage({ children }) {
  const data = await fetchBorrowedBooks({ limit: 10 });
  const streaks = await calculateStreaks();
  const borrowedBooks= data.map((book) => formatBook(book));
  return (
    <ProfilePageProvider borrowedBooks={borrowedBooks} streaks={streaks}>
      <div className={styles.pageContainer}>
        <div className={styles.profileHero}>
          <ProfileHeader />

          <QuickStats />
        </div>
        <TabBar />
        {children}
      </div>
    </ProfilePageProvider>
  );
}
