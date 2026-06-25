"use client";

import styles from "./component.module.css";

import { useRouter, usePathname } from "next/navigation";

const BookAction = ({ book, isReturned, isUserHome, clickHandler }) => {
  const router = useRouter();

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const handleClick1 = () => {
    const option = isReturned ? "Borrow Again" : "Return";
    router.push(
      `/users/bookdetails/${book.bookid}?option=${option}&from=${pathSegments[1]}`,
    );
  };

  return (
    <div className={styles.bookActions1}>
      {!isReturned && (
        <button className={styles.btn1} onClick={clickHandler}>
          Return
        </button>
      )}
      {!isUserHome && (
        <button className={styles.btn1} onClick={handleClick1}>
          View Book Details
        </button>
      )}
    </div>
  );
};

export default BookAction;
