"use client";

import Popup from "@/features/users/shared/components/dashBoard.popup.jsx";

import { usePage } from "../providers/myborrows.provider";


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
        shouldRefresh={true}
        setBorrowedBooks={setBorrowedBooks}
      />
    )
  );
};


export default PopUpContainer