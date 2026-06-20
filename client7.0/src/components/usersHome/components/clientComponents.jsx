"use client";

import styles from "./component.module.css";
import btnStyles from "#root/common.module.css";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAppData } from "#root/context/AppDataContext.jsx";
import { usePage as usePageBorrow } from "#root/app/users/borrowhistory/borrowhistory.provider.js";
import { usePage as usePageBook } from "#root/app/users/books/books.provider.js";

export const BorrowedBadge = ({ bookid }) => {
  const { borrowedBookIds } = useAppData();
  return (
    borrowedBookIds.has(bookid) && (
      <span className={styles.borrowed}>Already Borrowed</span>
    )
  );
};

export const BookActionForReturn = ({
  book,
  isReturned,
  isUserHome,
  clickHandler,
}) => {
  const router = useRouter();

  const page = usePageBorrow();

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const handleClick1 = () => {
    const option = isReturned ? "Borrow Again" : "Return";
    router.push(
      `bookdetails/${book.bookid}?option=${option}&from=${pathSegments[1]}`,
    );
  };
  const handleClick2 = () => {
    if (clickHandler) clickHandler();
    else page?.setSelectedBook(book);
  };

  return (
    <div className={styles.bookActions1}>
      {!isReturned && (
        <button className={styles.btn1} onClick={handleClick2}>
          Return
        </button>
      )}
      {!isUserHome && (
        <button className={styles.btn1} onClick={handleClick1}>
          View Book Details
        </button>
      )}
    </div>
  );
};

export const BookActionForBorrow = ({ book }) => {
  const { borrowedBookIds } = useAppData();
  const { setSelectedBook } = usePageBook();

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
