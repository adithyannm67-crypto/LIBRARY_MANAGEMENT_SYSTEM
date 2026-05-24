import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./page.module.css";




import {
  Skeleton,
  SkeletonText,
  
} from "#root/components/skeletons";
import { BookCard } from "../components/BookCard/page";
import Popup from "../components/BookCard/popup";

export default function BorrowedBooksSection({ loading, stats, updateStats }) {
  const { activeBorrows } = stats;

  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState(null);
  if (loading) {
    return (
      <div className={style.mainContent}>
        <div className={style.card}>
          <SkeletonText width="150px" height="24px"></SkeletonText>
          <Skeleton width="550px" height="120px" />
          <Skeleton width="550px" height="120px" />
          <Skeleton width="550px" height="120px" />
        </div>
      </div>
    );
  }
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
