"use client";

import styles from "./page.module.css";
import returnBook from "../../Actions/return";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function Popup({
  setBorrowedBooks,
  setTotalBorrowsThisYear,
  setCurrentBorrowsCount,
  setNearestBorrows,
  book,
  isOpen,
  onClose,
}) {
  const [loading, setLoading] = useState(false);
  async function handleReturn() {
    if (loading) return;

    setLoading(true);

    const id = toast.loading("Returning Book...");

    try {
      const borrowid = book.borrowid;
      const { success, message, data } = await returnBook(borrowid);
      if (!success) throw new Error(message);

      toast.dismiss(id);

      if (success) {
        onClose();
        toast.success(message);
      } else {
        toast.error(message);
      }
      setCurrentBorrowsCount((prev) => prev - 1);
      setBorrowedBooks((prev) => prev.filter((b) => b.borrowid !== borrowid));
      setTotalBorrowsThisYear((prev) => prev - 1);
      //Need to consider the case :  " if the user is on dec 31 and opens the site for borrowing the book on jan 1st. then the totlalBorrowsThisYear should be 1. As of now it will be added to the previous year."
      setNearestBorrows(
        (prev) => (prev = prev.filter((b) => b.borrowid !== borrowid)),
      );
    } catch (err) {
      // setLoading(false);
      toast.error(err.message);
    } finally {
      toast.dismiss(id);
      setLoading(false);
    }
    //An invoice generation code goes here
  }
  if (!isOpen) return null;
  console.log(book);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{book.title}</h2>

        <p className={styles.author}>{book.author}</p>

        <p className={styles.message}>Do you want to return this book?</p>

        <div className={styles.actions}>
          <button className={styles.btn} onClick={onClose}>
            Cancel
          </button>

          <button
            className={`${styles.btn} ${styles.returnBtn}`}
            onClick={handleReturn}
            disabled={loading}
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
}
