import { getBorrowRecordByUserId } from "./user.repository.js";

export async function getDashBoardData(userid) {
  

  const borrowrecord = await getBorrowRecordByUserId(userid);

  const totalBorrowsThisYear = borrowrecord.filter(
    (record) =>
      new Date(record.borrowdate).getFullYear() === new Date().getFullYear(),
  ).length;
  const currentBorrows = borrowrecord.filter(
    (record) => record.status === "borrowed",
  );

  return { totalBorrowsThisYear, currentBorrows };
}
