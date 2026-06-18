import styles from "./component.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Image from "next/image";
import Link from "next/link";

import { getCoverUrl } from "#root/utils.js";
import { BookActionForBorrow as BookAction } from "./clientComponents";
import { BorrowedBadge } from "./clientComponents";

const bookCoverStyles = {
  background: "var(--book-cover)",
  height: "120px",
  width: "80px",
};

export function BookCard({ book }) {
  const { title, authorString, genre, availablecopies, coverid } = book;

  const isAvailable = availablecopies > 0;

  return (
    <Link
      href={`bookdetails/${book.bookid}?option=Borrow`}
      className={styles.bookCard3}
    >
      <div className={styles.bookCover} style={bookCoverStyles}>
        {coverid && (
          <Image
            src={getCoverUrl(coverid)}
            alt={`${title} cover`}
            loading="lazy"
            height={120}
            width={80}
            className={styles.coverImage}
          />
        )}
      </div>

      <div className={styles.bookContent}>
        <h3 className={styles.bookTitle2}>{title}</h3>

        <p className={styles.bookAuthor}> By {authorString}</p>

        <div className={styles.bookMeta}>
          <p className={styles.recGenre}>{genre}</p>

          <p className={styles.bookStatus}>
            {isAvailable ? (
              <span className={styles.available}>Available</span>
            ) : (
              <span className={styles.outOfStock}> Out of Stock</span>
            )}
          </p>
          <BorrowedBadge bookid={book.bookid} />
        </div>
        <>
          <BookAction book={book} />
        </>
      </div>
    </Link>
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
