import pool from "../db/db";


export default async function getBooks({ limit }) {
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
