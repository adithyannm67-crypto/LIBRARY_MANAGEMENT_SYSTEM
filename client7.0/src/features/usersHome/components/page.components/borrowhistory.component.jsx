"use client";

import { useMemo } from "react";

import Popup from "#root/features/usersHome/components/dashBoard.popup.jsx";
import SearchContainer from "#root/features/usersHome/components/searchContainer.jsx";

import {
  SORT_OPTIONS,
  getFilterOptions,
} from "#root/features/usersHome/utils/borrowhistory.utils.js";

import { usePage } from "@/features/usersHome/providers/borrowhistory.context";

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
