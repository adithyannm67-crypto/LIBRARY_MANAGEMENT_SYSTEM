import styles from "./component.module.css";
import btnStyles from "#root/common.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import { getCoverUrl } from "#root/common.jsx";

const bookCoverStyles = {
  background: "var(--book-cover)",
  height: "120px",
  width: "80px",
};


export function BookCard({ borrowed, book, onClick }) {
  const router = useRouter();
  const [shake, setShake] = useState(false);
  const { title, authorString, genre, availablecopies, coverid } = book;

  const isAvailable = availablecopies > 0;
  const canBorrow = isAvailable && !borrowed;

  const handleClick = (e) => {
    e.stopPropagation();
    if (!canBorrow) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000);
      return;
    }
    onClick();
  };

  return (
    <div
      className={styles.bookCard3}
      onClick={() => {
        router.push(`bookdetails/${book.bookid}?option=Borrow`);
      }}
    >
      <div className={styles.bookCover} style={bookCoverStyles}>
        {coverid && (
          <Image
            src={getCoverUrl(coverid)}
            alt={`${title} cover`}
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
          {borrowed && (
            <p>
              <span className={styles.borrowed}>Already Borrowed</span>
            </p>
          )}
        </div>
        <div className={styles.bookActions}>
          <button
            className={btnStyles.btnPrimary + " " + (shake && btnStyles.shake)}
            onClick={handleClick}
          >
            {canBorrow ? "Borrow" : "Unavailable"}
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
