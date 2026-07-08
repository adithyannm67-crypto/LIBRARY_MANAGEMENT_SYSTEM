"use client";

import styles from "../styles/BorrowModal.module.css";

import { toast } from "react-hot-toast";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

import Cover from "@/features/users/shared/components/coverimage";

import returnBook from "../Actions/return.js";
import { formatDate } from "../utils/utils";

import { useAppData } from "#root/context/AppDataContext.jsx";

export default function BorrowModal({ book, from, shouldRefresh, onClose }) {
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

  const handleReturn = async (e) => {
    e.stopPropagation();
    if (loading) return;

    setLoading(true);

    const id = toast.loading("Returning Book...");
    try {
      const result = await returnBook(book.borrowid);
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
      returnUpdator({ borrowid: Number(book.borrowid), updateStats: updateStats });
    } catch (er) {
      toast.error(er.message);
    } finally {
      toast.dismiss(id);
      setLoading(false);
      from === "myborrows" && router.replace(`/users/${from}`);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <h1 className={styles.heading}>Return Book</h1>

        <div className={styles.bookSection}>
          <div className={styles.cover}>
            <Cover
              coverurl={book.coverurl}
              width={80}
              height={120}
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
          <p className={styles.question}>Are you sure you want to return</p>

          <h3 className={styles.bookName}>{book.title}?</h3>
        </div>

        <div className={styles.dateCard}>
          <div className={styles.calendar}>↩</div>

          <div>
            <p className={styles.dateLabel}>Due date</p>

            <h3 className={styles.date}>{formatDate(book.duedate)}</h3>
          </div>
        </div>

        <div className={styles.returnInfo}>
          <span className={styles.returnIcon}>✓</span>

          <div>
            <p>Returning this book will update your borrowing statistics.</p>

            <small>Thank you for returning on time.</small>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>

          <button
            className={styles.returnBtn}
            onClick={handleReturn}
            disabled={loading}
          >
            {loading ? "Returning..." : "Return"}
          </button>
        </div>
      </div>
    </div>
  );
}

const returnUpdator = ({ borrowid, updateStats }) => {
  updateStats((prev) => ({
    ...prev,
    currentBorrowsCount: prev.currentBorrowsCount - 1,
    activeBorrows: prev.activeBorrows.filter((b) => b.borrowid !== borrowid),
    nearestBorrows: prev.nearestBorrows.filter((b) => b.borrowid !== borrowid),
  }));
};
