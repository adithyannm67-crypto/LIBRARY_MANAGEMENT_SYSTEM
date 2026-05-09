import { error } from "console";
import { getBookDetails, getBorrowedBookDetails,getFullBorrowRecord } from "./book.repository.js";

export async function getAllBooks() {
  const books = await getBookDetails();

  return {
    success: true,
    data: { books: books },
    message: "Books Fetched Successfully",
    error: null,
  };
}

export async function getBorrowedBooks({ user }) {
  const books = await getBorrowedBookDetails(user.userid);

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
