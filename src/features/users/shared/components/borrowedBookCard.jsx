import styles from "../styles/borrowedbookcard.module.css";

import BookAction from "./bookAction";
import BorrowStatusBadge from "./badges/BorrowedStatusBadge";
import Cover from "./coverimage";

import {
  formatDate,
  formatDateandTime,
} from "#root/features/users/shared/utils/utils.js";

export function BookCard({ book, isUserHome = false, clickHandler }) {
  const { title, authorString, borrowdate, duedate, returndate } = book;

  const daysLeft = Math.ceil(
    (new Date(duedate) - new Date()) / (1000 * 60 * 60 * 24),
  );

  const isReturned = returndate !== null;

  const STATS = [
    {
      label: "Borrowed",
      value: formatDate(borrowdate),
    },
    {
      label: "Due",
      value: isReturned ? null : formatDate(duedate),
    },
    {
      label: "Returned",
      value: isReturned ? formatDateandTime(returndate) : null,
    },
  ];

  return (
    <div className={styles.borrowCard}>
      <div className={styles.cover}>
        <Cover
          coverurl={book.coverurl}
          width={80}
          height={115}
          title={book.title}
          priority={false}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <p className={styles.author}>By {authorString}</p>

        <div className={styles.meta}>
          <BorrowStatusBadge duedate={duedate} returndate={returndate} />
          {STATS.map(
            (stat) =>
              stat.value !== null && (
                <span key={stat.label}>
                  {stat.label}: <strong>{stat.value}</strong>
                </span>
              ),
          )}

          {!isReturned && (
            <span className={styles.daysLeft}>{daysLeft} days left</span>
          )}
        </div>
      </div>
      <BookAction
        bookid={book.bookid}
        isReturned={isReturned}
        isUserHome={isUserHome}
        clickHandler={clickHandler}
      />
    </div>
  );
}
