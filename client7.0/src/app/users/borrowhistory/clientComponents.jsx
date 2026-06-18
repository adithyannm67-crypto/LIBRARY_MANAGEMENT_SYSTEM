"use client";

import { useMemo } from "react";

import Popup from "#root/components/usersHome/components/dashBoard.popup.jsx";
import SearchContainer from "#root/components/usersHome/components/searchContainer.jsx";

import {
  SORT_OPTIONS,
  getFilterOptions,
} from "#root/components/usersHome/utils/borrowhistory.utils.js";

import { usePage } from "./usePage";

export const PopupContainer = () => {
  const { selectedBook, setSelectedBook, setBorrowedBooks } = usePage();

  const closePopup = () => {
    setSelectedBook(null);
    document.body.style.overflow = "auto";
  };

  return (
    selectedBook && (
      <Popup
      from="borrowhistory"
        text="return"
        mode="return"
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={closePopup}
        setBorrowedBooks={setBorrowedBooks}
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
    borrowedBooks,
    sortBy,
    setSortBy,
  } = usePage();

  const filterOptions = useMemo(
    () => getFilterOptions(borrowedBooks),
    [borrowedBooks],
  );

  return (
    <SearchContainer
      setSearchTerm={setSearchTerm}
      searchTerm={searchTerm}
      setFilter={setFilter}
      filter={filter}
      sortBy={sortBy}
      setSortBy={setSortBy}
      searchBarPlaceholder="Search by title or author..."
      filterOptions={filterOptions}
      sortOptions={SORT_OPTIONS}
    />
  );
};

const BookList = () => {
  const { groupedBooks } = usePage();
  return (
    <div className={styles.bookListContainer}>
      {Object.entries(groupedBooks).map(
        ([key, books]) =>
          books.length > 0 && (
            <details key={key} open>
              <summary>{key}</summary>
              <div className={styles.bookList}>
                {books.map((book) => (
                  <BookCard
                    key={book.borrowid}
                    book={book}
                    isUserHome={false}
                  />
                ))}
              </div>
            </details>
          ),
      )}
    </div>
  );
};
