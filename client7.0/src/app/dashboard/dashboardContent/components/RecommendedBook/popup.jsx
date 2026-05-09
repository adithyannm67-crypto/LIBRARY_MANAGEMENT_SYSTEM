"use client";

import "./page.css";
import borrowBook from "../../Actions/borrow";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useBorrow } from "@/app/context/borrowContext";

export default function Popup({ book, isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const { addBorrowedBook } = useBorrow();
  async function handleBorrow() {
    if (loading) return;

    setLoading(true);

    const id = toast.loading("Borrowing Book...");

    try {
      const { success, message, data } = await borrowBook(book.bookid);

      toast.dismiss(id);

      if (success) {
        onClose();
        toast.success(message);

        addBorrowedBook(data);
      } else {
        toast.error(message);
      }
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
