"use client";

import styles from "./page.module.css";

import { useState, useEffect } from "react";

import "react-loading-skeleton/dist/skeleton.css";

import fetchBorrowedBooks from "#root/components/usersHome/Actions/BorrowedBooks";
import { BookCard, BookCardSkeleton } from "#root/components/usersHome/components/borrowedBookCard.jsx";
import { useAppData } from "#root/context/AppDataContext.jsx";
export default function Catalog() {
  const { loading } = useAppData()
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loadinglocal, setLoadingLocal] = useState(true);

  useEffect(() => {

    async function fetchData() {
      setLoadingLocal(false);
      const data = await fetchBorrowedBooks();
      setBorrowedBooks(data);
      setLoadingLocal(false);
      console.log(data)
    }
    if (!loading)
      fetchData();

  }, [loading]);
  return (
    <>
      <div className={styles.bookList}>
        {(loading || loadinglocal) ? <BookCardSkeleton cards={3} /> : borrowedBooks.map((book) => (
          <BookCard key={book.borrowid} book={book} />
        ))}
      </div>
    </>
  );
}
