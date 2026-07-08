import pool from "../db/db.js";
import { fetchNoOfRatings } from "../services/users.service.js";
//I SHOULD ADD update user achievements code for all the update functions borrow reeturn ,rating,etc
export async function updateUserAchievements(userid, stats) {
  //     const stats = {
  //     streak: await getUserStreak(userid),
  //     booksThisYear: await getBooksThisYear(userid),
  //     ratings: await getRatingCount(userid),
  //     uniqueGenres: await getUniqueGenreCount(userid)
  // };

  const achievements = await pool.query(
    `SELECT 
      a.achievementid,a.metric,a.operator,
      COALESCE(uao.threshold, a.threshold) AS threshold
         FROM achievements a
         LEFT JOIN  user_achievement_overrides uao
         ON uao.achievementid = a.achievementid
         AND uao.userid = $1`,
    [userid],
  );

  for (const achievement of achievements.rows) {
    const actual = stats[achievement.metric];

    // Skip if this metric doesn't exist
    if (actual === undefined) continue;

    let earned = false;

    switch (achievement.operator) {
      case ">=":
        earned = actual >= achievement.threshold;
        break;

      case "<=":
        earned = actual <= achievement.threshold;
        break;

      case ">":
        earned = actual > achievement.threshold;
        break;

      case "<":
        earned = actual < achievement.threshold;
        break;

      case "=":
        earned = actual === achievement.threshold;
        break;
    }

    if (earned) {
      await pool.query(
        `INSERT INTO user_achievements
                 (userid, achievementid)
                 VALUES ($1, $2)
                 ON CONFLICT DO NOTHING`,
        [userid, achievement.achievementid],
      );
    }
  }
}

export async function rateBookRepo(userid, bookid, rating, review = null) {
  await pool.query(
    `
        INSERT INTO bookratings
            (userid, bookid, rating, review)
        VALUES
            ($1,$2,$3,$4)

        ON CONFLICT(userid, bookid)
        DO UPDATE SET
            rating = EXCLUDED.rating,
            review = EXCLUDED.review,
            createdat = CURRENT_TIMESTAMP
        `,
    [userid, bookid, rating, review],
  );

  const result = await pool.query(`SELECT * FROM update_rating_stats($1, $2)`, [bookid,userid]);
  

  await updateUserAchievements(userid, {
    ratings: fetchNoOfRatings(userid),
  });
console.log(result.rows[0])
  return result.rows[0];

}
