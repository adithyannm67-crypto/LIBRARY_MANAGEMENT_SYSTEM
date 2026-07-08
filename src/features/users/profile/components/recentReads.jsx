"use client";
import styles from "./component.module.css";

import { useState } from "react";

import RatingModal from "@/features/users/shared/components/RatingModal";
import StarRating from "@/features/users/profile/components/StarRating";
import Cover from "@/features/users/shared/components/coverimage";

import { formatDate } from "../../shared/utils/utils";

import { usePage } from "../provider/profile.provider";

export default function RecentReads() {
  const { readingHistory } = usePage();

  const [averageRatings, setAverageRatings] = useState(() => {
    const obj = {};
    readingHistory.forEach((book) => {
      obj[book.bookid] = book.rating || 0;
    });
    return obj;
  });

  return (
    <div className={styles.recentReads}>
      {readingHistory.slice(0, 3).map((book) => (
        <BookCard
          key={book.borrowid}
          book={book}
          averageRating={averageRatings[book.bookid]}
          setAverageRating={setAverageRatings}
        />
      ))}
    </div>
  );
}

const BookCard = ({ book, averageRating, setAverageRating }) => {
  const [showRatingModal, setShowRatingModal] = useState(false);

  return (
    <div className={styles.bookItem} onClick={() => setShowRatingModal(true)}>
      <Cover
        coverurl={book.coverurl}
        width={36}
        height={48}
        title={book.title}
        priority={false}
      />

      <div className={styles.bookInfo}>
        <p className={styles.bookTitle}>{book.title}</p>

        <p className={styles.bookAuthor}>{book.authorString}</p>
      </div>

      <div className={styles.bookMeta}>
        <StarRating rating={averageRating} />

        <span className={styles.bookDate}>{formatDate(book.returndate)}</span>

        {showRatingModal && (
          <RatingModal
            bookName={book.title}
            onClose={() => setShowRatingModal(false)}
            onSubmit={(data) => console.log(data)}
            setAverageRating={(newRating) =>
              setAverageRating((prev) => ({
                ...prev,
                [book.bookid]: newRating,
              }))
            }
            bookid={book.bookid}
          />
        )}
      </div>
    </div>
  );
};
