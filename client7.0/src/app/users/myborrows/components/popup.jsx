"use client";

import Popup from "@/components/usersHome/components/dashBoard.popup.jsx";

import { usePage } from "../myborrows.provider";


 const PopUpContainer = () => {
  const { selectedBook, setSelectedBook, setBorrowedBooks } = usePage();

  return (
    selectedBook && (
      <Popup
        text="return"
        mode="return"
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => {
          setSelectedBook(null);
          document.body.style.overflow = "auto";
        }}
        setBorrowedBooks={setBorrowedBooks}
      />
    )
  );
};


export default PopUpContainer