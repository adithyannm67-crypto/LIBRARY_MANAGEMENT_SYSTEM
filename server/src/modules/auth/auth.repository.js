import pool from "#root/db/db.js";
import AuthError from "#root/classes/AuthError.js";

export default async function getUserDetails(email) {
  const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  if (user.rows.length === 0) {
    throw new AuthError("User not found", 404);
  }

  return user.rows[0];
}
