"use client";

import styles from "../styles/RatingModal.module.css";

import { useState } from "react";

import { rateBook } from "#root/lib/server/services/users.service.js";

export default function RatingModal({
  bookid,
  bookName,
  onClose,
  onSubmit,
  setAverageRating,
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    if (!rating) return;
    e.stopPropagation();
    onSubmit({
      rating,
      review,
    });

    const result = await rateBook(bookid, rating, review);

    setAverageRating(result.averagerating);

    onClose();
  };
  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  const getMessage = () => {
    switch (rating) {
      case 1:
        return "Poor 😞";
      case 2:
        return "Fair 😐";
      case 3:
        return "Good 🙂";
      case 4:
        return "Great 😃";
      case 5:
        return "Excellent 🤩";
      default:
        return "";
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={handleClose}>
          ✕
        </button>

        <h2 className={styles.title}>Rate this book</h2>

        <p className={styles.subtitle}>
          How was your experience with
          <span> {bookName}</span>?
        </p>

        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`${styles.star} ${
                star <= (hover || rating) ? styles.active : ""
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>

        <div className={styles.message}>{getMessage()}</div>

        <textarea
          className={styles.textarea}
          placeholder="Write an optional review..."
          value={review}
          maxLength={200}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className={styles.count}>{review.length}/200</div>

        <div className={styles.buttons}>
          <button className={styles.skipBtn} onClick={handleClose}>
            Skip
          </button>

          <button
            className={styles.submitBtn}
            disabled={!rating}
            onClick={handleSubmit}
          >
            Submit Rating
          </button>
        </div>

        <p className={styles.note}>Your review will help other readers.</p>
      </div>
    </div>
  );
}
