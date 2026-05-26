import style from "./page.module.css";
import { useState, useEffect } from "react";
import fetchAvailableBooks from "#root/Actions/AvailableBooks";
import AvailableBookCard from "../components/RecommendedBook/page";
import Popup from "../components/dashBoard.popup";

import RecommendationCardSkeleton from "../components/recommendationCardSkeleton.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


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
  
  

  return (
    <div className={style.card} >
      <h3 className={style.cardTitle}>
        {loading ? <Skeleton /> : "Recommended for You"}
      </h3>

      <div
        className={style.recommendList}
        style={
          loading
            ? { height: "auto" }
            : { maxHeight: "400px", overflowY: "auto" }
        }
      >
        {loading ? (
          <RecommendationCardSkeleton cards={3} />
        ) : (
          availableBooks &&
          availableBooks.map((book) => (
            <AvailableBookCard
              onClick={() => setSelectedBook(book)}
              key={book.bookid}
              {...book}
            />
          ))
        )}
      </div>

      {selectedBook && (
        <Popup
          mode="borrow"
          updateStats={updateStats}
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}
