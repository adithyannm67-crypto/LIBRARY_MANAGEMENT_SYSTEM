import styles from "./page.module.css";

import Image from "next/image";
import Link from "next/link";

import BookCardWrapper from "@/features/users/borrowhistory/components/bookCardWrapper";
import PopupContainer from "@/features/users/borrowhistory/components/popup";
import SearchComponent from "@/features/users/borrowhistory/components/search";

import { fetchBorrowedBooks } from "@/lib/server/services/books.service";
import {
  getBooksByGroup,
  getFilteredBooks,
} from "@/features/users/borrowhistory/utils/borrowhistory.utils";

import formatBook from "#root/features/users/shared/utils/formatBook.js";

import PageProvider from "@/features/users/borrowhistory/providers/borrowhistory.provider";

export default async function Page({ searchParams }) {
  const { filter, q, sort } = await searchParams;

  const data = await fetchBorrowedBooks();
  const borrowedBooks = data.map((book) => formatBook(book));

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
        {!Object.keys(groupedBooks).length === 0 ? (
          <BorrowHistoryEmpty />
        ) : (
          <>
            {" "}
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
          </>
        )}
        <PopupContainer />
      </div>
    </PageProvider>
  );
}

function BorrowHistoryEmpty() {
  return (
    <section className={styles.container}>
      <main className={styles.emptyState}>
        <div className={styles.illustration}>
          <Image
            src="/illustrations/empty-book.svg"
            alt="No borrowed books"
            fill
            priority
          />
        </div>

        <h2>No borrowed books yet</h2>

        <p>
          You haven't borrowed any books.
          <br />
          Explore the catalog and find your next great read.
        </p>

        <Link href="/users/books" className={styles.browseBtn}>
          📖 Browse Books
        </Link>
      </main>
    </section>
  );
}
