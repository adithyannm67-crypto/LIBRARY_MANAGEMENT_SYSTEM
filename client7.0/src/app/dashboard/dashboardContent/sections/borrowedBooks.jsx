import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./page.module.css";
import { BookCard } from "../components/BookCard/page";
import Popup from "../components/BookCard/popup";

export default function BorrowedBooksSection({
  borrowedBooks,
  setBorrowedBooks,
  setTotalBorrowsThisYear,
  setCurrentBorrowsCount,
  setNearestBorrows,
}) {
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState(null);
  return (
    <div className={style.mainContent}>
      <div className={style.card}>
        <h2 className={style.sectionTitle}>Your Books</h2>

        <div className={style.bookList}>
          {borrowedBooks &&
            borrowedBooks.map((book, index) => (
              <BookCard
                onClick={() => setSelectedBook(book)}
                key={index}
                book={book}
              />
            ))}
        </div>

        {selectedBook && (
          <Popup
            setBorrowedBooks={setBorrowedBooks}
            setCurrentBorrowsCount={setCurrentBorrowsCount}
            setTotalBorrowsThisYear={setTotalBorrowsThisYear}
            setNearestBorrows={setNearestBorrows}
            book={selectedBook}
            isOpen={!!selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>

      <button
        onClick={() => router.push("/dashboard/catalog")}
        className={style.browseBtn}
      >
        Browse Catalog
      </button>
    </div>
  );
}
