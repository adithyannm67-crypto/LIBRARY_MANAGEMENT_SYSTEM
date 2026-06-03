import {
  getBookDetails,
  getFullBorrowRecord,
  getBookById,
} from "./book.repository.js";

export function getAllBooksService(limit) {
  return getBookDetails({ limit });
}

export function getFullBorrowsService(userid) {
  return getFullBorrowRecord(userid);
}

export function getBookByIdService(bookid, userid) {
  return getBookById(bookid, userid);
}
