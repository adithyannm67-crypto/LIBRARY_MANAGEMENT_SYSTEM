import { useRecommendation } from "./providers";
import Popup from "../components/dashBoard.popup";

import { useRouter } from "next/navigation";
export const PopupContainer = () => {
  const { selectedBook, setSelectedBook } = useRecommendation();
  return (
    selectedBook && (
      <Popup
        mode="borrow"
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => {
          setSelectedBook(null);
          document.body.style.overflow = "auto";
        }}
      />
    )
  );
};

import styles from "./page.module.css";

import { BookCard } from "#root/components/usersHome/components/books.bookCard.jsx";
import Popup from "#root/components/usersHome/components/dashBoard.popup.jsx";
import SearchContainer from "#root/components/usersHome/components/searchContainer.jsx";

import { SORT_OPTIONS } from "#root/components/usersHome/utils/books.utils.js";

import { usePage } from "./usePage";
import { useAppData } from "#root/context/AppDataContext.jsx";

export const BookList = () => {
  const { sortedBooks, borrowedBookIds } = usePage();
  return (
    <div className={`${styles.booklist} ${styles.loaded}`}>
      {sortedBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        sortedBooks.map((book) => (
          <BookCard
            borrowed={borrowedBookIds.has(book.bookid)}
            key={book.bookid}
            book={book}
          />
        ))
      )}
    </div>
  );
};

import { useState } from "react";

import btnStyles from "#root/common.module.css";

export const BookAction = ({ bookid, isReturned }) => {
  const router = useRouter();

  const handleClick = () => {
    const option = isReturned ? "Borrow Again" : "Return";
    router.push(
      `bookdetails/${bookid}?option=${option}&from=${pathSegments[1]}`,
    );
  };
  return (
    <div className={styles.bookActions1}>
      {!isReturned && (
        <button className={styles.btn1} onClick={onClick}>
          Return
        </button>
      )}
      {!isUserHome && (
        <button className={styles.btn1} onClick={handleClick}>
          View Book Details
        </button>
      )}
    </div>
  );
};
