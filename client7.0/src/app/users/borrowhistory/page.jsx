"use client";

import styles from "./page.module.css";

import { useEffect, useState } from "react";

import fetchBorrowedBooks from "#root/components/usersHome/Actions/BorrowedBooks";
import { BookCard } from "#root/components/usersHome/components/availableBookCard.jsx";

export default function Catalog() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchBorrowedBooks();
      setBorrowedBooks(data);
    }
    fetchData();
  }, []);
  return (
    <>
      <h1 align="center">YOUR BORROW HISTORY</h1>
      <div className={styles.bookList}>
        {borrowedBooks.map((book) => (
          <BookCard key={book.borrowid} book={book} />
        ))}
      </div>
    </>
  );
}
