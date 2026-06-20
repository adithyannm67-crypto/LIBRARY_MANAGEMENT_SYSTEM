"use client";
import styles from "../page.module.css";
import { useBookDetails } from "../bookdetails.provider";




const BorrowedBadge = () => {
  const { borrowed } = useBookDetails();
  return borrowed && <span className={styles.borrowed}>Already Borrowed</span>;
};

export default BorrowedBadge;