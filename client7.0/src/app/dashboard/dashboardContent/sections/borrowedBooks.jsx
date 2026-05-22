import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./page.module.css";
import { BookCard } from "../components/BookCard/page";
import Popup from "../components/BookCard/popup";

export default function BorrowedBooksSection({
  stats,updateStats
}) {
  const { activeBorrows } = stats;
  
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState(null);
  return (
    <div className={style.mainContent}>
      <div className={style.card}>
        <h2 className={style.sectionTitle}>Your Books</h2>

        <div className={style.bookList}>
          {activeBorrows &&
            activeBorrows.map((book, index) => (
              <BookCard
                onClick={() => setSelectedBook(book)}
                key={index}
                book={book}
              />
            ))}
        </div>

        {selectedBook && (
          <Popup
            updateStats={updateStats}
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
