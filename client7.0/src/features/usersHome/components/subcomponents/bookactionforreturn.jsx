"use client";

import { useRouter, usePathname } from "next/navigation";
import { usePage } from "#root/features/usersHome/providers/borrowhistory.context.js";

const BookActionForReturn = ({
  book,
  isReturned,
  isUserHome,
  clickHandler,
}) => {
  const router = useRouter();

  const page = usePage();

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const handleClick1 = () => {
    const option = isReturned ? "Borrow Again" : "Return";
    router.push(
      `bookdetails/${book.bookid}?option=${option}&from=${pathSegments[1]}`,
    );
  };
  const handleClick2 = () => {
    if (clickHandler) clickHandler();
    else page?.setSelectedBook(book);
  };

  return (
    <div className={styles.bookActions1}>
      {!isReturned && (
        <button className={styles.btn1} onClick={handleClick2}>
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

export default BookActionForReturn;
