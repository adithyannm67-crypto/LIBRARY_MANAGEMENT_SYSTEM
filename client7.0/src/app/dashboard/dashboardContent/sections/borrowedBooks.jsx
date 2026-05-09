

import { useRouter } from "next/navigation";
import style from "./page.module.css";
import { BookCard } from "../components/BookCard/page";


export default function BorrowedBooksSection({ borrowedBooks }) {
  const router = useRouter();
  return (
    <div className={style.mainContent}>
      <div className={style.card}>
        <h2 className={style.sectionTitle}>Your Books</h2>
        

        <div className={style.bookList}>
          {borrowedBooks.map((book, index) => (
          
            <BookCard key={index} {...book} />
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push("/dashboard/catalog")}
        className={style.browseBtn}
      >
        Browse Catalog
      </button>
    </div>
  );
}
