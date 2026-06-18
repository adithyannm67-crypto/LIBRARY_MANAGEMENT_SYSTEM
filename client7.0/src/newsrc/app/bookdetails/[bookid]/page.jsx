

import styles from "./page.module.css";

import Link from "next/link";
import Image from "next/image";

import { fetchBookById } from "#root/lib/server/bookActions.js";

import { getCoverUrl, getAuthorString, formatDate } from "#root/shared/utils/utils.js";
import { BookActions, BorrowedBadge, PopupContainer } from "@/newsrc/";

import BookDetailsProvider from "../../../features/users/bookdetails/providers/usePage";

export default async function Page({ params, searchParams }) {
  const { bookid } = await params;
  const { option, from } = await searchParams;

  let book = await fetchBookById(bookid);
  book = {
    ...book,
    authorString: getAuthorString(book.authors),
  };

  const {
    title,
    authorString,
    genre,
    availablecopies,
    coverid,
    publishdate,
    publishers,
    editionid,
    description,
  } = book;

  const DETAILS = [
    { label: "Author", value: authorString },
    { label: "Genre", value: genre },
    { label: "Published", value: formatDate(publishdate) },
    { label: "Publisher", value: publishers },
  ];

  return (
    <BookDetailsProvider bookid={bookid}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.bookCoverContainer}>
            {coverid ? (
              <Image
                src={getCoverUrl(coverid)}
                alt={`${title} cover`}
                height={300}
                width={200}
                priority
                fetchPriority="high"
                className={styles.coverImage}
              />
            ) : (
              <div className={styles.bookCover}></div>
            )}
          </div>
          <div className={styles.bookDetails}>
            <h1>{title}</h1>
            {DETAILS.map((detail) => (
              <DetailsRow
                key={detail.label}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </div>
        </div>
        <div className={styles.bookDescription}>
          {description && (
            <details className={styles.bookDescription}>
              <summary>Description</summary>
              <p>{description}</p>
            </details>
          )}
          <p>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`https://openlibrary.org${editionid}`}
            >
              Open in Open Library
            </Link>
          </p>
          <div className={styles.bookStatus}>
            {availablecopies > 0 ? (
              <span className={styles.available}>
                Available Copies : {availablecopies}
              </span>
            ) : (
              <span className={styles.outOfStock}>*Out of Stock</span>
            )}
            <BorrowedBadge />
          </div>

          <BookActions
            option={option}
            availablecopies={availablecopies}
            bookDetails={book}
          />
        </div>
        <PopupContainer option={option} from={from} />
      </div>
    </BookDetailsProvider>
  );
}

const DetailsRow = ({ label, value }) => {
  return (
    <p className={styles.detailsRow}>
      <span className={styles.label}>{label}</span>: <span>{value}</span>
    </p>
  );
};
