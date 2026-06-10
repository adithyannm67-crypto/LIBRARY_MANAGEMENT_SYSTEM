import styles from "./component.module.css";

import { useRouter, usePathname } from "next/navigation";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  formatDate,
  formatDateandTime,
  getAuthorString,
} from "#root/common.jsx";

export function BookCard({ book, onClick, disabled }) {
  const router = useRouter();
  const pathname = usePathname();

  const parts = pathname.split("/").filter(Boolean);
  const { bookid, title, authors, borrowdate, duedate, returndate } = book;
const authorString = getAuthorString(authors);
  const isReturned = returndate !== null;

  const today = new Date();
  let badge = "";
  let cls = "";
  const daysLeft = (duedate - today) / (1000 * 60 * 60 * 24);
  if (returndate) {
    if (returndate > duedate) {
      badge = "Returned Late";
      cls = "returned-late";
    } else {
      badge = "Returned";
      cls = "returned";
    }
  } else if (duedate < today) {
    badge = "Overdue";
    cls = "overdue";
  } else if (daysLeft <= 3) {
    badge = "Due Soon";
    cls = "due-soon";
  } else {
    badge = "Active";
    cls = "active";
  }
  const bookcardStyle = `${styles.bookCard1} ${!disabled ? styles.active : ""} `;


  return (
    <div className={bookcardStyle}>
      <div className={styles.bookContent}>
        <h3 className={styles.bookTitle}>{title}</h3>
        <p className={styles.bookAuthor}>{authorString}</p>
        <div className={styles.bookStatus}>
          <span className={`badge ${cls}`}>{badge}</span>
          {parts.length > 1 && (
            <details className={styles.detailsSection}>
              <summary>Borrowing Info</summary>
              <p>
                <span>Borrowed: {formatDateandTime(borrowdate)}</span>

                {!returndate && (
                  <>
                    <span>Due: {formatDate(duedate)}</span>
                  </>
                )}

                {returndate && (
                  <>
                    <span>Returned: {formatDateandTime(returndate)}</span>
                  </>
                )}
              </p>
            </details>
          )}
        </div>
      </div>

      <div
        style={{
          height: "100%",
          display: "inline-flex",
          alignItems: "center",

          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        {!isReturned && (
          <button className={styles.btn1} onClick={onClick}>
            Return
          </button>
        )}
        {parts.length > 1 && (
          <button
            className={styles.btn1}
            onClick={() => {
              const option = isReturned ? "Borrow Again" : "Return";
              router.push(
                `bookdetails/${bookid}/?option=${option}&from=${parts[1]}`,
              );
            }}
          >
            View Book Details
          </button>
        )}
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
// const StatusIcon = returndate
//   ? returnedLate
//     ? AlertCircle
//     : CheckCircle
//   : isOverdue
//     ? AlertCircle
//     : Clock;
{
  /* </p> */
}
{
  /* <div className={styles.bookStatus}>
          <div className={styles.iconWrapper}>
            <StatusIcon />
          </div>
          <span style={{ color: "#1D4ED8" }}>
            Borrowed:  {formatDateandTime(borrowed_at)}
          </span>

          {!returndate && (
            <>
              <Dot />
              <span>Due: {formatDateandTime(due_at)}</span>
            </>
          )}
          {isOverdue && <span className={styles.overdue}>Overdue</span>}

          {returndate && (
            <>
              <Dot />
              <span className={styles.returned}>
                Returned: {formatDateandTime(return_at)}
              </span>

              {returnedLate && (
                <span className={styles.late}>Returned late</span>
              )}
            </>
          )}
        </div> */
}
