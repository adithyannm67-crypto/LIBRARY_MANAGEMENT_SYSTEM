import styles from "./page.module.css";

import BookCardWrapper from "@/features/users/borrowhistory/components/bookCardWrapper";
import PopupContainer from "@/features/users/borrowhistory/components/popup";
import SearchComponent from "@/features/users/borrowhistory/components/search";

import { fetchBorrowedBooks } from "#root/lib/server/bookActions.js";
import {
  getBooksByGroup,
  getFilteredBooks,
} from "@/features/users/borrowhistory/utils/borrowhistory.utils";
import {
  getAuthorString,
  getCoverUrl,
} from "#root/features/users/shared/utils/utils.js";

import PageProvider from "@/features/users/borrowhistory/providers/borrowhistory.provider";

export default async function Page({ searchParams }) {
  const { filter, q, sort } = await searchParams;

  const data = await fetchBorrowedBooks();
  const borrowedBooks = data.map((book) => ({
    ...book,
    authorString: getAuthorString(book.authors),
    coverurl: getCoverUrl(book.coverid),
  }));

  const filteredBooks = getFilteredBooks({
    borrowedBooks,
    filter,
    searchTerm: q || "",
  });

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
                      <BookCardWrapper key={book.borrowid} book={book} />
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
