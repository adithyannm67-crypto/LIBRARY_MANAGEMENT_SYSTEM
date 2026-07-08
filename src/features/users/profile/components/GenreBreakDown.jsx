import styles from "../styles/genreBreaKDown.module.css";


import { fetchNoOfBorrowsPerGenre } from "#root/lib/server/services/books.service";

export default async function GenreBreakDown() {
      const genreData=await fetchNoOfBorrowsPerGenre();
  const totalGenreBooks = genreData.reduce((s, g) => s + g.count, 0);
  return (
    <div className={styles.genreCard}>
      <h3 className={styles.genreHeading}>Genre Breakdown</h3>

      <div className={styles.genreList}>
        {genreData.map((g) => (
          <div key={g.genre} className={styles.genreItem}>
            <div className={styles.genreHeader}>
              <span className={styles.genreName}>{g.genre}</span>

              <span className={styles.genreCount}>{g.count}</span>
            </div>

            <div className={styles.genreTrack}>
              <div
                className={styles.genreBar}
                style={{
                  width: `${(g.count / totalGenreBooks) * 100}%`,
                  backgroundColor: "var(--primary)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
