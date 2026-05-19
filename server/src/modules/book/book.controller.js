import { getBookDetails, getFullBorrowRecord } from "./book.repository.js";

export async function getAllBooks() {
  const books = await getBookDetails();

  return {
    success: true,
    data: { books: books },
    message: "Books Fetched Successfully",
    error: null,
  };
}

export async function getFullBorrows({ user }) {
  const books = await getFullBorrowRecord(user.userid);
  return {
    success: true,
    data: { books: books },
    message: "Books Fetched Successfully",
    error: null,
  };
}
