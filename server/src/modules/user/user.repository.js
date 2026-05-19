
import pool from "#root/db/db.js";
import AuthError from "#root/classes/AuthError.js";



export async function getBorrowRecordByUserId(userid) {
  
  const borrowrecordResult = await pool.query(
    `SELECT br.*,b.title,b.author
    FROM borrowrecord br 
    JOIN books b ON br.bookid=b.bookid WHERE br.userid=$1`,
    [userid],
  );

  if(borrowrecordResult.rowCount === 0){
    throw new AuthError("No borrow records found for this user", 404);
  }
  return borrowrecordResult.rows;
}