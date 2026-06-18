"use client";

import Popup from "#root/features/usersHome/components/dashBoard.popup.jsx";

import { usePage } from "../../providers/myborrows.context";
import { BookCard } from "#root/features/usersHome/components/borrowedBookCard.jsx";

export const PopUpContainer = () => {
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

export const BookCardWrapper = ({ book }) => {
  const { setSelectedBook } = usePage();
  return <BookCard book={book} clickHandler={() => setSelectedBook(book)} />;
};
