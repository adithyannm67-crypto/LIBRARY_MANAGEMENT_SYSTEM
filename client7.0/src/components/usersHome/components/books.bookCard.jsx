import styles from "./component.module.css";
import btnStyles from "#root/common.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";

export function BookCard({ book, onClick }) {
  const router = useRouter();
  const { title, author, genre, availablecopies } = book;
  const bookcardStyle = `${styles.bookCard3} ${styles.active}`;
  const bookCoverStyles = {
    background: "var(--book-cover)",
    height: "120px",
    width: "80px",
  };
  return (
    <div
      className={bookcardStyle}
      onClick={() => {
        router.push(`books/${book.bookid}`);
      }}
    >
      <div className={styles.bookCover} style={bookCoverStyles} />

      <div className={styles.bookContent}>
        <h4>{title}</h4>

        <p className={styles.bookAuthor}>{author}</p>

        <div className={styles.bookMeta}>
          <p className={styles.recGenre}>• {genre}</p>
          <br />
          <p>
            {availablecopies > 0
              ? `${availablecopies} Available`
              : "Out of Stock"}
          </p>
        </div>
        <div className={styles.bookActions}>
          <button
            className={btnStyles.btnPrimary}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
}

export function BookCardSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className={styles.bookCard3} key={index}>
        <Skeleton width={80} height={120} />

        <div className={styles.bookContent}>
          <h4>
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
