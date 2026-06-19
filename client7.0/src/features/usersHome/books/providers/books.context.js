"use client";

import { createContext, useContext, useState, useMemo } from "react";

import { getFilterOptions } from "../utils/books.utils";

import { useAppData } from "#root/providers/AppDataContext.jsx";

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
        filterOptions,
        searchTerm,
        setSearchTerm,
        filter,
        setFilter,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
