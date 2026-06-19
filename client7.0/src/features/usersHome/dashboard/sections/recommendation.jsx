
import style from "./section.module.css";

import Link from "next/link";

import { fetchAvailableBooks } from "../../shared/actions/AvailableBooks";
import { getAuthorString } from "#root/shared/utils/utils.js";
import { BookCard } from "../components/availableBookCard.jsx";

export default async function RecommendationsSection() {
  const data = await fetchAvailableBooks({ limit: 5 });
  const formattedData = data.map((book) => ({
    ...book,
    authorString: getAuthorString(book.authors),
  }));

  return (
    <>
      <div className={style.card}>
        <h3 className={style.cardTitle}>Recommended for You</h3>

        <div className={style.recommendList}>
          {formattedData.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
          <Link className={style.viewAll} href="/users/books">
            View all
          </Link>
        </div>
      </div>
    </>
  );
}
