import style from "./page.module.css";
import { useState, useEffect } from "react";
import fetchAvailableBooks from "#root/Actions/AvailableBooks";
import AvailableBookCard from "../components/RecommendedBook/page";
import Popup from "../components/RecommendedBook/popup";

import { Skeleton, SkeletonText } from "#root/components/skeletons";

export default function RecommendationsSection({ loading, updateStats }) {
  const [availableBooks, setAvailableBooks] = useState([]);

  const [selectedBook, setSelectedBook] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchAvailableBooks();
      setAvailableBooks(data);
    }
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className={style.card}>
        <div className={style.recommendList}>
          <SkeletonText width="150px" height="24px" />
          <Skeleton width="270px" height="140px" />
          <Skeleton width="270px" height="140px" />
          <Skeleton width="270px" height="140px" />
        </div>
      </div>
    );
  }

  return (
    <div className={style.card}>
      <h3 className={style.cardTitle}>Recommended for You</h3>

      <div className={style.recommendList}>
        {availableBooks &&
          availableBooks.map((book) => (
            <AvailableBookCard
              onClick={() => setSelectedBook(book)}
              key={book.bookid}
              {...book}
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
  );
}
