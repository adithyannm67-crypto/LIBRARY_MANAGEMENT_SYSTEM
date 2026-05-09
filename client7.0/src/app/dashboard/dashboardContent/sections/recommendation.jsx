

import style from "./page.module.css";
import { useState, useEffect } from "react";
import fetchAvailableBooks from "../Actions/AvailableBooks"
import AvailableBookCard from "../components/RecommendedBook/page";
import Popup from "../components/RecommendedBook/popup";




export default function RecommendationsSection({ user }) {
  const [availableBooks, setAvailableBooks] = useState([]);

  const [selectedBook, setSelectedBook] = useState(null);
  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      const data = await fetchAvailableBooks();
      setAvailableBooks(data);
    }
    fetchData();
  }, [user]);

  return (
    <div className={style.card}>
      <h3 className={style.cardTitle}>Recommended for You</h3>

      <div className={style.recommendList}>
        {availableBooks.map((book) => (
          <AvailableBookCard
            onClick={() => setSelectedBook(book)}
            key={book.bookid}
            {...book}
          />
        ))}
      </div>

      {selectedBook && (
        <Popup
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}
