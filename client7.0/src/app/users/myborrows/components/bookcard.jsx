"use client";

import { BookCard } from "#root/components/usersHome/components/borrowedBookCard.jsx";

import { usePage } from "../myborrows.provider";

 const BookCardWrapper = ({ book }) => {
  const { setSelectedBook } = usePage();
  return <BookCard book={book} clickHandler={() => setSelectedBook(book)} />;
};

export default BookCardWrapper;
