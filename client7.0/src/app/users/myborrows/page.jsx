import styles from "./page.module.css";

import Link from "next/link";

import { PopUpContainer, BookCardWrapper } from "@/features/usersHome/components/page.components/myborrows.component";

import { fetchActiveBorrows } from "#root/lib/server/bookActions.js";
import { getAuthorString } from "#root/shared/utils/utils.js";

import PageProvider from "../../../features/usersHome/providers/myborrows.context";

export default async function Page() {
  const activeBorrows = await fetchActiveBorrows();
  const formatted = activeBorrows.map((book) => ({
    ...book,
    authorString: getAuthorString(book.authors),
  }));
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
