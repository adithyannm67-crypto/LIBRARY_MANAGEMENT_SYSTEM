import styles from "./page.module.css";
import borrowBook from "#root/Actions/borrow";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function Popup({ updateStats, book, isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  async function handleBorrow() {
    if (loading) return;

    setLoading(true);

    const id = toast.loading("Borrowing Book...");

    try {
      const { success, message, data } = await borrowBook(book.bookid);
      if (!success) throw new Error(message);

      toast.dismiss(id);

      if (success) {
        onClose();
        toast.success(message);
      } else {
        toast.error(message);
      }

      updateStats((prev) => {
        let newTotalBorrowsThisYear = prev.totalBorrowsThisYear;
        let newTotalBorrowsThisMonth = prev.totalBorrowsThisMonth;
        let newTotalBorrowsThisWeek = prev.totalBorrowsThisWeek;
        const now = new Date();
        let sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);

        const borrowDate = new Date(data.borrowdate);
        const dueDate = new Date(data.duedate);

        if (borrowDate.getFullYear() === now.getFullYear()) {
          newTotalBorrowsThisYear++;
          if (borrowDate.getMonth() === now.getMonth()) {
            newTotalBorrowsThisMonth++;
          }
        }

        if (borrowDate >= sevenDaysAgo && borrowDate <= now) {
          newTotalBorrowsThisWeek++;
        }


        const currentNearest =
          prev.nearestBorrows.length > 0
            ? new Date(prev.nearestBorrows[0].duedate)
            : null;
        const newNearest = dueDate;
        let newdNearestBorrows = prev.nearestBorrows;

        if (currentNearest === null || newNearest < currentNearest) {
          //if the new borrowed book has an earlier due date than the current nearest, it becomes the new nearest
          newdNearestBorrows = [data];
        } else if (newNearest.getTime() === currentNearest.getTime()) {
          //if the new borrowed book has the same due date as the current nearest, it is added to the nearest borrows list
          newdNearestBorrows = [...newdNearestBorrows, data];
        }

        return {
          ...prev,
          activeBorrows: [...prev.activeBorrows, data],
          currentBorrowsCount: prev.currentBorrowsCount + 1,
          totalBorrowsThisYear: newTotalBorrowsThisYear,
          totalBorrowsThisMonth: newTotalBorrowsThisMonth,
          totalBorrowsThisWeek: newTotalBorrowsThisWeek,

          nearestBorrows: newdNearestBorrows,
        };
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      toast.dismiss(id);
      setLoading(false);
    }
    //An invoice generation code goes here
  }
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{book.title}</h2>

        <p className={styles.author}>{book.author}</p>

        <p className={styles.message}>Do you want to borrow this book?</p>

        <div className={styles.actions}>
          <button className={styles.btn} onClick={onClose}>
            Cancel
          </button>

          <button
            className={styles.btn + " " + styles.borrow}
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
