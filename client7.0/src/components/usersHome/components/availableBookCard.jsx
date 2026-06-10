import styles from "./component.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";

import { getCoverUrl, getAuthorString } from "#root/common.jsx";

export function BookCard({ book }) {
  const { title, authors, genre, coverid } = book;
  const router = useRouter();
  const bookcardStyle = `${styles.bookCard1} ${styles.active}`;
  const bookCoverStyles = {
    background: "var(--book-cover)",
    height: "70px",
    width: "50px",
  };
  const authorString = getAuthorString(authors);
  return (
    <div
      className={bookcardStyle}
      onClick={() => {
        router.push(`users/bookdetails/${book.bookid}/?option=Borrow`);
      }}
    >
      {coverid ? (
        <img
          src={getCoverUrl(coverid)}
          alt="Book Cover"
          loading="lazy"
          height="70"
          width="50"
          style={{ objectFit: "cover", borderRadius: "4px" }}
        />
      ) : (
        <div className={styles.bookCover} style={bookCoverStyles} />
      )}

      <div className={styles.bookContent}>
        <h4 className={styles.bookTitle}>{title}</h4>

        <p className={styles.bookAuthor} style={{ margin: "0px" }}>
          By {authorString}
        </p>

        <p className={styles.recGenre}>• {genre}</p>
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
