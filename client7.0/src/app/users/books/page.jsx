import styles from "./page.module.css";

import { fetchAvailableBooks } from "@/lib/server/bookActions.js";
import { getAuthorString , getCoverUrl} from "@/features/users/shared/utils/utils.js";
import {
  getFilteredBooks,
  sortBooks,
} from "#root/features/users/books/utils/books.utils.js";
import formatBook from "#root/features/users/shared/utils/formatBook.js";

import { BookCard } from "@/features/users/books/components/books.bookCard.jsx";
import PopupContainer from "@/features/users/books/components/popup";
import SearchComponent from "@/features/users/books/components/search";

import PageProvider from "@/features/users/books/providers/books.provider";

export default async function Page({ searchParams }) {
  const { filter, q, sort } = await searchParams;
  const data = await fetchAvailableBooks();
  const availableBooks = data.map((book) => formatBook(book));
  //Filtering books based on search and filters
  const filteredBooks = getFilteredBooks({
    availableBooks,
    filter,
    searchTerm: q || "",
  });

  //sorting books
  const sortedBooks = sortBooks(filteredBooks, sort);

  return (
    <PageProvider availableBooks={availableBooks}>
      <div className={styles.container}>
        <SearchComponent />
        <div className={styles.booklist}>
          {sortedBooks.length === 0 ? (
            <p>No books found.</p>
          ) : (
            sortedBooks.map((book) => (
              <BookCard key={book.bookid} book={book} />
            ))
          )}
        </div>
        <PopupContainer />
      </div>
    </PageProvider>
  );
}
