import { Clock, AlertCircle, CheckCircle, Dot } from "lucide-react";
import styles from "./page.module.css";
import cardStyles from "#root/common.module.css";

export function BookCard({ book, onClick }) {
  const isOverdue = new Date(book.duedate) < new Date() && !book.returndate;
  const returnedLate =
    book.returndate && new Date(book.returndate) > new Date(book.duedate);
  const StatusIcon = book.returndate
    ? returnedLate
      ? AlertCircle
      : CheckCircle
    : isOverdue
      ? AlertCircle
      : Clock;
  return (
    <div
      className={cardStyles.bookCard1 + " " + cardStyles.bookCard2}
      onClick={onClick}
    >
      <div className={cardStyles.bookCover} style={{ background: "var(--book-cover)" }} />

      <div className={cardStyles.bookContent}>
        <h3 className={cardStyles.bookTitle}>{book.title}</h3>

        <p className={cardStyles.bookAuthor}>{book.author}</p>

        <div className={cardStyles.bookStatus}>
          <div className={styles.iconWrapper}>
            <StatusIcon />
          </div>
          <span>Borrowed on {book.borrowdate}</span>

          {!book.returndate && (
            <>
              <Dot />
              <span className={`${isOverdue ? styles.overdue : ""}`}>
                {isOverdue ? "Overdue since " : "Due on "} {book.duedate}
              </span>
            </>
          )}

          {book.returndate && (
            <>
              <Dot />
              <span className={styles.returned}>
                Returned on {book.returndate}
              </span>

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
