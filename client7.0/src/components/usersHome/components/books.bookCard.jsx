import styles from "./component.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function BookCard({ book, onClick }) {
    const { title, author, genre } = book;
    const bookcardStyle = `${styles.bookCard3} ${styles.active}`
    const bookCoverStyles = {
        background: "var(--book-cover)",
        height: "120px",
        width: "80px"
    }
    return (
        <div
            className={bookcardStyle}
            onClick={onClick}
        >
            <div
                className={styles.bookCover}
                style={bookCoverStyles}
            />

            <div className={styles.bookContent}>
                <h4>{title}</h4>

                <p className={styles.bookAuthor}>{author}</p>

                <div className={styles.bookMeta}>
                    <span className={styles.recGenre}>• {genre}</span>
                </div>
            </div>
        </div>
    );
}

export function BookCardSkeleton({ cards }) {
    return Array(cards)
        .fill(0)
        .map((_, index) => (
            <div className={styles.bookCard3} key={index}>
                <Skeleton width={80} height={120} />

                <div className={styles.bookContent}>
                    <h4 >
                        <Skeleton />
                    </h4>

                    <p className={styles.bookAuthor}>
                        <Skeleton />
                    </p>

                    <div className={styles.bookMeta}>
                        <span className={styles.recGenre}>
                            <Skeleton />
                        </span>
                    </div>
                </div>
            </div>
        ));
}
