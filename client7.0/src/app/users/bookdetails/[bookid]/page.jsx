"use client";

import styles from "./page.module.css";
import btnStyles from "#root/common.module.css";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { fetchBookById } from "#root/components/usersHome/Actions/AvailableBooks.js";
import Popup from "#root/components/usersHome/components/dashBoard.popup.jsx";
import { useAppData } from "#root/context/AppDataContext.jsx";
import { getCoverUrl, formatDate, getAuthorString } from "#root/common.jsx";

export default function Page() {
  const { bookid } = useParams();
  const option = useSearchParams().get("option");
  const from = useSearchParams().get("from");
  const { loading, stats } = useAppData();

  const borrowed = stats?.activeBorrows
    .map((b) => b.bookid)
    .includes(Number(bookid));
  const [bookDetails, setBookDetails] = useState({});
  const [loadinglocal, setLoadingLocal] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [shake, setShake] = useState(false);
  async function fetchData() {
    setLoadingLocal(true);
    const book = await fetchBookById(bookid);
    const formattedData = {
      ...book,
      authors: getAuthorString(book.authors),
    };
    setBookDetails(formattedData);
    setLoadingLocal(false);
  }
  useEffect(() => {
    if (!loading) fetchData();
  }, [bookid, loading]);
  const {
    title,
    authors,
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
    btnText.includes("Borrow") && availablecopies === 0
      ? "Unavailable"
      : btnText;

  const btnClass = btnStyles.btnPrimary + " " + (shake ? btnStyles.shake : " ");

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.bookCoverContainer}>
          {coverid ? (
            <img
              src={getCoverUrl(coverid)}
              alt="Book Cover"
              loading="lazy"
              height="300"
              width="200"
              style={{ objectFit: "cover", borderRadius: "4px" }}
            />
          ) : (
            <div className={styles.bookCover}></div>
          )}
        </div>
        <div className={styles.bookDetails}>
          <h1 style={{ textAlign: "center", marginBottom: "0" }}>
            {loading || loadinglocal ? <Skeleton /> : `${title}`}
          </h1>
          <p className={styles.detailsRow}>
            {loading || loadinglocal ? (
              <Skeleton />
            ) : (
              <>
                <span className={styles.label}>Author</span>:{" "}
                <span>{authors}</span>
              </>
            )}
          </p>
          <p className={styles.detailsRow}>
            {loading || loadinglocal ? (
              <Skeleton />
            ) : (
              <>
                <span className={styles.label}>Genre</span>:{" "}
                <span>{genre}</span>
              </>
            )}
          </p>
          <p className={styles.detailsRow}>
            {loading || loadinglocal ? (
              <Skeleton />
            ) : (
              <>
                <span className={styles.label}>Publish Date</span>:{" "}
                <span>{publishdate}</span>
              </>
            )}
          </p>
          <p className={styles.detailsRow}>
            {loading || loadinglocal ? (
              <Skeleton />
            ) : (
              <>
                <span className={styles.label}>Publisher</span>:{" "}
                <span>{publishers}</span>
              </>
            )}
          </p>
        </div>
      </div>
      <div className={styles.bookDescription}>
        {description && (
          <>
            {loading || loadinglocal ? (
              <>
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              <details style={{ width: "100%" }}>
                <summary styles={{ cursor: "pointer" }}>Description</summary>
                <p style={{ overflowWrap: "break-word" }}>{description}</p>
              </details>
            )}
          </>
        )}
        <p>
          {loading || loadinglocal ? (
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px",
          }}
        >
          {loading || loadinglocal ? (
            <Skeleton />
          ) : availablecopies > 0 ? (
            <span
              style={{
                background: "var(--success)",
                padding: "4px",
                borderRadius: "9999px",
                textAlign: "center",
              }}
            >
              Available Copies : {availablecopies}
            </span>
          ) : (
            <span
              style={{
                backgroundColor: "var(--failure)",
                padding: "4px",
                borderRadius: "9999px",
                textAlign: "center",
              }}
            >
              {" "}
              *Out of Stock
            </span>
          )}
          {borrowed && (
            <span
              style={{
                background: "#7e7d7d",

                padding: "4px",
                borderRadius: "9999px",
              }}
            >
              Already Borrowed
            </span>
          )}
        </div>

        <div className={styles.bookActions}>
          <button
            className={btnClass}
            onClick={(e) => {
              if (availablecopies === 0 && option.includes("Borrow")) {
                setShake(true);
                setTimeout(() => {
                  setShake(false);
                }, 1000);
                return;
              }
              e.stopPropagation();
              setSelectedBook(bookDetails);
            }}
          >
            {btnText}
          </button>
        </div>
        {selectedBook && (
          <Popup
            from={from}
            fetchData={fetchData}
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
    </div>
  );
}
