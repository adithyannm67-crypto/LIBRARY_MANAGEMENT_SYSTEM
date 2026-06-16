import styles from "./component.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { getCoverUrl } from "#root/common.jsx";

const bookCoverStyles = {
  background: "var(--book-cover)",
  height: "70px",
  width: "50px",
};

export function BookCard({ book }) {
  const { title, genre, coverid } = book;
  const router = useRouter();

  return (
    <div
      className={styles.bookCard1}
      onClick={() => {
        router.push(`users/bookdetails/${book.bookid}?option=Borrow`);
      }}
    >
      <div className={styles.bookCover} style={bookCoverStyles}>
        {coverid && (
          <Image
            src={getCoverUrl(coverid)}
            alt={`${title} cover`}
            height={70}
            width={50}
            className={styles.coverImage}
          />
        )}
      </div>

      <div className={styles.bookContent}>
        <h4 className={styles.bookTitle}>{title}</h4>

        <span className={styles.bookAuthor}>By {book.authorString}</span>

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
