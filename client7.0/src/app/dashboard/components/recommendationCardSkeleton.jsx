import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "#root/dashboard/components/RecommendedBook/page.module.css";
import cardStyle from "#root/common.module.css";

export default function RecommendationCardSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className={cardStyle.bookCard1} key={index}>
        <div className={cardStyle.bookCover}>
          <Skeleton width="100%" height="100%" />
        </div>
        <div className={cardStyle.bookContent}>
          <h4 className={cardStyle.bookTitle}>
            <Skeleton />
          </h4>

          <p className={cardStyle.bookAuthor}>
            <Skeleton />
          </p>

          <div className={cardStyle.bookMeta}>
            <span className={styles.recGenre}>
              <Skeleton />
            </span>
          </div>
        </div>
      </div>
    ));
}
