import styles from "./page.module.css";

import { BookCard } from "@/components/usersHome/components/borrowedBookCard";

import PopupContainer from "./components/popup";
import SearchComponent from "./components/search";

import { fetchBorrowedBooks } from "#root/lib/server/bookActions.js";
import {
  getBooksByGroup,
  getFilteredBooks,
} from "#root/components/usersHome/utils/borrowhistory.utils";
import { getAuthorString } from "#root/utils.js";

import PageProvider from "./borrowhistory.provider";

export default async function Page({ searchParams }) {
  const { filter, q, sort } = await searchParams;

  const data = await fetchBorrowedBooks();
  const borrowedBooks = data.map((book) => ({
    ...book,
    authorString: getAuthorString(book.authors),
  }));

  const filteredBooks = getFilteredBooks({
    borrowedBooks,
    filter,
    searchTerm: q || "",
  });
  console.count("books");
  //Grouping books based on borrow time
  const groupedBooks = getBooksByGroup(filteredBooks, sort);

  return (
    <PageProvider books={borrowedBooks}>
      <div className={styles.container}>
        <SearchComponent />
        <div className={styles.bookListContainer}>
          {Object.entries(groupedBooks).map(
            ([key, books]) =>
              books.length > 0 && (
                <details key={key} open>
                  <summary>{key}</summary>
                  <div className={styles.bookList}>
                    {books.map((book) => (
                      <BookCard
                        key={book.borrowid}
                        book={book}
                        isUserHome={false}
                      />
                    ))}
                  </div>
                </details>
              ),
          )}
        </div>
        <PopupContainer />
      </div>
    </PageProvider>
  );
}
