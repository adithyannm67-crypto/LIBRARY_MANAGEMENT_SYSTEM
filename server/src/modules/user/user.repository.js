
import pool from "#root/db/db.js";
import AuthError from "#root/classes/AuthError.js";


export async function getDashBoardDataRepo(userid) {
  const user = await pool.query(`SELECT * FROM users WHERE userid = $1`, [
    userid,
  ]);
  if (user.rows.length === 0) {
    throw new AuthError("User not found", 404);
  }

  const borrowrecord = await pool.query(
    `SELECT br.*,b.title,b.author
    FROM borrowrecord br 
    JOIN books b ON br.bookid=b.bookid WHERE br.userid=$1`,
    [userid],
  );
  const totalBorrowsThisYear = borrowrecord.rows.filter(
    (record) =>
      new Date(record.borrowdate).getFullYear() === new Date().getFullYear(),
  ).length;
  const currentBorrows = borrowrecord.rows.filter(
    (record) => record.status === "borrowed",
  );
  const currentBorrowsCount = currentBorrows.length;
  const nearestDate = new Date(
    Math.min(...currentBorrows.map((record) => new Date(record.duedate))),
  )
    .toISOString()
    .split("T")[0];
    
  const nearestBorrows = currentBorrows
    .filter((record) => record.duedate === nearestDate)
    .map((record) => ({
      title: record.title,
      duedate: record.duedate,
    }));

  const userObject = {
    totalBorrowsThisYear,
    currentBorrowsCount,
    nearestBorrows,
    currentBorrows,
  };
  return userObject;
}
