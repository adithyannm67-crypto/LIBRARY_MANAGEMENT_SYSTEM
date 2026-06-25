"use server";

import authenticate from "./authenticate.js";

import { returnTransaction } from "./actions/borrow.repository.js";

export default async function returnBookController(borrowid) {
  const user = await authenticate();
  const userid = user?.userid;

  const returndate = new Date();

  const status = "returned";
  return await returnTransaction(borrowid, userid, returndate, status);
}
