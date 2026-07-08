"use client";

import { createContext, useContext, useState, useMemo } from "react";

import { useSearchParams } from "next/navigation";

import { getFilterOptions, SORT_OPTIONS } from "../utils/books.utils";

import { useAppData } from "#root/context/AppDataContext.jsx";

const PageContext = createContext();
export default function PageProvider({ children, availableBooks }) {
  const { borrowedBookIds } = useAppData();

  const [selectedBook, setSelectedBook] = useState(null);

  const searchParams = useSearchParams();
  const getFiltersFromUrl = () => {
    const filters = searchParams.get("filter");

    if (!filters) return [];

    return filters.split(",");
  };

  const  getSearchTermFromUrl = () => {
    const searchTerm = searchParams.get("q");
    return searchTerm || "";
  }

  const [searchTerm, setSearchTerm] = useState(getSearchTermFromUrl());
  const [filter, setFilter] = useState(getFiltersFromUrl());
  const [sortBy, setSortBy] = useState("default");

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
        availableBooks,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
