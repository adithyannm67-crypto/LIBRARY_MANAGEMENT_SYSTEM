"use client";

import styles from "./page.module.css";

import { useState, useEffect } from "react";

import "react-loading-skeleton/dist/skeleton.css";

import fetchBorrowedBooks from "#root/components/usersHome/Actions/BorrowedBooks";
import {
  BookCard,
  BookCardSkeleton,
} from "#root/components/usersHome/components/borrowedBookCard.jsx";
import Popup from "#root/components/usersHome/components/dashBoard.popup.jsx";
import { useAppData } from "#root/context/AppDataContext.jsx";
export default function Catalog() {
  const { loading } = useAppData();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loadinglocal, setLoadingLocal] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoadingLocal(true);
      const data = await fetchBorrowedBooks();
      setBorrowedBooks(data);
      setLoadingLocal(false);
    }
    if (!loading) fetchData();
  }, [loading]);
  return (
    <>
      <div className={styles.bookList}>
        {loading || loadinglocal ? (
          <BookCardSkeleton cards={3} />
        ) : (
          borrowedBooks.map((book) => (
            <BookCard
              disabled={book.status !== "borrowed"}
              onClick={
                () => setSelectedBook(book)}
              key={book.borrowid}
              book={book}
            />
          ))
        )}
        {selectedBook && (
          <Popup
            mode="return"
            book={selectedBook}
            isOpen={!!selectedBook}
            onClose={() => {
              setSelectedBook(null);
              document.body.style.overflow = "auto";
            }}
            setBorrowedBooks={setBorrowedBooks}
          />
        )}
      </div>
    </>
  );
}
