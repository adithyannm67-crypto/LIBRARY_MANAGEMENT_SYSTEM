"use client";

import styles from "./page.module.css";
import btnStyles from "#root/common.module.css";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { fetchBookById } from "#root/components/usersHome/Actions/AvailableBooks.js";
import Popup from "#root/components/usersHome/components/dashBoard.popup.jsx";
import { useAppData } from "#root/context/AppDataContext.jsx";
import { getCoverUrl, getAuthorString, formatDate } from "#root/common.jsx";

export default function Page() {
  const { bookid } = useParams();
  const option = useSearchParams().get("option");
  const from = useSearchParams().get("from");

  const { loading, stats } = useAppData();

  const borrowed = stats?.activeBorrows
    .map((b) => b.bookid)
    .includes(Number(bookid));

  const [bookDetails, setBookDetails] = useState({});
  const [bookLoaded, setBookLoaded] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (loading) return;
    let mounted = true;
    async function fetchData() {
      setBookLoaded(true);
      try {
        const book = await fetchBookById(bookid);
        const formattedData = {
          ...book,
          authorString: getAuthorString(book.authors),
        };
        if (mounted) setBookDetails(formattedData);
      } catch (err) {
        console.error(err.message);
      } finally {
        if (mounted) setBookLoaded(false);
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, [loading, bookid]);

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
  } = bookDetails;

  let btnText = option;

  btnText =
    btnText.includes("Borrow") && (availablecopies === 0 || borrowed)
      ? "Unavailable"
      : btnText;

  const isLoading = loading || bookLoaded;

  const btnClass = btnStyles.btnPrimary + " " + (shake ? btnStyles.shake : " ");

  const DETAILS = [
    { label: "Author", value: authorString },
    { label: "Genre", value: genre },
    { label: "Published", value: formatDate(publishdate) },
    { label: "Publisher", value: publishers },
  ];

  const handleClick = () => {
    if (availablecopies === 0 && option.includes("Borrow")) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000);
      return;
    }

    setSelectedBook(bookDetails);
  };

  return (
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
          <h1>{isLoading ? <Skeleton /> : `${title}`}</h1>
          {DETAILS.map((detail) => (
            <DetailsRow
              key={detail.label}
              label={detail.label}
              value={detail.value}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
      <div className={styles.bookDescription}>
        {description &&
          (isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <details className={styles.bookDescription}>
              <summary>Description</summary>
              <p>{description}</p>
            </details>
          ))}
        <p>
          {isLoading ? (
            <Skeleton />
          ) : (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`https://openlibrary.org${editionid}`}
            >
              Open in Open Library
            </Link>
          )}
        </p>
        <div className={styles.bookStatus}>
          {isLoading ? (
            <Skeleton />
          ) : availablecopies > 0 ? (
            <span className={styles.available}>
              Available Copies : {availablecopies}
            </span>
          ) : (
            <span className={styles.outOfStock}>*Out of Stock</span>
          )}
          {borrowed && (
            <span className={styles.borrowed}>Already Borrowed</span>
          )}
        </div>

        <div className={styles.bookActions}>
          <button className={btnClass} onClick={handleClick}>
            {btnText}
          </button>
        </div>
      </div>
      {selectedBook && (
        <Popup
          from={from}
          mode={option.includes("Borrow") ? "borrow" : "return"}
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => {
            setSelectedBook(null);
            document.body.style.overflow = "auto";
          }}
        />
      )}
    </div>
  );
}

const DetailsRow = ({ label, value, isLoading }) => {
  return (
    <p className={styles.detailsRow}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <span className={styles.label}>{label}</span>: <span>{value}</span>
        </>
      )}
    </p>
  );
};
