import common from "@/features/users/shared/styles/common.styles.module.css";
import styles from "../styles/bookcard.module.css";

import Link from "next/link";

import BookAction from "./bookAction";
import CoverImage from "@/features/users/shared/components/coverimage";
import AvailabilityBadge from "@/features/users/shared/components/badges/AvailabilityBadge";
import AlreadyBorrowedBadge from "@/features/users/shared/components/badges/AlreadyBorrowedBadge";

export function BookCard({ book }) {
  const { title, authorString, genre, availablecopies, coverurl } = book;

  return (
    <Link
      href={`/users/bookdetails/${book.bookid}?option=Borrow`}
      className={styles.bookCard}
    >
      <CoverImage
        coverurl={coverurl}
        width={100}
        height={150}
        priority={false}
        title={title}
      />

      <div className={styles.content}>
        <h3 className={styles.title}>{book.title}</h3>

        <p className={styles.author}>By {book.authorString}</p>

        <div className={styles.meta}>
          <span className={styles.genre}>📚 {book.genre}</span>

          <span className={styles.rating}>⭐ {book.averagerating}</span>
          <span>📄 {book.pages} pages</span>
        </div>

        <div className={styles.stats}>
          <AvailabilityBadge
            t={title}
            isAvailable={Boolean(availablecopies > 0)}
          />
          <AlreadyBorrowedBadge bookid={book.bookid} />
        </div>

        <BookAction book={book} />
      </div>
    </Link>
  );

  return (
    <Link
      href={`/users/bookdetails/${book.bookid}?option=Borrow`}
      className={styles.bookCard}
    >
      <CoverImage
        coverurl={coverurl}
        width={80}
        height={120}
        priority={false}
        title={title}
      />

      <div className={styles.bookContent}>
        <h3 className={styles.bookTitle}>{title}</h3>

        <p className={common.bookAuthor}> By {authorString}</p>

        <div className={styles.bookMeta}>
          <p className={common.recGenre}>{genre}</p>

          <p className={common.bookStatus}>
            <AvailabilityBadge
              t={title}
              isAvailable={Boolean(availablecopies > 0)}
            />
            <AlreadyBorrowedBadge bookid={book.bookid} />
          </p>
        </div>

        <BookAction book={book} />
      </div>
    </Link>
  );
}
