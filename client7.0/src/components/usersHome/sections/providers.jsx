"use client";

import { useAppData } from "#root/context/AppDataContext.jsx";

import { createContext, useContext, useState, useMemo } from "react";

const BorrowedContext = createContext();

export function BorrowedSectionProvider({ children}) {
  const { stats } = useAppData();
  
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <BorrowedContext.Provider
      value={{
        selectedBook,
        setSelectedBook,
      }}
    >
      {children}
    </BorrowedContext.Provider>
  );
}

export function useBorrowedSection() {
  return useContext(BorrowedSectionProvider);
}
