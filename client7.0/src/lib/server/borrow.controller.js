"use server"


import authenticate from "./authenticate.js";

import AppError from "./classes/AppError";

import {
  getBorrowedCount,
  getNumberOfCopiesAvailable,
  createBorrowTransaction,
  returnTransaction,
} from "./actions/borrow.repository.js";


export async function borrowBookController(bookid) {
  //SET A BORRO LIMIT SUCH THAT which is available across client and server ..no i put it as 10 it is set in service
  const user = await authenticate();
  const userid=user?.userid;

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

export async function returnBookController(borrowid) {
  const user = await authenticate();
  const userid=user?.userid
  
  const returndate = new Date();

  const status = "returned";
  return await returnTransaction(borrowid, userid, returndate, status);
}