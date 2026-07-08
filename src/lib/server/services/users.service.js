"use server";
import authenticate from "../auth/authenticate";
import {
  getTotalNoOfBorrows,
  getNoOfBorrowsInLastMonth,
  getNoOfBorrowsInLastWeek,
  getNoOfBorrowsInLastYear,
  getActiveBorrows,
  getActiveNearestBorrows,
} from "../repository/books.repository";
import { rateBookRepo } from "../repository/other.repository";
import { getAchievements, getNoOfRatings } from "../repository/user.repository";

export default async function fetchDashBoardData() {
  const user = await authenticate();
  const userid = user?.userid;

  const activeBorrows = await getActiveBorrows(userid);
  const totalBorrowsThisYear = await getNoOfBorrowsInLastYear(userid);
  const totalBorrowsThisMonth = await getNoOfBorrowsInLastMonth(userid);
  const totalBorrows = await getTotalNoOfBorrows(userid);
  const totalBorrowsThisWeek = await getNoOfBorrowsInLastWeek(userid);
  const nearestBorrows = await getActiveNearestBorrows(userid);

  return {
    totalBorrows,
    activeBorrows,
    nearestBorrows,
    totalBorrowsThisYear,
    totalBorrowsThisMonth,
    totalBorrowsThisWeek,
  };
}

export async function fetchAchievementsData() {
  const user = await authenticate();
  return getAchievements(user?.userid);
}

export async function fetchNoOfRatings() {
  const user = await authenticate();
  return getNoOfRatings(user?.userid);
}

export async function rateBook(bookid, rating, review) {
  const user = await authenticate();
  return rateBookRepo(user?.userid, bookid, rating, review);
}
