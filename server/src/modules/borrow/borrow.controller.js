import pool from "#root/db/db.js";

import {
  borrowBook as borrowBookService,
  returnBook as returnBookService,
} from "./borrow.service.js";

export async function borrowBook({ params, user }) {
  //SET A BORRO LIMIT SUCH THAT which is available across client and server ..no i put it as 10 it is set in service

  const { userid } = user;
  const { bookid } = params;

  const borrowRecord = await borrowBookService(userid, bookid);


  return {
    success: true,
    data: { borrowRecord: borrowRecord },
    message: "Book Borrowed Successfully",
    error: null,
  };
}

export async function returnBook({ params, user }) {
  const { borrowid } = params;
  const { userid } = user;
  console.log(borrowid, userid);
  const success = await returnBookService(borrowid, userid);
  if (success) {
    return {
      success: true,
      data: { borrowid: borrowid },
      message: "Book Returned Successfully",
      error: null,
    };
  }
}
