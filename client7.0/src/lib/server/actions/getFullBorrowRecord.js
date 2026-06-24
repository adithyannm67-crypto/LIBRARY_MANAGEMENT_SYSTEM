import pool from "../db/db";
import AppError from "../classes/AppError";
export default async function getFullBorrowRecord(userid) {
  const result = await pool.query(
    `SELECT 
         br.*, 
         b.title, 
         b.authors
       FROM borrowrecord br
       JOIN books b ON br.bookid = b.bookid
       WHERE br.userid = $1`,
    [userid],
  );
  if (result.rows.length === 0) {
    throw new AppError("No borrow records found for this user", 404);
  }
  return result.rows;
}
