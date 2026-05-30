import pool from "#root/db/db.js";

import { borrowBook, returnBook } from "./borrow.service.js";

export async function borrowBookController({ params, user }) {
  //SET A BORRO LIMIT SUCH THAT which is available across client and server ..no i put it as 10 it is set in service

  const { userid } = user;
  const { bookid } = params;

  const borrowRecord = await borrowBook(userid, bookid);

  return {
    success: true,
    data: { borrowRecord: borrowRecord },
    message: "Book Borrowed Successfully",
    error: null,
  };
}

export async function returnBookController({ params, user }) {
  const { borrowid } = params;
  const { userid } = user;
  const returndate = await returnBook(borrowid, userid);

  return {
    success: true,
    data: { borrowid: borrowid, returndate: returndate },
    message: "Book Returned Successfully",
    error: null,
  };
}
