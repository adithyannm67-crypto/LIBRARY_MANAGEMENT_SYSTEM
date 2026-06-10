import style from "./section.module.css";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { BookCard, BookCardSkeleton } from "../components/borrowedBookCard";
import Popup from "../components/dashBoard.popup";

import { useAppData } from "#root/context/AppDataContext.jsx";

export default function BorrowedBooksSection() {
  const { loading, stats } = useAppData();

  const { activeBorrows } = stats;
  const isBookPreset = activeBorrows.length > 0;

  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className={style.mainContent}>
      <div className={style.card}>
        <h2
          className={style.cardTitle}
          style={{ flex: ".5", display: `${!isBookPreset ? "none" : ""}` }}
        >
          {loading ? <Skeleton /> : isBookPreset && "Your Books"}
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
          ) : activeBorrows.length > 0 ? (
            <>
              {activeBorrows.map((book, index) => (
                console.log(book),
                <BookCard
                  onClick={() => setSelectedBook(book)}
                  key={index}
                  book={book}
                />
              ))}
              <Link className={style.viewAll} href="/users/myborrows">
                View in Detail
              </Link>
            </>
          ) : (
            <>
              <p>No active borrows </p>
              <Link href="/users/books">
                Click here to discover new books....
              </Link>
            </>
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
