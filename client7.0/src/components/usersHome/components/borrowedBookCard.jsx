import styles from "./component.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Clock, AlertCircle, CheckCircle, Dot } from "lucide-react";

export function BookCard({ book, onClick }) {
  const { duedate, returndate, title, author, borrowdate } = book;

  const isOverdue = new Date(duedate) < new Date() && !returndate;
  const returnedLate = returndate && new Date(returndate) > new Date(duedate);
  const StatusIcon = returndate
    ? returnedLate
      ? AlertCircle
      : CheckCircle
    : isOverdue
      ? AlertCircle
      : Clock;
  return (
    <div
      className={styles.bookCard1 + " " + styles.bookCard2}
      onClick={onClick}
    >
      <div
        className={styles.bookCover}
        style={{ background: "var(--book-cover)" }}
      />

      <div className={styles.bookContent}>
        <h3 className={styles.bookTitle}>{title}</h3>

        <p className={styles.bookAuthor}>{author}</p>

        <div className={styles.bookStatus}>
          <div className={styles.iconWrapper}>
            <StatusIcon />
          </div>
          <span>Borrowed on {borrowdate}</span>

          {!returndate && (
            <>
              <Dot />
              <span className={`${isOverdue ? styles.overdue : ""}`}>
                {isOverdue ? "Overdue since " : "Due on "} {duedate}
              </span>
            </>
          )}

          {returndate && (
            <>
              <Dot />
              <span className={styles.returned}>Returned on {returndate}</span>

              {returnedLate && (
                <>
                  <Dot />
                  <span className={styles.late}>Returned late</span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function BookCardSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div key={index} className={styles.bookCard1}>
        <div className={styles.bookCover}>
          <Skeleton width="100%" height="100%" />
        </div>

        <div className={styles.bookContent}>
          <h3 className={styles.bookTitle}>
            <Skeleton />
          </h3>
          <p className={styles.bookAuthor}>
            <Skeleton />
          </p>

          <div className={styles.bookStatus}>
            <div className={styles.iconWrapper}>
              <Skeleton />
            </div>
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    ));
}
