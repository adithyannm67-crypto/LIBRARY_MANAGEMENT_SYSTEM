import styles from "#root/common.module.css";
import returnBook from "#root/Actions/return.js";
import borrowBook from "#root/Actions/borrow";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function Popup({ mode, updateStats, book, isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  const modes = {
    borrow: {
      toastMessage: "Borrowing Book...",
      api: (book) => borrowBook(book.bookid),
      updator: borrowUpdator,
      message: "Do you want to borrow this book?",
      text: "Borrow",
    },
    return: {
      toastMessage: "Returning Book...",
      api: (book) => returnBook(book.borrowid),
      updator: returnUpdator,
      message: "Do you want to return this book?",
      text: "Return",
    },
  };

  const { toastMessage, api, updator, message, text } = modes[mode];

  async function operationHandler() {
    if (loading) return;

    setLoading(true);

    const id = toast.loading(toastMessage);

    try {
      const { success, message, data } = await api(book);
      
      if (!success) throw new Error(message);

      toast.dismiss(id);

      if (success) {
        onClose();
        toast.success(message);
      } else {
        toast.error(message);
      }

      updator(data, updateStats);
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

        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button className={styles.btn} onClick={onClose}>
            Cancel
          </button>

          <button
            className={`${styles.btn} ${styles.returnBtn}`}
            onClick={operationHandler}
            disabled={loading}
          >
            {text}
          </button>
        </div>
      </div>
    </div>
  );
}

const returnUpdator = (data, updateStats) => {
  const borrowid = Number(data.borrowid);

  updateStats((prev) => ({
    ...prev,
    currentBorrowsCount: prev.currentBorrowsCount - 1,
    activeBorrows: prev.activeBorrows.filter((b) => b.borrowid !== borrowid),
    nearestBorrows: prev.nearestBorrows.filter((b) => b.borrowid !== borrowid),
  }));
};

const borrowUpdator = (data, updateStats) => {
  updateStats((prev) => {
    console.log("hai");
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
};
