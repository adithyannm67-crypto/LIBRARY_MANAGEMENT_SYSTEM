"use client";

import styles from "../styles/bookList.module.css";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { BookCard } from "./books.bookCard.jsx";
import PopupContainer from "./popup.jsx";

import { getFilteredBooks, sortBooks } from "../utils/books.utils.js";

import { usePage } from "../providers/books.provider";

const BookList = ({ searchParams: { filter, q, sort } }) => {
  const { availableBooks, borrowedBookIds } = usePage();

  //Filtering books based on search and filters
  const filteredBooks = getFilteredBooks({
    availableBooks,
    filter,
    searchTerm: q || "",
    borrowedBookIds: borrowedBookIds || [],
  });

  //sorting books
  const sortedBooks = sortBooks(filteredBooks, sort);

  return (
    <>
      {sortedBooks.length === 0 ? (
        <EmptySearchResult />
      ) : (
        <>
          <div className={styles.booklist} id="booklist-in-books">
            {sortedBooks.map((book) => (
              <BookCard key={book.bookid} book={book} />
            ))}
          </div>

          <PopupContainer />
        </>
      )}
    </>
  );
};
export default BookList;

function EmptySearchResult() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("filter");
    params.delete("q");
    params.delete("sort");

    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
      { scroll: false },
    );
  };

  return (
    <section className={styles.emptyState}>
      <div className={styles.imageContainer}>
        <Image
          src="/illustrations/empty-search.svg" // your asset
          alt="No search results"
          fill
          priority
        />
      </div>

      <h2 className={styles.title}>No books found</h2>

      <p className={styles.description}>
        We couldn't find any books matching your search or filter criteria. Try
        adjusting your filters or searching for something else.
      </p>

      <div className={styles.actions}>
        <button className={styles.primaryBtn} onClick={clearFilters}>
          Clear Filters
        </button>

        <Link href="/books" className={styles.secondaryBtn}>
          Browse All Books
        </Link>
      </div>

      <div className={styles.suggestions}>
        <span>Try:</span>
        <button>Fiction</button>
        <button>Science</button>
        <button>History</button>
        <button>Popular</button>
      </div>
    </section>
  );
}
