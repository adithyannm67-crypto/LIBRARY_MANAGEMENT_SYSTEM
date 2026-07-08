import styles from "../styles/favAuthor.module.css";

import { fetchTopAuthor } from "#root/lib/server/services/books.service";
import { getAuthorString } from "#root/features/users/shared/utils/utils.js";

export default async function FavAuthor() {
    const {author,count}=await fetchTopAuthor();
    
  return (
    <div className={styles.topAuthorCard}>
      <h3 className={styles.cardHeading}>Top Author</h3>

      <div className={styles.authorInfo}>
        <div className={styles.authorAvatar}>{author.charAt(0).toUpperCase()}</div>

        <div className={styles.authorDetails}>
          <p className={styles.authorName}>{author}</p>

          <p className={styles.authorStats}>{count} books read</p>
        </div>
      </div>
    </div>
  );
}
