import styles from "./page.module.css";

import { Search, LibraryBig } from "lucide-react";

import Link from "next/link";

import PopUpContainer from "@/features/users/myborrows/components/popup";
import BookCardWrapper from "#root/features/users/myborrows/components/bookCardWrapper.jsx";

import { fetchActiveBorrows } from "@/lib/server/services/books.service";
import formatBook from "#root/features/users/shared/utils/formatBook.js";

import PageProvider from "@/features/users/myborrows/providers/myborrows.provider";

export default async function Page() {
  const activeBorrows = await fetchActiveBorrows();
  const formatted = activeBorrows.map((book) => formatBook(book));
  return (
    <PageProvider books={formatted}>
      {formatted.length > 0 ? (
        <>
          {formatted.map((book) => (
            <BookCardWrapper key={book.bookid} book={book} />
          ))}{" "}
          <PopUpContainer />
        </>
      ) : (
        <EmptyState />
      )}
    </PageProvider>
  );
}

const EmptyState = () => {
  return (
    <div className={styles.emptyState}>
      <img
        src="/illustrations/empty-book.svg"
        alt="No active borrows"
        className={styles.illustration}
      />

      {/* Content */}
      <div className={styles.content}>
        <h2 className={styles.title}>No active borrows</h2>

        <p className={styles.description}>
          You don't have any books borrowed right now.
          <br />
          Find your next greatread and start your journey.
        </p>

        {/* Actions */}
        <div className={styles.actions}>
          <Link href="/users/borrowhistory" className={styles.primaryBtn}>
            <Search size={18} />
            Browse Catalogue
          </Link>

          <Link href="/users/books" className={styles.secondaryBtn}>
            <LibraryBig size={18} />
            Explore Categories
          </Link>
        </div>
      </div>
    </div>
  );
};
