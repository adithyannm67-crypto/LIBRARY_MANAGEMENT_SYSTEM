import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import getBookById from "./actions/getBookById";
import getFullBorrowRecord from "./actions/getFullBorrowRecord";
import getActiveBorrowRecordById from "./actions/getActiveBorrowRecordById";
import getBookDetails from "./actions/getAllBooks";

export async function fetchBookById(bookid) {
  return helper(getBookById, true, bookid);
}

export async function fetchBorrowedBooks() {
  return helper(getFullBorrowRecord, true);
}

export async function fetchActiveBorrows() {
  return helper(getActiveBorrowRecordById, true);
}

export async function fetchAvailableBooks({ limit } = {}) {
  return helper(getBookDetails, false, { limit });
}

const helper = async (handler, isProtected, ...args) => {
  if (isProtected) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("User not authenticated");
    }

    const user = jwtDecode(token);

    return handler(user.userid, ...args);
  }

  return handler(...args);
};
