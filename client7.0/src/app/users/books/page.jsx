import styles from "./page.module.css";

import { fetchAvailableBooks } from "#root/components/usersHome/Actions/AvailableBooks";
import { getAuthorString } from "#root/utils";
import {
  getFilteredBooks,
  sortBooks,
} from "#root/components/usersHome/utils/books.utils.js";

import { PopupContainer, BookList, SearchComponent } from "./clientComponents";
import { BookCard } from "#root/components/usersHome/components/books.bookCard.jsx";

import PageProvider from "./usePage";

export default async function Page({ searchParams }) {
  const { filter, q, sort } = await searchParams;
  const data = await fetchAvailableBooks();
  const availableBooks = data.map((book) => ({
    ...book,
    authorString: getAuthorString(book.authors),
  }));
  //Filtering books based on search and filters
  const filteredBooks = getFilteredBooks({availableBooks, filter, searchTerm: q||""});
  console.log(filteredBooks);

  //sorting books
  const sortedBooks = sortBooks(filteredBooks, sort);
  console.log(sortedBooks);

  return (
    <PageProvider availableBooks={availableBooks}>
      <div className={styles.container}>
        <SearchComponent />
        <div className={`${styles.booklist} ${styles.loaded}`}>
          {sortedBooks.length === 0 ? (
            <p>No books found.</p>
          ) : (
            sortedBooks.map((book) => (
              <BookCard
                
                key={book.bookid}
                book={book}
              />
            ))
          )}
        </div>
        <PopupContainer />
      </div>
    </PageProvider>
  );
}
