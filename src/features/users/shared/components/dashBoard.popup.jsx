import styles from "../styles/dashboardPopup.styles.module.css";

import { toast } from "react-hot-toast";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

import returnBook from "../Actions/return.js";
import borrowBook from "../Actions/borrow";
import { formatDate } from "@/features/users/shared/utils/utils";

import { useAppData } from "#root/context/AppDataContext.jsx";

//setBorrowedBooks is for automaticallly update borrowed books in borrow history page

export default function Popup({
  from,
  mode,
  book,
  isOpen,
  onClose,
  shouldRefresh,
}) {
  const router = useRouter();
  const { updateStats } = useAppData();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [shouldClose, setShouldClose] = useState(false);

  const { authorString, title } = book;

  let duedate = book.duedate;
  if (!duedate) {
    duedate = new Date();
    duedate.setDate(duedate.getDate() + 9);
  }

  const modes = {
    borrow: {
      heading: "Borrow Book",
      toastMessage: "Borrowing Book...",
      api: (book) => borrowBook(book.bookid),
      updator: borrowUpdator,
      message: "Are you sure you want to borrow this book?",
      text: "Borrow",
    },
    return: {
      heading: "Return Book",
      toastMessage: "Returning Book...",
      api: (book) => returnBook(book.borrowid),
      updator: returnUpdator,
      message: "Are you sure you want to return this book?",
      text: "Return",
    },
  };

  const { heading, toastMessage, api, updator, message, text } = modes[mode];

  useEffect(() => {
    if (shouldClose && !isPending) onClose();
  }, [isPending, shouldClose, onClose]);

  async function operationHandler() {
    if (loading) return;

    setLoading(true);

    const id = toast.loading(toastMessage);

    try {
      const { success, message, data } = await api(book);

      if (!success) throw new Error(message);

      toast.dismiss(id);

      if (success) {
        toast.success(message);

        if (shouldRefresh)
          startTransition(() => {
            router.refresh();
          });

        setShouldClose(true);
      } else {
        toast.error(message);
      }

      updator({ data, updateStats, router });
    } catch (err) {
      toast.error(err.message);
    } finally {
      toast.dismiss(id);
      setLoading(false);
      from === "myborrows" && router.replace(`/users/${from}`);
    }
    //An invoice generation code goes here
  }

  if (!isOpen) {
    return null;
  } else {
    document.body.style.overflow = "hidden";
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{heading}</h2>
        <h2 className={styles.title}>{title}</h2>

        <p className={styles.author}>{"By " + authorString}</p>
        <hr style={{ borderColor: "#e5e7eb" }} />

        <p className={styles.message}>{message}</p>
        <p className={styles.dueDate}>{"Due on " + formatDate(duedate)}</p>

        <div className={styles.actions}>
          <button className={styles.btn} onClick={onClose}>
            Cancel
          </button>

          <button
            className={`${styles.btn} ${styles.returnBtn}`}
            onClick={() => {
              operationHandler();
            }}
            disabled={loading}
          >
            {text}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

const returnUpdator = ({ data, updateStats }) => {
  const borrowid = Number(data.borrowid);

  updateStats((prev) => ({
    ...prev,
    currentBorrowsCount: prev.currentBorrowsCount - 1,
    activeBorrows: prev.activeBorrows.filter((b) => b.borrowid !== borrowid),
    nearestBorrows: prev.nearestBorrows.filter((b) => b.borrowid !== borrowid),
  }));
};

const borrowUpdator = ({ data, updateStats }) => {
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
      totalBorrows: prev.totalBorrows + 1,
      nearestBorrows: newdNearestBorrows,
    };
  });
};
