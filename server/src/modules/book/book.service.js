import { getBookDetails, getFullBorrowRecord } from "./book.repository.js";

export function getAllBooksService(limit) {
  return getBookDetails({ limit });
}

export function getFullBorrowsService(userid) {
  return getFullBorrowRecord(userid);
}
