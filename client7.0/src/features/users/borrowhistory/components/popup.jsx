"use client";

import Popup from "@/features/users/shared/components/dashBoard.popup.jsx";
import { usePage } from "../providers/borrowhistory.provider";

const PopupContainer = () => {
  const { selectedBook, setSelectedBook, setBorrowedBooks } = usePage();

  const closePopup = () => {
    setSelectedBook(null);
    document.body.style.overflow = "auto";
  };

  return (
    selectedBook && (
      <Popup
        from="borrowhistory"
        text="return"
        mode="return"
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={closePopup}
        setBorrowedBooks={setBorrowedBooks}
        shouldRefresh={true}
      />
    )
  );
};

export default PopupContainer;
