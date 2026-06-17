"use client";

import { useState } from "react";

import styles from "./component.module.css";
import btnStyles from "#root/common.module.css";

import { useAppData } from "#root/context/AppDataContext.jsx";



export const BorrowedBadge = ({ bookid }) => {
  const { borrowedBookIds } = useAppData();
  return (
    borrowedBookIds.has(bookid) && (
      <span className={styles.borrowed}>Already Borrowed</span>
    )
  );
};
