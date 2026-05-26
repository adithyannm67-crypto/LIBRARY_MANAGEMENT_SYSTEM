import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import bookCardStyle from "#root/dashboard/components/BookCard/page.module.css";
import cardStyle from "#root/common.module.css";

export default function BookCardSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div key={index} className={cardStyle.bookCard1}>
        <div className={cardStyle.bookCover}>
          <Skeleton width="100%" height="100%" />
        </div>

        <div className={cardStyle.bookContent}>
          <h3 className={cardStyle.bookTitle}>
            <Skeleton />
          </h3>
          <p className={cardStyle.bookAuthor}>
            <Skeleton />
          </p>

          <div className={cardStyle.bookStatus}>
            <div className={bookCardStyle.iconWrapper}>
              <Skeleton />
            </div>
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    ));
}
