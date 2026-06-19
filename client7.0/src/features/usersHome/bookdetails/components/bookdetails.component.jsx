"use client";

import styles from "@/app/users/bookdetails/[bookid]/page.module.css";
import btnStyles from "#root/shared/styles/common.module.css";

import { useState } from "react";

import { useBookDetails } from "../../bookdetails/providers/bookdetails.context";

export const BorrowedBadge = () => {
  const { borrowed } = useBookDetails();
  return borrowed && <span className={styles.borrowed}>Already Borrowed</span>;
};

export const BookActions = ({ option, availablecopies, bookDetails }) => {
  const { setSelectedBook, borrowed } = useBookDetails();
  const [shake, setShake] = useState(false);
  let btnText = option;
  btnText =
    btnText.includes("Borrow") && (availablecopies === 0 || borrowed)
      ? "Unavailable"
      : btnText;

  const btnClass = btnStyles.btnPrimary + " " + (shake ? btnStyles.shake : " ");

  const handleClick = () => {
    if (availablecopies === 0 && option.includes("Borrow")) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000);
      return;
    }

    setSelectedBook(bookDetails);
  };

  return (
    <div className={styles.bookActions}>
      <button className={btnClass} onClick={handleClick}>
        {btnText}
      </button>
    </div>
  );
};

export const PopupContainer = ({ option, from }) => {
  const { selectedBook, setSelectedBook } = useBookDetails();
  return (
    selectedBook && (
      <Popup
        from={from}
        mode={option.includes("Borrow") ? "borrow" : "return"}
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => {
          setSelectedBook(null);
          document.body.style.overflow = "auto";
        }}
      />
    )
  );
};
