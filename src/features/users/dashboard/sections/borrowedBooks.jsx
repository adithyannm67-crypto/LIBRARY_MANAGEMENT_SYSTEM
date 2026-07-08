"use client";

import style from "./section.module.css";
import styles from "../styles/borrewedSection.module.css";

import { BookOpen } from "lucide-react";

import Link from "next/link";
import { useState } from "react";

import { BookCard } from "@/features/users/shared/components/borrowedBookCard";
import Popup from "@/features/users/shared/components/dashBoard.popup";
import ReturnModal from "@/features/users/shared/components/ReturnModal";

import { useAppData } from "#root/context/AppDataContext.jsx";

export default function BorrowedBooksSection() {
  const { stats } = useAppData();

  const isBookPreset = stats.activeBorrows.length > 0;

  const [selectedBook, setSelectedBook] = useState(null);

  const cardStyles = {
    display: `${!isBookPreset ? "none" : ""}`,
    flex: ".5",
  };

  return (
    <div className={style.mainContent}>
      <div className={style.card}>
        <h2 className={style.cardTitle} style={cardStyles}>
          {isBookPreset && "Your Books"}
        </h2>

        <div className={style.bookList}>
          {stats?.activeBorrows.length > 0 ? (
            <>
              {stats?.activeBorrows.map((book, _) => (
                <BookCard
                  book={book}
                  key={book.borrowid}
                  clickHandler={() => setSelectedBook(book)}
                  isUserHome={true}
                />
              ))}
              <Link
                href="/users/borrowhistory"
                className={style.viewAllBorrows}
              >
                <div className={style.icon}>🗓</div>

                <span>View All Borrowed Books</span>

                <span className={style.arrow}>→</span>
              </Link>
            </>
          ) : (
            <>
              <p>No active borrows </p>
              <Link href="/users/books">
                Click here to discover new books....
              </Link>
            </>
          )}
        </div>

        {selectedBook && (
          <ReturnModal
            book={selectedBook}
            shouldRefresh={true}
            onClose={() => {
              setSelectedBook(null);
            }}
          />
        )}
      </div>

      <Link href="/users/books" className={styles.browseCatalog}>
        <div className={styles.browseIcon}>
          <BookOpen />
        </div>

        <div className={styles.browseContent}>
          <h3>Browse Catalog</h3>
          <p>Explore our collection of books</p>
        </div>

        <span className={styles.arrow}>→</span>
      </Link>
    </div>
  );
}
