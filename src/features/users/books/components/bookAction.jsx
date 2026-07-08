"use client";

import styles from "../styles/bookcard.module.css";

import { useAppData } from "#root/context/AppDataContext.jsx";
import { usePage } from "#root/features/users/books/providers/books.provider.js";

const BookActionForBorrow = ({ book }) => {
  const { borrowedBookIds } = useAppData();
  const { setSelectedBook } = usePage();

  const canBorrow =
    book.availablecopies > 0 && !borrowedBookIds.has(book.bookid);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setSelectedBook(book);
  };

  return (
    <button
      disabled={!canBorrow}
      onClick={handleClick}
      className={styles.borrowBtn}
    >
      Borrow
    </button>
  );
};

export default BookActionForBorrow;
