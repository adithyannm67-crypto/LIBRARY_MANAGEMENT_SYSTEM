import pool from "../db/db";
export default async function getActiveBorrowRecordById(userid) {
  const borrowrecordResult = await pool.query(
    `SELECT br.*,b.title,b.authors
    FROM borrowrecord br 
    JOIN books b ON br.bookid=b.bookid WHERE br.userid=$1 AND status = 'borrowed'`,
    [userid],
  );

  return borrowrecordResult.rows;
}
