import pool from "../db/db.js";
import AuthError from "../error/AuthError.js";

export default async function getUserDetails(email) {
  const user = await pool.query(
    `SELECT userid,name,role,password,created_at FROM users WHERE email = $1`,
    [email],
  );
  if (user.rows.length === 0) {
    throw new AuthError("User not found", 404);
  }

  return user.rows[0];
}

export async function getAchievements(userid) {
  const dBresult = await pool.query(
    `SELECT a.label,a.description AS desc,a.icon::text,(ua.userid IS NOT NULL) AS earned FROM achievements a
    LEFT JOIN user_achievements ua
    ON a.achievementid=ua.achievementid
    AND ua.userid=$1 ORDER BY (ua.userid IS NOT NULL) DESC`,
    [userid],
  );

  return dBresult.rows;
}

export async function getNoOfRatings(userid){
  const dbResult = await pool.query(
    `SELECT COUNT(*)::int as count FROM bookratings WHERE userid=$1 AND rating IS NOT NULL`,
    [userid],
  );
  return dbResult.rows[0].count;
}




