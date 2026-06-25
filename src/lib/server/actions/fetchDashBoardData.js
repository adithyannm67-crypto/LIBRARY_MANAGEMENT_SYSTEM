
import authenticate from "../auth/authenticate";
import getFullBorrowRecord from "../repository/getFullBorrowRecord";

export default async function fetchDashBoardData() {
  const user = await authenticate();
  const userid = user?.userid;

  const borrowrecord = await getFullBorrowRecord(userid);
  let totalBorrowsThisYear = 0;
  let totalBorrowsThisMonth = 0;
  let totalBorrows = 0;
  let totalBorrowsThisWeek = 0;
  let activeBorrows = [];

  let nearestDate = null;
  let nearestBorrows = [];
  const now = new Date();
  let sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  for (let record of borrowrecord) {
    const borrowDate = new Date(record.borrowdate);
    const dueDate = new Date(record.duedate);

    totalBorrows++;

    if (borrowDate.getFullYear() === now.getFullYear()) {
      totalBorrowsThisYear++;
      if (borrowDate.getMonth() === now.getMonth()) {
        totalBorrowsThisMonth++;
      }
    }

    if (borrowDate >= sevenDaysAgo && borrowDate <= now) {
      totalBorrowsThisWeek++;
    }
    if (record.status === "borrowed") {
      activeBorrows.push(record);
      if (now <= dueDate) {
        if (nearestDate === null || dueDate < nearestDate) {
          // Found a closer due date, reset the nearest borrows list
          nearestDate = dueDate;
          nearestBorrows = [
            {
              title: record.title,
              duedate: record.duedate,
              borrowid: record.borrowid,
            },
          ];
        } else if (dueDate.getTime() === nearestDate.getTime()) {
          // Found a record with the same due date, add it to the nearest borrows list
          nearestBorrows.push({
            title: record.title,
            duedate: record.duedate,
            borrowid: record.borrowid,
          });
        }
      }
    }
  }

  
  return {
    totalBorrows,
    totalBorrowsThisYear,
    activeBorrows,
    nearestBorrows,
    totalBorrowsThisMonth,
    totalBorrowsThisWeek,
  };
}
