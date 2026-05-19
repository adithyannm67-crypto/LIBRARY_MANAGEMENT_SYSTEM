import pool from "#root/db/db.js";
import AppError from "#root/classes/AppError.js";
export async function getBookDetails() {
  const dbResult = await pool.query(`SELECT * FROM books`);
  if (dbResult.rows.length === 0) {
    throw new AppError("No books found", 404);
  }
  const books = Array.from(dbResult.rows);
  return books;
}

export async function getFullBorrowRecord(userid) {
  const result = await pool.query(
    `SELECT 
         br.*, 
         b.title, 
         b.author
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
