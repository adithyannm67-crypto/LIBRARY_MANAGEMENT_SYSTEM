"use client";

import styles from "./page.module.css";

import { useState, useEffect, useMemo } from "react";

import fetchBorrowedBooks from "#root/components/usersHome/Actions/BorrowedBooks";
import {
  BookCard,
  BookCardSkeleton,
} from "#root/components/usersHome/components/borrowedBookCard.jsx";
import Popup from "#root/components/usersHome/components/dashBoard.popup.jsx";
import SearchContainer from "#root/components/usersHome/components/searchContainer.jsx";

import { useAppData } from "#root/context/AppDataContext.jsx";
import { getAuthorString } from "#root/common.jsx";

//needs to impliment sorting

export default function Catalog() {
  const { loading } = useAppData();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loadinglocal, setLoadingLocal] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    async function fetchData() {
      setLoadingLocal(true);
      const data = await fetchBorrowedBooks();
      const formattedData = data.map((book) => ({
        ...book,
      }));
      setBorrowedBooks(formattedData);
      setLoadingLocal(false);
    }
    if (!loading) fetchData();
  }, [loading]);

  const filteredBooks = borrowedBooks.filter((book) => {
    const authorString = getAuthorString(book.authors);
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      authorString.toLowerCase().includes(searchTerm.toLowerCase()) 
    const matchesFilter =
      filter.length === 0 ||
      filter.some((f) => authorString.toLowerCase().includes(f.toLowerCase()));

    return matchesSearch && matchesFilter;
  });

  const filterOptions = useMemo(
    () => [
      {
        name: "Authors",
        options: [
          ...new Set(
            borrowedBooks
              .map((book) => Object.values(book.authors))
              .flat()
              .filter(Boolean),
          ),
        ],
      },

      /* Add more options*/
    ],
    [borrowedBooks],
  );

  return (
    <div className={styles.container}>
      <SearchContainer
        loading={loading}
        loadinglocal={loadinglocal}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
        filterOptions={filterOptions}
        searchBarPlaceholder="Search by title or author..."
      />
      <div className={styles.bookList}>
        {loading || loadinglocal ? (
          <BookCardSkeleton cards={3} />
        ) : (
          filteredBooks.map((book) => (
            <BookCard
              disabled={book.status !== "borrowed"}
              onClick={() => setSelectedBook(book)}
              key={book.borrowid}
              book={book}
            />
          ))
        )}
        {selectedBook && (
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
        )}
      </div>
    </div>
  );
}
