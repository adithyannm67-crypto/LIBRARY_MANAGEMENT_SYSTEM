"use client";

import Popup from "@/features/users/shared/components/dashBoard.popup.jsx";

import { usePage } from "../providers/books.provider";


 const PopupContainer = () => {
  const { selectedBook, setSelectedBook } = usePage();
  return (
    selectedBook && (
      <Popup
        text="borrow"
        mode="borrow"
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => {
          setSelectedBook(null);
          document.body.style.overflow = "auto";
        }}
        shouldRefresh={true}
      />
    )
  );
};

export default PopupContainer;