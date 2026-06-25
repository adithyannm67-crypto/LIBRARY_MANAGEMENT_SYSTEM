import styles from "./component.module.css";

import common from "../styles/common.styles.module.css";

import BookAction from "./bookAction";
import BorrowStatusBadge from "./badges/BorrowedStatusBadge";

import {
  formatDate,
  formatDateandTime,
} from "#root/features/users/shared/utils/utils.js";

export function BookCard({ book, isUserHome = false, clickHandler }) {
  const { title, authorString, borrowdate, duedate, returndate } = book;

  const isReturned = returndate !== null;

  return (
    <div className={styles.borrowedBookCard}>
      <div className={styles.bookContent}>
        <h3 className={common.bookTitle}>{title}</h3>
        <p className={common.bookAuthor}>{authorString}</p>
        <div className={common.bookStatus}>
          <BorrowStatusBadge duedate={duedate} returndate={returndate} />
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
      <BookAction
        book={book}
        isReturned={isReturned}
        isUserHome={isUserHome}
        clickHandler={clickHandler}
      />
    </div>
  );
}
