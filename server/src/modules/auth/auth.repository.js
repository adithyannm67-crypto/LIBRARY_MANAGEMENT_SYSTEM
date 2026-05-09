import pool from "#root/db/db.js";
import AuthError from "#root/classes/AuthError.js";
console.log(pool)

export default async function getUserDetails(email) {
  const dbResult = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  if (dbResult.rows.length === 0) {
    throw new AuthError("User not found", 404);
  }
  return dbResult.rows[0];
}
