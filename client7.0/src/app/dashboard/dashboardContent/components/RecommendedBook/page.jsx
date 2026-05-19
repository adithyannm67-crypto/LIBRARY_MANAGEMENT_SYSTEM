"use client";
import styles from "./page.module.css";

export default function AvailableBookCard({ title, author, genre, onClick }) {
  return (
    <div className={styles.recItem} onClick={onClick}>
      <div className={styles.recCover} />

      <div className={styles.recContent}>
        <h4 className={styles.recTitle}>{title}</h4>

        <p className={styles.recAuthor}>{author}</p>

        <div className={styles.recMeta}>
          <span className={styles.recGenre}>• {genre}</span>
        </div>
      </div>
    </div>
  );
}
