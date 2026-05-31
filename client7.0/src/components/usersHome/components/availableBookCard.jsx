import styles from "./component.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function BookCard({ book, onClick }) {
  const { title, author, genre } = book;
  const bookcardStyle = `${styles.bookCard1} ${styles.active}`;
  const bookCoverStyles = {
    background: "var(--book-cover)",
    height: "70px",
    width: "50px",
  };
  return (
    <div className={bookcardStyle} onClick={onClick}>
      <div className={styles.bookCover} style={bookCoverStyles} />

      <div className={styles.bookContent}>
        <h4 className={styles.bookTitle}>{title}</h4>

        <p className={styles.bookAuthor}>{author}</p>

        <div className={styles.bookMeta}>
          <span className={styles.recGenre}>• {genre}</span>
        </div>
      </div>
    </div>
  );
}

export function BookCardSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className={styles.bookCard1} key={index}>
        <Skeleton width={50} height={70} />

        <div className={styles.bookContent}>
          <h4 className={styles.bookTitle}>
            <Skeleton />
          </h4>

          <p className={styles.bookAuthor}>
            <Skeleton />
          </p>

          <div className={styles.bookMeta}>
            <span className={styles.recGenre}>
              <Skeleton />
            </span>
          </div>
        </div>
      </div>
    ));
}
