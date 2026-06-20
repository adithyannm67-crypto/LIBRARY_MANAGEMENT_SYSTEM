"use client";

import Popup from "#root/components/usersHome/components/dashBoard.popup.jsx";
import { usePage } from "../borrowhistory.provider";

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
      />
    )
  );
};

export default PopupContainer;
