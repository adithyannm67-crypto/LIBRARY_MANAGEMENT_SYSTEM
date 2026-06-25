import pool from "../db/db";

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

  return result.rows;
}
