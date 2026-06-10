"use client";
import styles from "./page.module.css";

import { useState, useEffect, useMemo } from "react";

import { fetchAvailableBooks } from "#root/components/usersHome/Actions/AvailableBooks";
import {
  BookCard,
  BookCardSkeleton,
} from "#root/components/usersHome/components/books.bookCard.jsx";
import Popup from "#root/components/usersHome/components/dashBoard.popup.jsx";
import SearchContainer from "#root/components/usersHome/components/searchContainer.jsx";

import { useAppData } from "#root/context/AppDataContext.jsx";
import { getAuthorString } from "#root/common.jsx";

export default function Page() {
  const { loading, stats } = useAppData();
  const [availableBooks, setAvailableBooks] = useState([]);
  const [loadinglocal, setLoadingLocal] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoadingLocal(true);
      const data = await fetchAvailableBooks();
      const formattedData = data.map((book) => ({
        ...book,
      }));
      setAvailableBooks(formattedData);
      setLoadingLocal(false);
    }
    if (!loading) fetchData();
  }, [loading]);
  const filteredBooks = availableBooks.filter((book) => {
    const authorString = getAuthorString(book.authors);
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      authorString.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter.length === 0 ||
      filter.some(
        (f) =>
          authorString.toLowerCase().includes(f.toLowerCase()) ||
          book.genre.toLowerCase().includes(f.toLowerCase()),
      );

    return matchesSearch && matchesFilter;
  });

  const filterOptions = useMemo(
    () => [
      {
        name: "Genres",
        options: [
          ...new Set(availableBooks.map((book) => book.genre).filter(Boolean)),
        ],
      },
      {
        name: "Authors",
        options: [
          ...new Set(
            availableBooks
              .map((book) => Object.values(book.authors))
              .flat()
              .filter(Boolean),
          ),
        ],
      },

      /* Add more options*/
    ],
    [availableBooks],
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
        searchBarPlaceholder="Search by title, author, or genre..."
      />

      <div
        className={styles.booklist}
        style={
          loading
            ? { height: "auto" }
            : { maxHeight: "550px", overflowY: "auto" }
        }
      >
        {loading || loadinglocal ? (
          <BookCardSkeleton cards={6} />
        ) : (
          filteredBooks.map((book) => (
            <BookCard
              borrowed={stats?.activeBorrows?.some(
                (b) => b.bookid === book.bookid,
              )}
              onClick={() => setSelectedBook(book)}
              key={book.bookid}
              book={book}
            />
          ))
        )}
        {selectedBook && (
          <Popup
            text="borrow"
            mode="borrow"
            book={selectedBook}
            isOpen={!!selectedBook}
            onClose={() => {
              setSelectedBook(null);
              document.body.style.overflow = "auto";
            }}
          />
        )}
      </div>
    </div>
  );
}
