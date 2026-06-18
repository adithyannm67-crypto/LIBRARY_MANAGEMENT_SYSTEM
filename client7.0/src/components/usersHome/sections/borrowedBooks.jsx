"use client";

import style from "./section.module.css";

import Link from "next/link";
import { useState } from "react";

import { BookCard } from "../components/borrowedBookCard";
import Popup from "../components/dashBoard.popup";

import { useAppData } from "#root/context/AppDataContext.jsx";

export default function BorrowedBooksSection() {
  const { stats } = useAppData();

  const isBookPreset = stats.activeBorrows.length > 0;

  const [selectedBook, setSelectedBook] = useState(null);

  const cardStyles = {
    display: `${!isBookPreset ? "none" : ""}`,
    flex: ".5",
  };

  return (
    <div className={style.mainContent}>
      <div className={style.card}>
        <h2 className={style.cardTitle} style={cardStyles}>
          {isBookPreset && "Your Books"}
        </h2>

        <div className={style.bookList}>
          {stats.activeBorrows.length > 0 ? (
            <>
              {stats.activeBorrows.map((book, _) => (
                <BookCard
                  book={book}
                  key={book.borrowid}
                  clickHandler={() => setSelectedBook(book)}
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

      <Link href="/users/borrowhistory" className={style.browseBtn}>
        Browse Catalog
      </Link>
    </div>
  );
}
