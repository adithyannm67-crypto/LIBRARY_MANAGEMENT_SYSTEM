"use client";

import common from "./component.module.css";
import btnStyles from "@/shared/styles/common.module.css";

import { useState } from "react";

import { useAppData } from "#root/context/AppDataContext.jsx";
import { usePage } from "#root/features/users/books/providers/books.provider.js";

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
    <div className={common.bookActions}>
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
