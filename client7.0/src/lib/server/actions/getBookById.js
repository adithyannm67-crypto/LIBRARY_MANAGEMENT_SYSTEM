import pool from "../db/db.js";
import AppError from "../classes/AppError";

export default async function getBookById(bookid, userid) {
  const result = await pool.query(
    `SELECT
    b.*,br.borrowid
     FROM books b LEFT JOIN borrowrecord br ON b.bookid = br.bookid AND br.userid = $1 AND br.status = 'borrowed' WHERE b.bookid = $2`,
    [userid, bookid],
  );

  if (result.rows.length === 0) {
    throw new AppError("Book not found", 404);
  }
  return result.rows[0];
}
