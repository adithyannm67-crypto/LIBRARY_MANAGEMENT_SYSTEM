

import authenticate from "./authenticate";

import getBookById from "./actions/getBookById";
import getFullBorrowRecord from "./actions/getFullBorrowRecord";
import getActiveBorrowRecordById from "./actions/getActiveBorrowRecordById";
import getBookDetails from "./actions/getAllBooks";

export async function fetchBookById(bookid) {
  const user = await authenticate();
  return getBookById(bookid, user?.userid);
}

export async function fetchBorrowedBooks() {
  const user = await authenticate();
  return getFullBorrowRecord(user?.userid);
}

export async function fetchActiveBorrows() {
  const user = await authenticate();
  return getActiveBorrowRecordById(user?.userid);
}

export async function fetchAvailableBooks({ limit } = {}) {
  await authenticate();
  return getBookDetails({ limit });
}
