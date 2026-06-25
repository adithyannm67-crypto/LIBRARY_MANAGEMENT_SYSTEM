"use client";

import { BookCard } from "@/features/users/shared/components/borrowedBookCard";

import { usePage } from "../providers/borrowhistory.provider";

const BookCardWrapper = ({book}) => {
  const { setSelectedBook } = usePage();
  return <BookCard book={book} clickHandler={() => setSelectedBook(book)} />;
};

export default BookCardWrapper;
