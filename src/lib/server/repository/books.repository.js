
import pool from "../db/db";
import AppError from "../error/AppError";

export async function getFullBorrowRecord(userid, { limit } = {}) {
  let query =
    "SELECT br.*, b.title, b.authors,b.pages,b.averagerating as rating,b.coverid FROM borrowrecord br JOIN books b ON br.bookid = b.bookid WHERE br.userid = $1 ORDER BY br.borrowdate ASC";
  const params = [userid];
  if (limit !== null) {
    query += " LIMIT $2";
    params.push(limit);
  }
  const result = await pool.query(query, params);

  return result.rows;
}


export async function getBookById(bookid, userid) {
  const result = await pool.query(
    `SELECT
     b.*,br.borrowid
     FROM books b LEFT JOIN borrowrecord br 
     ON b.bookid = br.bookid AND br.userid = $1 AND br.status = 'borrowed' 
     WHERE b.bookid = $2`,
    [userid, bookid],
  );

  if (result.rows.length === 0) {
    throw new AppError("Book not found", 404);
  }
  return result.rows[0];
}

export async function getAllAvailableBooks({ limit }) {
  let query = "SELECT * FROM books";
  const params = [];
  if (limit !== null) {
    query += " LIMIT $1";
    params.push(limit);
  }
  const dbResult = await pool.query(query, params);

  const books = Array.from(dbResult.rows);
  return books;
}

export async function getActiveBorrowRecordById(userid) {
  const borrowrecordResult = await pool.query(
    `SELECT 
     br.*,b.title,b.authors
     FROM borrowrecord br JOIN books b 
     ON br.bookid=b.bookid 
     WHERE br.userid=$1 AND status = 'borrowed'`,
    [userid],
  );

  return borrowrecordResult.rows;
}

export async function getActiveBorrows(userid) {
  const borrowrecordResult = await pool.query(
    `SELECT 
     br.*,b.title,b.authors
     FROM borrowrecord br JOIN books b 
     ON br.bookid=b.bookid 
     WHERE br.userid=$1 AND status = 'borrowed'`,
    [userid],
  );
  return borrowrecordResult.rows;
}

export async function getActiveNearestBorrows(userid) {
  const borrowrecordResult = await pool.query(
    `SELECT 
     br.*,b.title,b.authors
     FROM borrowrecord br JOIN books b 
     ON br.bookid=b.bookid 
     WHERE br.userid=$1 
     AND status = 'borrowed'
     AND br.duedate >= NOW()
     AND br.duedate=(SELECT MIN(duedate) FROM borrowrecord WHERE userid=$1 AND status = 'borrowed')`,
    [userid],
  );
  return borrowrecordResult.rows;
}

export async function getTotalNoOfBorrows(userid) {
  const borrowrecordResult = await pool.query(
    `SELECT 
     COUNT(*)
     FROM borrowrecord
     WHERE userid=$1`,
    [userid],
  );
  return Number(borrowrecordResult.rows[0].count);
}

export async function getNoOfBorrowsInLastYear(userid) {
  const borrowrecordResult = await pool.query(
    `SELECT 
     COUNT(*)
     FROM borrowrecord
     WHERE userid=$1
     AND borrowdate >= NOW() - INTERVAL '1' YEAR`,
    [userid],
  );
  return Number(borrowrecordResult.rows[0].count);
}

export async function getNoOfBorrowsInLastMonth(userid) {
  const borrowrecordResult = await pool.query(
    `SELECT 
     COUNT(*)
     FROM borrowrecord
     WHERE userid=$1
     AND borrowdate >= NOW() - INTERVAL '1' MONTH`,
    [userid],
  );
  return Number(borrowrecordResult.rows[0].count);
}

export async function getNoOfBorrowsInLastWeek(userid) {
  const borrowrecordResult = await pool.query(
    `SELECT 
     COUNT(*)
     FROM borrowrecord
     WHERE userid=$1
     AND borrowdate >= NOW() - INTERVAL '7' DAY `,
    [userid],
  );
  return Number(borrowrecordResult.rows[0].count);
}

export async function getNoOfBorrowsPerMonth(userid) {
  const MONTH_DATA = [
    { month: "Jan", books: 0 },
    { month: "Feb", books: 0 },
    { month: "Mar", books: 0 },
    { month: "Apr", books: 0 },
    { month: "May", books: 0 },
    { month: "Jun", books: 0 },
    { month: "Jul", books: 0 },
    { month: "Aug", books: 0 },
    { month: "Sep", books: 0 },
    { month: "Oct", books: 0 },
    { month: "Nov", books: 0 },
    { month: "Dec", books: 0 },
  ];

  const dbResult = await pool.query(
    `SELECT 
     EXTRACT(MONTH FROM borrowdate)::int as month,COUNT(*)::int as books
     FROM borrowrecord
     WHERE userid=$1
     GROUP BY month`,
    [userid],
  );
  dbResult.rows.forEach((row) => {
    MONTH_DATA[row.month - 1].books = row.books;
  });
  return MONTH_DATA;
}

export async function getNoOfBorrowsPerGenre(userid){
  const dbResult = await pool.query(
    `SELECT 
     b.genre,COUNT(br.borrowid)::int as count
     FROM borrowrecord br JOIN books b 
     ON br.bookid=b.bookid
     WHERE userid=$1
     GROUP BY b.genre`,
    [userid],
  );
  return dbResult.rows;
  
}

export async function getNoOfUniqueGenres(userid){
  const dbResult = await pool.query(
    `SELECT 
     COUNT(DISTINCT(b.genre))::int as count
     FROM borrowrecord br JOIN books b 
     ON br.bookid=b.bookid
     WHERE br.userid=$1`,
    [userid],
  );
  return dbResult.rows[0].count;
}



export async function getDistinctBorrowDate(userid){
  const dbResult = await pool.query(
    `SELECT 
     DISTINCT(borrowdate)
     FROM borrowrecord
     WHERE userid=$1 
     ORDER BY borrowdate DESC`,
    [userid],
  );
  return dbResult.rows;
  
}

export async function getTopAuthor(userid){
  const dbResult = await pool.query(
    `SELECT 
     j.value AS author,COUNT(br.borrowid)::int AS count
     FROM borrowrecord br JOIN books b 
     ON br.bookid=b.bookid
     CROSS JOIN LATERAL json_each_text(b.authors) AS j
     WHERE userid=$1
     GROUP BY j.value
     ORDER BY count DESC
     LIMIT 1`,
    [userid],
  );
  return dbResult.rows[0];
  
}

