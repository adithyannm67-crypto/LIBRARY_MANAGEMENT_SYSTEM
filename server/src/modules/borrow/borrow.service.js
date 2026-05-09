import dbErrorMapper from "#root/utils/error/dbErrorMapper.js";
import AuthError from "#root/classes/AuthError.js";

import {
  getBorrowedCount,
  checkIsBookAvailable,
  createBorrowTransaction,
  returnTransaction,
} from "./borrow.repository.js";

export async function borrowBook(userid, bookid) {
  try {
    const borrowlimit = 10;

    const borrowed = await getBorrowedCount(userid);

    if (borrowed >= borrowlimit) {
      throw new AuthError("Borrow Limit Reached", 403);
    }

    await checkIsBookAvailable(bookid);

    const today = new Date().toISOString().split("T")[0];
    const status = "borrowed";

    return await createBorrowTransaction(userid, bookid, today, status);
  } catch (err) {
    if (err.statusCode) throw err;
    throw dbErrorMapper(err);
  }
}

export async function returnBook(borrowid, userid) {
  try {
    return await returnTransaction(borrowid, userid);
  } catch (err) {
    if (err.statusCode) throw err;
    throw dbErrorMapper(err);
  }
}
