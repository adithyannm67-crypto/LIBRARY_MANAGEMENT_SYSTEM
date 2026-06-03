"use client";

import styles from "./page.module.css";

import { useState } from "react";
import Link from "next/link";

import {
  BookCard,
  BookCardSkeleton,
} from "#root/components/usersHome/components/borrowedBookCard.jsx";
import Popup from "#root/components/usersHome/components/dashBoard.popup.jsx";

import { useAppData } from "#root/context/AppDataContext.jsx";

export default function Page() {
  const { stats } = useAppData();
  const { activeBorrows } = stats;

  const [selectedBook, setSelectedBook] = useState(null);
  return (
    <div className={styles.bookList}>
      {activeBorrows.length > 0 ? (
        activeBorrows.map((book) => (
          <BookCard
            book={book}
            key={book.borrowid}
            onClick={() => setSelectedBook(book)}
          />
        ))
      ) : (
        <>
          <p>No active borrows </p>
          <Link href="/users/books">Click here to discover new books....</Link>
        </>
      )}
      {selectedBook && (
        <Popup
          text="return"
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
  );
}
