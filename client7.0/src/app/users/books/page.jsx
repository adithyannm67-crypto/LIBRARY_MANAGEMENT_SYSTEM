"use client";
import styles from "./page.module.css";

import { useState, useEffect } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Search } from "lucide-react";

import { fetchAvailableBooks } from "#root/components/usersHome/Actions/AvailableBooks";
import {
  BookCard,
  BookCardSkeleton,
} from "#root/components/usersHome/components/books.bookCard.jsx";
import Popup from "#root/components/usersHome/components/dashBoard.popup.jsx";

import { useAppData } from "#root/context/AppDataContext.jsx";

export default function Page() {
  const { loading, stats } = useAppData();
  const [availableBooks, setAvailableBooks] = useState([]);

  const bb = stats?.activeBorrows.map((b) => b.bookid);

  console.log(bb);

  const [loadinglocal, setLoadingLocal] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedBook, setSelectedBook] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setLoadingLocal(true);
      const data = await fetchAvailableBooks();
      setAvailableBooks(data);
      setLoadingLocal(false);
    }
    if (!loading) fetchData();
  }, [loading]);

  const filteredBooks = availableBooks.filter((book) => {
    const { title, authors, genre } = book;
    let authorsString = "Unknown Author";
    if (authors && Object.keys(authors).length > 0) {
      authorsString = "";
      Object.entries(authors).forEach(([_, value], index) => {
        if (index > 0) authorsString += ", ";
        authorsString += value;
      });
    }
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      authorsString.toLowerCase().includes(searchTerm.toLowerCase()) ||
      genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.searchBarContainer}>
        {loading || loadinglocal ? (
          <Skeleton height={50} />
        ) : (
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for books, authors, or genres..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>
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
              borrowed={bb?.includes(book.bookid)}
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
