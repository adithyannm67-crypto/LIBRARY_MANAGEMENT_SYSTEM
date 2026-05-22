import styles from "./page.module.css";
import returnBook from "#root/Actions/return.js";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function Popup({ updateStats, book, isOpen, onClose }) {
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

      updateStats((prev) => ({
        ...prev,
        currentBorrowsCount: prev.currentBorrowsCount - 1,
        activeBorrows: prev.activeBorrows.filter(
          (b) => b.borrowid !== borrowid,
        ),
        nearestBorrows: prev.nearestBorrows.filter(
          (b) => b.borrowid !== borrowid,
        ),
      }));

    } catch (err) {
      
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
