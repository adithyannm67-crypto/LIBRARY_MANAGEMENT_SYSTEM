import authenticate from "../auth/authenticate";

import getFullBorrowRecord from "../repository/getFullBorrowRecord";

export  default async function fetchBorrowedBooks() {
  const user = await authenticate();
  return getFullBorrowRecord(user?.userid);
}
