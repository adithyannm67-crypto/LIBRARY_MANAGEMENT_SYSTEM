import styles from "./page.module.css";

import { BookCard } from "#root/features/usersHome/components/borrowedBookCard.jsx";
import {
  PopupContainer,
  SearchComponent,
} from "@/features/usersHome/components/page.components/borrowhistory.component";

import { fetchBorrowedBooks } from "#root/lib/server/bookActions.js";
import {
  getBooksByGroup,
  getFilteredBooks,
} from "#root/features/usersHome/utils/borrowhistory.utils";
import { getAuthorString } from "#root/shared/utils/utils.js";

import PageProvider from "@/features/usersHome/providers/borrowhistory.context";

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
