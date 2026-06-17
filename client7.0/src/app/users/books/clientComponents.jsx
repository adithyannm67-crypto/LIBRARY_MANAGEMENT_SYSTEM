"use client";

import styles from "./page.module.css";

import { BookCard } from "#root/components/usersHome/components/books.bookCard.jsx";
import Popup from "#root/components/usersHome/components/dashBoard.popup.jsx";
import SearchContainer from "#root/components/usersHome/components/searchContainer.jsx";

import { SORT_OPTIONS } from "#root/components/usersHome/utils/books.utils.js";

import { usePage } from "./usePage";
import { useAppData } from "#root/context/AppDataContext.jsx";

export const PopupContainer = () => {
  const { selectedBook, setSelectedBook } = usePage();
  return (
    selectedBook && (
      <Popup
        text="borrow"
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

export const SearchComponent = () => {
  const {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    filterOptions,
    sortBy,
    setSortBy,
  } = usePage();
  return (
    <SearchContainer
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filter={filter}
      setFilter={setFilter}
      filterOptions={filterOptions}
      searchBarPlaceholder="Search by title, author, or genre..."
      sortBy={sortBy}
      setSortBy={setSortBy}
      sortOptions={SORT_OPTIONS}
    />
  );
};

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

export const BookAction = ({ book }) => {
  const { borrowedBookIds } = useAppData();

  const canBorrow =
    book.availablecopies > 0 && !borrowedBookIds.has(book.bookid);
  const { setSelectedBook } = usePage();
  const [shake, setShake] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!canBorrow) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000);
      return;
    }

    setSelectedBook(book);
  };

  return (
    <div className={styles.bookActions}>
      <button
        className={btnStyles.btnPrimary + " " + (shake && btnStyles.shake)}
        onClick={handleClick}
      >
        {canBorrow ? "Borrow" : "Unavailable"}
      </button>
    </div>
  );
};
