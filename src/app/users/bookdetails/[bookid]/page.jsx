import styles from "./page.module.css";

import Link from "next/link";

import fetchBookById from "#root/lib/server/actions/fetchBookById.js";

import { formatDate } from "#root/features/users/shared/utils/utils.js";
import formatBook from "#root/features/users/shared/utils/formatBook.js";

import BookActions from "@/features/users/bookdetails/components/bookactions";
import PopupContainer from "@/features/users/bookdetails/components/popup";
import CoverImage from "@/features/users/shared/components/coverimage";
import AvailabilityBadge from "@/features/users/shared/components/badges/AvailabilityBadge";
import AlreadyBorrowedBadge from "@/features/users/shared/components/badges/AlreadyBorrowedBadge";

import BookDetailsProvider from "@/features/users/bookdetails/providers/bookdetails.provider";

export default async function Page({ params, searchParams }) {
  const { bookid } = await params;
  const { option, from } = await searchParams;

  let book = await fetchBookById(bookid);
  book = formatBook(book);

  const {
    title,
    authorString,
    genre,
    availablecopies,
    publishdate,
    publishers,
    editionid,
    description,
    coverurl,
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
            <CoverImage
              coverurl={coverurl}
              width={200}
              height={300}
              priority="true"
              title={title}
            />
          </div>
          <div className={styles.bookDetails}>
            <h1>{title}</h1>
            {DETAILS.map(({ label, value }) => (
              <p key={label} className={styles.detailsRow}>
                <span className={styles.label}>{label}</span>:{" "}
                <span>{value}</span>
              </p>
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
            <AvailabilityBadge isAvailable={availablecopies > 0} />
            <AlreadyBorrowedBadge bookid={bookid} />
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
