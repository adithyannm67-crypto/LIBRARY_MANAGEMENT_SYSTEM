import pool from "../db/db";
import AppError from "../classes/AppError";

export default async function getBookDetails({ limit }) {
  let query = "SELECT * FROM books";
  const params = [];
  if (limit !== null) {
    query += " LIMIT $1";
    params.push(limit);
  }
  const dbResult = await pool.query(query, params);

  if (dbResult.rows.length === 0) {
    throw new AppError("No books found", 404);
  }
  const books = Array.from(dbResult.rows);
  console.log("books", books);
  return books;
}
