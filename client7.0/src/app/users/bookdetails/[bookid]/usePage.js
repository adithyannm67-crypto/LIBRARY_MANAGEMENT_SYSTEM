"use client";

import { createContext, useContext, useState } from "react";

import { useAppData } from "#root/context/AppDataContext.jsx";

const BookDetailsContext = createContext();
export default function BookDetailsProvider({ children, bookid }) {
  const { stats } = useAppData();

  const [selectedBook, setSelectedBook] = useState(null);

  const borrowed = stats?.activeBorrows
    .map((b) => b.bookid)
    .includes(Number(bookid));

  return (
    <BookDetailsContext.Provider
      value={{ borrowed, selectedBook, setSelectedBook }}
    >
      {children}
    </BookDetailsContext.Provider>
  );
}

export function useBookDetails() {
  return useContext(BookDetailsContext);
}
