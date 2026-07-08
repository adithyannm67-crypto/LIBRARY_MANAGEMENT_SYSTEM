import styles from "./page.module.css";

import SearchComponent from "@/features/users/books/components/search";

import { fetchAvailableBooks } from "@/lib/server/services/books.service";
import formatBook from "@/features/users/shared/utils/formatBook.js";

import PageProvider from "@/features/users/books/providers/books.provider";
import BookList from "@/features/users/books/components/bookList.jsx";

export default async function Page({ searchParams }) {
  const data = await fetchAvailableBooks();

  const availableBooks = data.map((book) => formatBook(book));

  return (
    <PageProvider availableBooks={availableBooks}>
      <div className={styles.container}>
        <SearchComponent />
        <BookList searchParams={ await searchParams} />
      </div>
    </PageProvider>
  );
}
