import styles from "./component.module.css";

import { useRouter, usePathname } from "next/navigation";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Clock, AlertCircle, CheckCircle, Dot } from "lucide-react";
import { formatDate } from "#root/common.jsx";

export function BookCard({ book, onClick, disabled }) {
  const router = useRouter();
  const pathname = usePathname();

  const parts = pathname.split("/").filter(Boolean);
  const { bookid, duedate, returndate, title, authors, borrowdate } = book;
  const isReturned = returndate !== null;
  const isOverdue = new Date(duedate) < new Date() && !returndate;
  const returnedLate = returndate && new Date(returndate) > new Date(duedate);
  const StatusIcon = returndate
    ? returnedLate
      ? AlertCircle
      : CheckCircle
    : isOverdue
      ? AlertCircle
      : Clock;

  const bookcardStyle = `${styles.bookCard1} ${!disabled ? styles.active : ""} `;
  let authorsString = "Unknown Author";
  if (authors && Object.keys(authors).length > 0) {
    authorsString = "";
    Object.entries(authors).forEach(([_, value], index) => {
      if (index > 0) authorsString += ", ";
      authorsString += value;
    });
  }

  return (
    <div className={bookcardStyle}>
      <div className={styles.bookContent}>
        <h3 className={styles.bookTitle}>{title}</h3>

        <p className={styles.bookAuthor}>{authorsString}</p>

        <div className={styles.bookStatus}>
          <div className={styles.iconWrapper}>
            <StatusIcon />
          </div>
          <span style={{ color: "#1D4ED8" }}>
            Borrowed on {formatDate(borrowdate)}
          </span>

          {!returndate && (
            <>
              <Dot />
              <span>Due on {formatDate(duedate)}</span>
            </>
          )}
          {isOverdue && <span className={styles.overdue}>Overdue</span>}

          {returndate && (
            <>
              <Dot />
              <span className={styles.returned}>
                Returned on {formatDate(returndate)}
              </span>

              {returnedLate && (
                <span className={styles.late}>Returned late</span>
              )}
            </>
          )}
        </div>
      </div>

      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        {!isReturned && <button onClick={onClick}>Return</button>}
        <button
          onClick={() => {
            const option = isReturned ? "Borrow Again" : "Return";
            router.push(
              `bookdetails/${bookid}/?option=${option}&from=${parts[1]}`,
            );
          }}
        >
          Details
        </button>
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
