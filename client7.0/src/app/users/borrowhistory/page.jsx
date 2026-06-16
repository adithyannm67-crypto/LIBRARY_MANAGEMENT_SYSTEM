"use client";

import styles from "./page.module.css";

import {  useMemo } from "react";

import { usePage } from "./usePage";

import {
  getFilterOptions,
  SORT_OPTIONS,
} from "#root/components/usersHome/utils/borrowhistory.utils.js";

import SearchContainer from "#root/components/usersHome/components/searchContainer.jsx";
import Popup from "#root/components/usersHome/components/dashBoard.popup.jsx";
import {
  BookCard,
  BookCardSkeleton,
} from "#root/components/usersHome/components/borrowedBookCard.jsx";

export default function Page() {
  const pageState = usePage();

  const filterOptions = useMemo(
    () => getFilterOptions(pageState.borrowedBooks),
    [pageState.borrowedBooks],
  );

  return (
    <div className={styles.container}>
      <SearchContainer
        isLoading={pageState.isLoading}
        setSearchTerm={pageState.setSearchTerm}
        searchTerm={pageState.searchTerm}
        setFilter={pageState.setFilter}
        filter={pageState.filter}
        sortBy={pageState.sortBy}
        setSortBy={pageState.setSortBy}
        searchBarPlaceholder="Search by title or author..."
        filterOptions={filterOptions}
        sortOptions={SORT_OPTIONS}
      />
      <div className={styles.bookListContainer}>
        {pageState.isLoading ? (
          <BookCardSkeleton cards={3} />
        ) : (
          Object.entries(pageState.groupedBooks).map(
            ([key, books]) =>
              books.length > 0 && (
                <details key={key} open>
                  <summary>{key}</summary>
                  <div className={styles.bookList}>
                    {books.map((book) => (
                      <BookCard
                        disabled={book.status !== "borrowed"}
                        onClick={() => pageState.setSelectedBook(book)}
                        key={book.borrowid}
                        book={book}
                      />
                    ))}
                  </div>
                </details>
              ),
          )
        )}

        {pageState.selectedBook && (
          <Popup
            text="return"
            mode="return"
            book={pageState.selectedBook}
            isOpen={!!pageState.selectedBook}
            onClose={pageState.closePopup}
            setBorrowedBooks={pageState.setBorrowedBooks}
          />
        )}
      </div>
    </div>
  );
}
