"use client";

import BorrowModal from "@/features/users/shared/components/BorrowModal.jsx";

import { usePage } from "../providers/books.provider";

export default function PopupContainer() {
  const { selectedBook, setSelectedBook } = usePage();
  
  return (
    selectedBook && (
      <BorrowModal
        mode="borrow"
        book={selectedBook}
        isOpen={true}
        shouldRefresh={true}
        onClose={() => {
          setSelectedBook(null);
        }}
      />
    )
  );
}
