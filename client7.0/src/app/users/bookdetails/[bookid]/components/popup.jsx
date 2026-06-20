"use client";

import { useBookDetails } from "../bookdetails.provider";

import Popup from "#root/components/usersHome/components/dashBoard.popup.jsx";

 const PopupContainer = ({ option, from }) => {
  const { selectedBook, setSelectedBook } = useBookDetails();
  return (
    selectedBook && (
      <Popup
        from={from}
        mode={option.includes("Borrow") ? "borrow" : "return"}
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => {
          setSelectedBook(null);
          document.body.style.overflow = "auto";
        }}
      />
    )
  );
};

export default PopupContainer;