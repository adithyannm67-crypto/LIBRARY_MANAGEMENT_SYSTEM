"use client";

import styles from "./page.module.css";

import Link from "next/link";

import { Clock } from "lucide-react";

import StarRating from "@/features/users/profile/components/StarRating";
import Cover from "#root/features/users/shared/components/coverimage.jsx";

import { formatDate } from "#root/features/users/shared/utils/utils.js";

import { usePage } from "#root/features/users/profile/provider/profile.provider";

const ReadingHistoryTab = () => {
  const { readingHistory } = usePage();
  return (
    <div className={styles.historyCard}>
      <div className={styles.historyHeader}>
        <Link className={styles.historyCount} href="/users/borrowhistory">
          View More History
        </Link>

        <div className={styles.historySort}>
          <Clock className={styles.historySortIcon} />
          Most recent first
        </div>
      </div>

      <div className={styles.historyList}>
        {readingHistory.map((book, idx) => (
          <div key={book.borrowid} className={styles.historyItem}>
            <span className={styles.historyIndex}>{idx + 1}</span>

            <Cover coverurl={book.coverurl} width={36} height={48} priority={false} title={book.title} />

            <div className={styles.historyBook}>
              <p className={styles.historyTitle}>{book.title}</p>

              <p className={styles.historyAuthor}>{book.authorString}</p>

              <StarRating rating={book?.rating} />
            </div>

            <div className={styles.historyMeta}>
              <span className={styles.historyDate}>
                {formatDate(book.returndate)}
              </span>

              <span className={styles.historyPages}>
                {book?.pages?.toLocaleString()} pages
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingHistoryTab;
