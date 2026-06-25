"use client";

import { createContext, useContext, useState, useMemo } from "react";

import { SORT_OPTIONS, getFilterOptions } from "../utils/borrowhistory.utils";

const PageContext = createContext();
export default function PageProvider({ children, books }) {
  const [borrowedBooks, setBorrowedBooks] = useState(books);

  const [selectedBook, setSelectedBook] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState([]);
  const [sortBy, setSortBy] = useState("default");

  const filterOptions = useMemo(
    () => getFilterOptions(borrowedBooks),
    [borrowedBooks],
  );

  return (
    <PageContext.Provider
      value={{
        borrowedBooks,
        setBorrowedBooks,
        selectedBook,
        setSelectedBook,
        searchTerm,
        setSearchTerm,
        filter,
        setFilter,
        sortBy,
        setSortBy,
        filterOptions,
        SORT_OPTIONS,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
