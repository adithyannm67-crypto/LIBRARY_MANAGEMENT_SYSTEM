import {
  getBookDetails,
  getFullBorrowRecord,
  getBookById,
  getActiveBorrowRecordById,
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

export function getActiveBorrowRecordByIdService(userid) {
  return getActiveBorrowRecordById(userid);
}
