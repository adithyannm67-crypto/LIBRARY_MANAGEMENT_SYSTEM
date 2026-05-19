"use client";
import { useEffect, useState } from "react";

import styles from "./page.module.css";
import { BookCard } from "../dashboardContent/components/BookCard/page";
import fetchBorrowedBooks from "../dashboardContent/Actions/BorrowedBooks";
export default function Catalog() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchBorrowedBooks();
      setBorrowedBooks(data);
      console.log(data);
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
