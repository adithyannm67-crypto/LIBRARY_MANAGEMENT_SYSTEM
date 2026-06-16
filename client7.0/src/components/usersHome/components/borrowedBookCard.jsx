import styles from "./component.module.css";

import { useRouter, usePathname } from "next/navigation";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { formatDate, formatDateandTime } from "#root/common.jsx";
import { getBadge } from "../utils/components.utils";

export function BookCard({ book, onClick }) {
  const router = useRouter();

  const { bookid, title, authorString, borrowdate, duedate, returndate } = book;

  const { badge, cls } = getBadge(duedate, returndate);

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isUserHome = pathSegments.length === 1;

  const isReturned = returndate !== null;

  const handleClick = () => {
    const option = isReturned ? "Borrow Again" : "Return";
    router.push(`bookdetails/${bookid}?option=${option}&from=${pathSegments[1]}`);
  };

  return (
    <div className={styles.bookCard1}>
      <div className={styles.bookContent}>
        <h3 className={styles.bookTitle}>{title}</h3>
        <p className={styles.bookAuthor}>{authorString}</p>
        <div className={styles.bookStatus}>
          <span className={`badge ${cls}`}>{badge}</span>
          {!isUserHome && (
            <details className={styles.detailsSection}>
              <summary>Borrowing Info</summary>
              <p>
                <span>Borrowed: {formatDateandTime(borrowdate)}</span>

                {!isReturned && <span>Due: {formatDate(duedate)}</span>}

                {isReturned && (
                  <span>Returned: {formatDateandTime(returndate)}</span>
                )}
              </p>
            </details>
          )}
        </div>
      </div>

      <div className={styles.bookActions1}>
        {!isReturned && (
          <button className={styles.btn1} onClick={onClick}>
            Return
          </button>
        )}
        {!isUserHome && (
          <button className={styles.btn1} onClick={handleClick}>
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
