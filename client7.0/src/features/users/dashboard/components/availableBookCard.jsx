import styles from "@/features/users/shared/components/component.module.css";
import common from "@/features/users/shared/styles/common.styles.module.css";
import styles1 from "./component.module.css";

import Link from "next/link";

import CoverImage from "@/features/users/shared/components/coverimage";

export default function BookCard({ book }) {
  const { title, genre, coverurl } = book;

  return (
    <Link
      href={`/users/bookdetails/${book.bookid}?option=Borrow`}
      className={common.bookCard1}
    >
      <CoverImage
        coverurl={coverurl}
        width={50}
        height={70}
        priority={false}
        title={title}
      />

      <div className={styles1.bookContent}>
        <h4 className={common.bookTitle}>{title}</h4>

        <span className={common.bookAuthor}>By {book.authorString}</span>

        <p className={common.recGenre}>• {genre}</p>
      </div>
    </Link>
  );
}
