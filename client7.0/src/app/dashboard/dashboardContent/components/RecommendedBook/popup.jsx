"use client";

import "./page.css";
import borrowBook from "../../Actions/borrow";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useBorrow } from "@/app/context/borrowContext";
import { Preahvihear } from "next/font/google";

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
  const { addBorrowedBook } = useBorrow();
  async function handleBorrow() {
    if (loading) return;

    setLoading(true);

    const id = toast.loading("Borrowing Book...");

    try {
      const { success, message, data } = await borrowBook(book.bookid);
      console.log(data);

      toast.dismiss(id);

      if (success) {
        onClose();
        toast.success(message);

        addBorrowedBook(data);
      } else {
        toast.error(message);
      }
      setCurrentBorrowsCount((prev) => prev + 1);
      setBorrowedBooks((prev) => [...prev, data]);
      setTotalBorrowsThisYear((prev) => prev + 1);
      //Need to consider the case :  " if the user is on dec 31 and opens the site for borrowing the book on jan 1st. then the totlalBorrowsThisYear should be 1. As of now it will be added to the previous year."
      setNearestBorrows((prev) =>
        prev[0].duedate < data.duedate ? [data] : [...prev, data],
      );
      /* 
      when the book is borrowed the nearest is updated to latest borrow....
      when refreshes it will be the min date (earler dues)...This neeeds to be addressed...
      i should create a good ui for the nearest borrow stats card to dues in different scenarios...
      (eg: if upcoming exists....if all are overdue ,etc)
      chatgpt: due date logic update
      */
    } catch (err) {
      // setLoading(false);
      toast.error("Book Borrow Failed");
    } finally {
      toast.dismiss(id);
      setLoading(false);
    }
    //An invoice generation code goes here
  }
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="title">{book.title}</h2>

        <p className="author">{book.author}</p>

        <p className="message">Do you want to borrow this book?</p>

        <div className="actions">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn borrow"
            onClick={handleBorrow}
            disabled={loading}
          >
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
}
