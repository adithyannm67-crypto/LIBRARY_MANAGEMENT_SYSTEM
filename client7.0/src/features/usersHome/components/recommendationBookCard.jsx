import styles from "./component.module.css";

import Link from "next/link";

import Image from "next/image";

import { getCoverUrl } from "#root/shared/utils/utils.js";

const bookCoverStyles = {
  background: "var(--book-cover)",
  height: "70px",
  width: "50px",
};

export function BookCard({ book }) {
  const { title, genre, coverid } = book;

  return (
    <Link
      href={`/users/bookdetails/${book.bookid}?option=Borrow`}
      className={styles.bookCard1}
    >
      <div className={styles.bookCover} style={bookCoverStyles}>
        {coverid && (
          <Image
            src={getCoverUrl(coverid)}
            alt={`${title} cover`}
            loading="lazy"
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
    </Link>
  );
}
