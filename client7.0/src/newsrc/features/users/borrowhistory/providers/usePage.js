"use client";

import { createContext, useContext, useState} from "react";

const PageContext = createContext();
export default function PageProvider({ children, books }) {
  const [borrowedBooks, setBorrowedBooks] = useState(books);

  const [selectedBook, setSelectedBook] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState([]);
  const [sortBy, setSortBy] = useState("default");

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
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
