

import styles from "./component.module.css";

import { BookActionForReturn as BookAction } from "./clientComponents.jsx";

import { formatDate, formatDateandTime } from "#root/shared/utils/utils.js";
import { getBadge } from "../utils/components.utils";

export function BookCard({ book, isUserHome, clickHandler }) {
  const { title, authorString, borrowdate, duedate, returndate } = book;

  const { badge, cls } = getBadge(duedate, returndate);

  const isReturned = returndate !== null;

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
      <BookAction
        book={book}
        isReturned={isReturned}
        isUserHome={isUserHome}
        clickHandler={clickHandler}
      />
    </div>
  );
}
