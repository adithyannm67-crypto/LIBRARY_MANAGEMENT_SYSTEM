"use client";

import styles from "../styles/borrowedbookcard.module.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BookAction = ({ bookid, isReturned,  clickHandler }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const option = isReturned ? "Borrow Again" : "Return";

  return (
    <div className={styles.actions}>
      {!isReturned && (
        <button className={styles.returnBtn} onClick={clickHandler}>
          Return
        </button>
      )}

      <Link
        href={`/users/bookdetails/${bookid}?option=${option}&from=${pathSegments[1]}`}
        className={styles.detailsBtn}
      >
        View Details
      </Link>
    </div>
  );
};

export default BookAction;
