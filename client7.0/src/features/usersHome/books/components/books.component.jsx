"use client";

import styles from "@/app/users/books/page.module.css";

import { BookCard } from "#root/features/usersHome/components/books.bookCard.jsx";
import Popup from "#root/features/usersHome/components/dashBoard.popup.jsx";
import SearchContainer from "#root/features/usersHome/components/searchContainer.jsx";

import { SORT_OPTIONS } from "#root/features/usersHome/books/utils/books.utils.js";

import { usePage } from "#root/features/usersHome/providers/books.context";

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
