"use client";

import styles from "../component.module.css";
import btnStyles from "#root/common.module.css";

import { useState } from "react";

import { useAppData } from "#root/providers/AppDataContext.jsx";
import { usePage } from "#root/app/users/books/usePage";

const BookActionForBorrow = ({ book }) => {
  const { borrowedBookIds } = useAppData();
  const { setSelectedBook } = usePage();

  const [shake, setShake] = useState(false);

  const canBorrow =
    book.availablecopies > 0 && !borrowedBookIds.has(book.bookid);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!canBorrow) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000);
      return;
    }

    setSelectedBook(book);
  };

  return (
    <div className={styles.bookActions}>
      <button
        className={btnStyles.btnPrimary + " " + (shake && btnStyles.shake)}
        onClick={handleClick}
      >
        {canBorrow ? "Borrow" : "Unavailable"}
      </button>
    </div>
  );
};

export default BookActionForBorrow;
