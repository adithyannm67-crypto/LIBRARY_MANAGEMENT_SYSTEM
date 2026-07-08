"use client";

import styles from "../styles/BorrowModal.module.css";

import { toast } from "react-hot-toast";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

import Cover from "@/features/users/shared/components/coverimage";

import borrowBook from "../Actions/borrow";
import { formatDate } from "../utils/utils";

import { useAppData } from "#root/context/AppDataContext.jsx";

export default function BorrowModal({
  book,
  from,
  shouldRefresh,
  onClose,
  isOpen,
}) {
  const router = useRouter();
  const { updateStats } = useAppData();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [shouldClose, setShouldClose] = useState(false);

  let duedate = book.duedate;
  if (!duedate) {
    duedate = new Date();
    duedate.setDate(duedate.getDate() + 9);
  }

  useEffect(() => {
    if (shouldClose && !isPending) onClose();
  }, [isPending, shouldClose, onClose]);

  const handleBorrow = async (e) => {
    e.stopPropagation();
    if (loading) return;

    setLoading(true);

    const id = toast.loading("Borrowing Book...");
    try {
      const result = await borrowBook(book.bookid);
      if (!result.success) throw new Error(result.message);
      toast.dismiss(id);

      if (result.success) {
        toast.success(result.message);

        if (shouldRefresh)
          startTransition(() => {
            router.refresh();
          });

        setShouldClose(true);
      } else {
        toast.error(result.message);
      }
      borrowUpdator({ data: result.data, updateStats: updateStats });
    } catch (er) {
      toast.error(er.message);
    } finally {
      toast.dismiss(id);
      setLoading(false);
      from === "myborrows" && router.replace(`/users/${from}`);
    }
  };
  useEffect(() => {
    if (!isOpen) return;

    const condainer=document.getElementById("booklist-in-books");

    console.log(condainer);
    

  condainer.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      condainer.style.overflow = "auto";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={styles.overlay}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <h1 className={styles.heading}>Borrow Book</h1>

        <div className={styles.bookSection}>
          <div className={styles.cover}>
            <Cover
              coverurl={book.coverurl}
              width={110}
              height={160}
              priority={false}
              title={book.title}
            />
          </div>

          <div className={styles.bookInfo}>
            <h2 className={styles.title}>{book.title}</h2>

            <p className={styles.author}>By {book.authorString}</p>

            <span className={styles.genre}>{book.genre}</span>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.confirmSection}>
          <p className={styles.question}>Are you sure you want to borrow</p>

          <h3 className={styles.bookName}>{book.title}?</h3>
        </div>

        <div className={styles.dateCard}>
          <div className={styles.calendar}>📅</div>

          <div>
            <p className={styles.dateLabel}>Due on</p>

            <h3 className={styles.date}>{formatDate(duedate)}</h3>
          </div>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoIcon}>i</span>

          <div>
            <p>You can keep the book for up to 9 days.</p>

            <small>Late returns may affect your account.</small>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>

          <button
            className={styles.borrowBtn}
            onClick={handleBorrow}
            disabled={loading}
          >
            {loading ? "Borrowing..." : "Borrow"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

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
