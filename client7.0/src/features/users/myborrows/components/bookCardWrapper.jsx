"use client";

import { BookCard } from "@/features/users/shared/components/borrowedBookCard.jsx";

import { usePage } from "../providers/myborrows.provider";

 const BookCardWrapper = ({ book }) => {
  const { setSelectedBook } = usePage();
  return <BookCard book={book} clickHandler={() => setSelectedBook(book)} />;
};

export default BookCardWrapper;
