"use client";

import styles from "../component.module.css";

import { useAppData } from "#root/providers/AppDataContext.jsx";

 const BorrowedBadge = ({ bookid }) => {
  const { borrowedBookIds } = useAppData();
  return (
    borrowedBookIds.has(bookid) && (
      <span className={styles.borrowed}>Already Borrowed</span>
    )
  );
};

export default BorrowedBadge;