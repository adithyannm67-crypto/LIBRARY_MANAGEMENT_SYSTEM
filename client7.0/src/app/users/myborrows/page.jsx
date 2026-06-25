import styles from "./page.module.css";

import Link from "next/link";

import PopUpContainer from "@/features/users/myborrows/components/popup";
import BookCardWrapper from "#root/features/users/myborrows/components/bookCardWrapper.jsx";

import  fetchActiveBorrows  from "#root/lib/server/actions/fetchActiveBorrows.js";
import formatBook from "#root/features/users/shared/utils/formatBook.js";

import PageProvider from "@/features/users/myborrows/providers/myborrows.provider";

export default async function Page() {
  const activeBorrows = await fetchActiveBorrows();
  const formatted = activeBorrows.map((book) => formatBook(book));
  return (
    <PageProvider books={formatted}>
      <div className={styles.bookList}>
        {formatted.length > 0 ? (
          formatted.map((book) => (
            <BookCardWrapper key={book.bookid} book={book} />
          ))
        ) : (
          <>
            <p>No active borrows </p>
            <Link href="/users/books">
              Click here to discover new books....
            </Link>
          </>
        )}
      </div>
      <PopUpContainer />
    </PageProvider>
  );
}
