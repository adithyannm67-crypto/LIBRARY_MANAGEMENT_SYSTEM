import style from "./section.module.css";
import styles from "../styles/recommendation.module.css";

import { BookOpen, ArrowRight } from "lucide-react";

import Link from "next/link";

import BookCard from "../components/availableBookCard";

import { fetchAvailableBooks } from "@/lib/server/services/books.service";

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

        <Link href="/users/books" className={styles.viewAllBtn}>
          <div className={styles.left}>
            <div className={styles.icon}>
              <BookOpen size={20} />
            </div>

            <span>View all</span>
          </div>

          <ArrowRight size={22} className={styles.arrow} />
        </Link>
      </div>
    </div>
  );
}
