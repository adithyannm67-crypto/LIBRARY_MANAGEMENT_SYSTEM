"use client";

import Popup from "@/components/usersHome/components/dashBoard.popup.jsx";

import { usePage } from "./usePage";
import { BookCard } from "#root/components/usersHome/components/borrowedBookCard.jsx";

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
