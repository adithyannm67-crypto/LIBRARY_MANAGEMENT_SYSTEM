import style from "./section.module.css";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { BookCard, BookCardSkeleton } from "../components/borrowedBookCard";
import Popup from "../components/dashBoard.popup";

import { useAppData } from "#root/context/AppDataContext.jsx";

export default function BorrowedBooksSection() {
  const { loading, stats } = useAppData();

  const { activeBorrows } = stats;

  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className={style.mainContent}>
      <div className={style.card}>
        <h2 className={style.cardTitle} style={{ flex: ".5" }}>
          {loading ? (
            <Skeleton />
          ) : activeBorrows.length > 0 ? (
            "Your Books"
          ) : (
            "All Books Have Been Returned"
          )}
        </h2>

        <div
          className={style.bookList}
          style={
            loading
              ? { height: "auto" }
              : { maxHeight: "400px", overflowY: "auto" }
          }
        >
          {loading ? (
            <BookCardSkeleton cards={3} />
          ) : (
            activeBorrows &&
            activeBorrows.map((book, index) => (
              <BookCard
                onClick={() => setSelectedBook(book)}
                key={index}
                book={book}
              />
            ))
          )}
        </div>

        {selectedBook && (
          <Popup
            mode="return"
            book={selectedBook}
            isOpen={!!selectedBook}
            onClose={() => {
              setSelectedBook(null);
              document.body.style.overflow = "auto";
            }}
          />
        )}
      </div>

      {loading ? (
        <Skeleton height={40} />
      ) : (
        <button
          onClick={() => router.push("/users/borrowhistory")}
          className={style.browseBtn}
        >
          Browse Catalog
        </button>
      )}
    </div>
  );
}
