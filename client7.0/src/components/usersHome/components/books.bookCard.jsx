import styles from "./component.module.css";
import btnStyles from "#root/common.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { getCoverUrl, getAuthorString } from "#root/common.jsx";

export function BookCard({ borrowed, book, onClick }) {
  const router = useRouter();
  const [shake, setShake] = useState(false);
  const { title, authors, genre, availablecopies, coverid } = book;
  const bookcardStyle = `${styles.bookCard3} ${styles.active}`;
  const bookCoverStyles = {
    background: "var(--book-cover)",
    height: "120px",
    width: "80px",
  };
  const authorString = getAuthorString(authors);
  return (
    <div
      className={bookcardStyle}
      style={availablecopies === 0 || borrowed ? {} : {}}
      onClick={() => {
        router.push(`bookdetails/${book.bookid}/?option=Borrow`);
      }}
    >
      <div className={styles.bookCover} style={bookCoverStyles}>
        {coverid && (
          <img
            src={getCoverUrl(coverid)}
            alt="Book Cover"
            loading="lazy"
            height="120"
            width="80"
            style={{ objectFit: "cover", borderRadius: "4px" }}
          />
        )}
      </div>

      <div className={styles.bookContent}>
        <h3
          align="center"
          style={{
            margin: "0px",
            transform: "scaleY(1.2)",
            minHeight: "3.4rem",
          }}
        >
          {title}
        </h3>

        <p className={styles.bookAuthor}> By {authorString}</p>

        <div className={styles.bookMeta}>
          <p style={{ background: "#f3f4f6" }}>
            <span className={styles.recGenre}>{genre}</span>
          </p>
          <p>
            {availablecopies > 0 ? (
              <span
                style={{ background: "var(--success)", textAlign: "center" }}
              >
                Available
              </span>
            ) : (
              <span
                style={{ background: "var(--failure)", textAlign: "center" }}
              >
                {" "}
                Out of Stock
              </span>
            )}
          </p>
          {borrowed && (
            <p>
              <span style={{ background: "#acafb3" }}>Already Borrowed</span>
            </p>
          )}
        </div>
        <div className={styles.bookActions}>
          <button
            className={
              btnStyles.btnPrimary + " " + (shake ? btnStyles.shake : "")
            }
            onClick={(e) => {
              e.stopPropagation();
              if (availablecopies === 0 || borrowed) {
                setShake(true);
                setTimeout(() => {
                  setShake(false);
                }, 1000);
                return;
              }
              onClick();
            }}
          >
            {availablecopies === 0 || borrowed ? "Unavailable" : "Borrow"}
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
