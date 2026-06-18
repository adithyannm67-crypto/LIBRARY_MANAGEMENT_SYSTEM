"use client";

import { createContext, useContext, useState } from "react";

const PageContext = createContext();
export default function PageProvider({ children, books }) {
  const [borrowedBooks, setBorrowedBooks] = useState(books);

  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <PageContext.Provider
      value={{
        borrowedBooks,
        setBorrowedBooks,
        selectedBook,
        setSelectedBook,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
