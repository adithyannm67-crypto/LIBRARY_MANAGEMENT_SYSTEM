import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./page.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import BookCardSkeleton from "../components/bookCardSkeleton";

import { BookCard } from "../components/BookCard/page";
import Popup from "../components/dashBoard.popup";

export default function BorrowedBooksSection({ loading, stats, updateStats }) {
  const { activeBorrows } = stats;

  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className={style.mainContent}>
      <div className={style.card}>
        <h2 className={style.sectionTitle}>
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
            updateStats={updateStats}
            book={selectedBook}
            isOpen={!!selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>

      {loading ? (
        <Skeleton height={40} />
      ) : (
        <button
          onClick={() => router.push("/dashboard/catalog")}
          className={style.browseBtn}
        >
          Browse Catalog
        </button>
      )}
    </div>
  );
}
