"use client";
import styles from "./component.module.css";
import btnStyles from "@/shared/styles/common.module.css";

import { useState } from "react";

import { useBookDetails } from "../providers/bookdetails.provider";

const BookActions = ({ option, availablecopies, bookDetails }) => {
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

export default BookActions;
