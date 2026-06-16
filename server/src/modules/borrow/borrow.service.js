import AppError from "#root/classes/AppError.js";

import {
  getBorrowedCount,
  getNumberOfCopiesAvailable,
  createBorrowTransaction,
  returnTransaction,
} from "./borrow.repository.js";

export async function borrowBook(userid, bookid) {
  const borrowlimit = 10;

  const borrowed = await getBorrowedCount(userid);

  if (borrowed >= borrowlimit) {
    throw new AppError("Borrow Limit Reached", 403);
  }

  const availableCopies = await getNumberOfCopiesAvailable(bookid);

  if (availableCopies <= 0) {
    throw new AppError("No copies available", 400);
  }

  const borrowdate = new Date();
  const duedate = new Date(borrowdate);
  duedate.setDate(borrowdate.getDate() + 9);
  const status = "borrowed";

  return await createBorrowTransaction(userid, bookid, borrowdate, duedate, status);
}

export async function returnBook(borrowid, userid) {
  const returndate = new Date();

  const status = "returned";
  return await returnTransaction(borrowid, userid, returndate, status);
}
