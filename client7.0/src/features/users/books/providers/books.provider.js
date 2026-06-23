"use client";

import { createContext, useContext, useState, useMemo } from "react";

import { getFilterOptions, SORT_OPTIONS } from "../utils/books.utils";

import { useAppData } from "#root/context/AppDataContext.jsx";

const PageContext = createContext();
export default function PageProvider({ children, availableBooks }) {
  const { stats } = useAppData();

  const [selectedBook, setSelectedBook] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState([]);
  const [sortBy, setSortBy] = useState("default");

  const borrowedBookIds = useMemo(
    () => new Set((stats?.activeBorrows ?? []).map((b) => b.bookid)),
    [stats?.activeBorrows],
  );

  const filterOptions = useMemo(
    () => getFilterOptions(availableBooks),
    [availableBooks],
  );

  return (
    <PageContext.Provider
      value={{
        borrowedBookIds,
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
