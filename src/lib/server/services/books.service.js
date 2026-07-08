"use server";

import authenticate from "../auth/authenticate";

import {
  getActiveBorrowRecordById,
  getFullBorrowRecord,
  getBookById,
  getAllAvailableBooks,
  getNoOfBorrowsPerMonth,
  getNoOfBorrowsPerGenre,
  getDistinctBorrowDate,
  getTopAuthor,
} from "../repository/books.repository";

export async function fetchActiveBorrows() {
  const user = await authenticate();
  return getActiveBorrowRecordById(user?.userid);
}

export async function fetchAvailableBooks({ limit } = {}) {
  await authenticate();
  return getAllAvailableBooks({ limit });
}

export async function fetchBookById(bookid) {
  const user = await authenticate();
  return getBookById(bookid, user?.userid);
}

export async function fetchBorrowedBooks({ limit } = {}) {
  const user = await authenticate();
  return getFullBorrowRecord(user?.userid, { limit });
}
export async function fetchNoOfBorrowsPerMonth() {
  const user = await authenticate();
  return getNoOfBorrowsPerMonth(user?.userid);
}

export async function fetchNoOfBorrowsPerGenre() {
  const user = await authenticate();
  return getNoOfBorrowsPerGenre(user?.userid);
}

export async function calculateStreaks() {
  const user = await authenticate();
  let dates = await getDistinctBorrowDate(user?.userid);
  dates = dates.map(({ borrowdate }) => {
    const date = new Date(borrowdate);
    date.setHours(0, 0, 0, 0);
    return date;
  });
  if (dates.length === 0) return [];
  const streaks = [];
  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const diff = (dates[i - 1] - dates[i]) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      streak++;
    } else {
      streaks.push(streak);
      streak = 1;
    }
  }
  streaks.push(streak);
  return streaks;
}

export async function fetchTopAuthor(){
  const user = await authenticate();
  return getTopAuthor(user?.userid);
}
