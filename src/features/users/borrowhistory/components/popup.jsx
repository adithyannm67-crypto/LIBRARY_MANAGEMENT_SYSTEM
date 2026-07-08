"use client";

import ReturnModal from "@/features/users/shared/components/ReturnModal";

import { usePage } from "../providers/borrowhistory.provider";

export default function PopupContainer() {
  const { selectedBook, setSelectedBook } = usePage();

  return (
    selectedBook && (
      <ReturnModal
        book={selectedBook}
        shouldRefresh={true}
        onClose={() => {
          setSelectedBook(null);
        }}
      />
    )
  );
}
