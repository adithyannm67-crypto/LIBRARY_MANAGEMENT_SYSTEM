"use client";

import styles from "./page.module.css";

import { useMemo } from "react";

import {
  BookCard,
  BookCardSkeleton,
} from "#root/components/usersHome/components/books.bookCard.jsx";
import Popup from "#root/components/usersHome/components/dashBoard.popup.jsx";
import SearchContainer from "#root/components/usersHome/components/searchContainer.jsx";

import usePage from "./usePage";
import {
  getFilterOptions,
  SORT_OPTIONS,
} from "#root/components/usersHome/utils/books.utils.js";

export default function Page() {
  const {
    availableBooks,
    isLoading,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    borrowedBookIds,
    selectedBook,
    setSelectedBook,
    sortedBooks,
  } = usePage();

  const filterOptions = useMemo(
    () => getFilterOptions(availableBooks),
    [availableBooks],
  );

  return (
    <div className={styles.container}>
      <SearchContainer
        loading={isLoading}
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

      <div
        className={`${styles.booklist} ${
          isLoading ? styles.loading : styles.loaded
        }`}
      >
        {isLoading ? (
          <BookCardSkeleton cards={6} />
        ) : sortedBooks.length === 0 ? (
          <p>No books found.</p>
        ) : (
          sortedBooks.map((book) => (
            <BookCard
              borrowed={borrowedBookIds.has(book.bookid)}
              onClick={() => setSelectedBook(book)}
              key={book.bookid}
              book={book}
            />
          ))
        )}
      </div>
      {selectedBook && (
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
      )}
    </div>
  );
}
