import style from "./section.module.css";

import Link from "next/link";

import BookCard from "../components/availableBookCard";

import fetchAvailableBooks from "#root/lib/server/actions/fetchAvailablebooks.js";

import formatBook from "@/features/users/shared/utils/formatBook";

export default async function RecommendationsSection() {
  const data = await fetchAvailableBooks({ limit: 5 });
  const formattedData = data.map((book) => formatBook(book));

  return (
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
  );
}
