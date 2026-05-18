import pool from "#root/db/db.js";
export async function getBookDetails() {
  try {
    const dbResult = await pool.query(`SELECT * FROM books`);
    const bk = Array.from(dbResult.rows);
    return bk;
  } catch (err) {
    const error = new Error("DB Error");
    error.statusCode = 500;
    throw error;
  }
}

export async function getFullBorrowRecord(userid) {
  try {
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
    return result.rows;
  } catch (err) {
    const error = new Error("DB Error");
    error.statusCode = 500;
    throw error;
  }
}
