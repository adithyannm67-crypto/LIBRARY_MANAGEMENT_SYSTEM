import styles from "./page.module.css";

import { fetchAvailableBooks } from "#root/features/usersHome/Actions/AvailableBooks";
import { getAuthorString } from "#root/shared/utils/utils.js";
import {
  getFilteredBooks,
  sortBooks,
} from "#root/features/usersHome/books/utils/books.utils.js";

import {
  PopupContainer,
  SearchComponent,
} from "#root/features/usersHome/books/components/books.component.jsx";
import { BookCard } from "#root/features/usersHome/components/books.bookCard.jsx";

import PageProvider from "#root/features/usersHome/books/providers/books.context.js";

export default async function Page({ searchParams }) {
  const { filter, q, sort } = await searchParams;
  const data = await fetchAvailableBooks();
  const availableBooks = data.map((book) => ({
    ...book,
    authorString: getAuthorString(book.authors),
  }));
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
        <div className={`${styles.booklist} ${styles.loaded}`}>
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
