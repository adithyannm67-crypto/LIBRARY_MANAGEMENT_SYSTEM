import styles from "./page.module.css";
import cardStyles from "#root/common.module.css";

export default function AvailableBookCard({ title, author, genre, onClick }) {


  
  return (
    <div
      className={cardStyles.bookCard1 + " " + cardStyles.bookCard2}
      onClick={onClick}
    >
      <div className={cardStyles.bookCover} style={{ background:"var(--book-cover)" }} />

      <div className={cardStyles.bookContent}>
        <h4 className={cardStyles.bookTitle}>{title}</h4>

        <p className={cardStyles.bookAuthor}>{author}</p>

        <div className={cardStyles.bookMeta}>
          <span className={styles.recGenre}>• {genre}</span>
        </div>
      </div>
    </div>
  );
}
