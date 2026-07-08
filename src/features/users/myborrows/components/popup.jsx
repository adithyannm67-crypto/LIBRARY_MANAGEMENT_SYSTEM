"use client";

import ReturnModal from "@/features/users/shared/components/ReturnModal";

import { usePage } from "../providers/myborrows.provider";

export default function PopupContainer() {
  const { selectedBook, setSelectedBook } = usePage();

  return (
    selectedBook && (
      <ReturnModal
        book={selectedBook}
        from="myborrows"
        shouldRefresh={true}
        onClose={() => {
          setSelectedBook(null);
        }}
      />
    )
  );
}