import styles from "./component.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function BookCard({ book, onClick }) {
  const { title, author, genre } = book;
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
        <div className={styles.bookCover}>
          <Skeleton width="100%" height="100%" />
        </div>
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
