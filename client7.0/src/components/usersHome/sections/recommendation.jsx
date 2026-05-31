import style from "./section.module.css";
import { useState, useEffect } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import fetchAvailableBooks from "../Actions/AvailableBooks";
import {
  BookCard,
  BookCardSkeleton,
} from "../components/availableBookCard.jsx";
import Popup from "../components/dashBoard.popup";

import { useAppData } from "#root/context/AppDataContext.jsx";

export default function RecommendationsSection() {
  const { loading } = useAppData();
  const [availableBooks, setAvailableBooks] = useState([]);
  const [loadinglocal, setLoadingLocal] = useState(true);

  const [selectedBook, setSelectedBook] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setLoadingLocal(true);
      const data = await fetchAvailableBooks();
      setAvailableBooks(data);
      setLoadingLocal(false);
    }
    if (!loading)
      fetchData();
  }, [loading]);

  return (
    <div className={style.card}>
      <h3 className={style.cardTitle}>
        {loading || loadinglocal ? <Skeleton /> : "Recommended for You"}
      </h3>

      <div
        className={style.recommendList}
        style={
          loading || loadinglocal
            ? { height: "auto" }
            : { maxHeight: "400px", overflowY: "auto" }
        }
      >
        {loading || loadinglocal ? (
          <BookCardSkeleton cards={6} />
        ) : (
          availableBooks &&
          availableBooks.map((book, index) => (
            <BookCard
              onClick={() => setSelectedBook(book)}
              key={index}
              book={book}
            />
          ))
        )}
      </div>

      {selectedBook && (
        <Popup
          mode="borrow"
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => {setSelectedBook(null);
            document.body.style.overflow = "auto";
          }}
        />
      )}
    </div>
  );
}
