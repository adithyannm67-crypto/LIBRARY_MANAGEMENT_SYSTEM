import pool from "#root/db/db.js";
import AppError from "#root/classes/AppError.js";
import AuthError from "#root/classes/AuthError.js";

export async function getBorrowedCount(userid) {
  const userResult = await pool.query(
    `SELECT borrowed FROM users WHERE userid = $1`,
    [userid],
  );

  if (userResult.rowCount === 0) {
    throw new AuthError("User not found", 404);
  }

  return userResult.rows[0].borrowed;
}

export async function getNumberOfCopiesAvailable(bookid) {
  const bookResult = await pool.query(
    `SELECT availablecopies FROM books WHERE bookid = $1`,
    [bookid],
  );

  if (bookResult.rowCount === 0) {
    throw new AppError("Book not found", 404);
  }

  return bookResult.rows[0].availablecopies;
}

export async function createBorrowTransaction(userid, bookid, today, status) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    // 1. Update book availability
    const bookResult = await client.query(
      `UPDATE books 
       SET availablecopies = availablecopies - 1 
       WHERE bookid = $1 AND availablecopies > 0 
       RETURNING title, author`,
      [bookid],
    );

    if (bookResult.rowCount === 0) {
      throw new AppError("Book not found", 404);
    }

    // 2. Update user borrow count
    const userResult = await client.query(
      `UPDATE users 
       SET borrowed = borrowed + 1 
       WHERE userid = $1`,
      [userid],
    );

    if (userResult.rowCount === 0) {
      throw new AuthError("User not found", 404);
    }

    // 3. Insert borrow record
    const borrowrecordResult = await client.query(
      `INSERT INTO borrowrecord (userid, bookid, borrowdate, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userid, bookid, today, status],
    );

    if (borrowrecordResult.rowCount === 0) {
      throw new AppError("Failed to create borrow record", 500);
    }
    const borrowRow = borrowrecordResult.rows[0];
    await client.query("COMMIT");

    const formattedRow = {
      ...borrowRow,
      ...bookResult.rows[0],
      returndate: borrowRow.returndate
        ? new Date(borrowRow.returndate).toISOString().split("T")[0]
        : null,
      borrowdate: new Date(borrowRow.borrowdate)?.toISOString().split("T")[0],
      duedate: new Date(borrowRow.duedate)?.toISOString().split("T")[0],
    };

    return formattedRow;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
export async function returnTransaction(borrowid, userid, today, status) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const borrowrecordResult = await client.query(
      `UPDATE borrowrecord 
        SET returndate = $1, status = $2
        WHERE borrowid=$3 AND userid=$4 
        RETURNING bookid `,
      [today, status, borrowid, userid],
    );

    if (borrowrecordResult.rowCount === 0) {
      throw new AuthError("Record not found or unauthorized", 404);
    }
    const { bookid } = borrowrecordResult.rows[0];

    const bookResult = await client.query(
      `UPDATE books 
        SET availablecopies = availablecopies + 1  
        WHERE bookid = $1`,
      [bookid],
    );
    if (bookResult.rowCount === 0) {
      throw new AppError("Book Update Failed", 400);
    }
    const userResult = await client.query(
      `UPDATE users 
        SET borrowed = borrowed - 1     
        WHERE userid = $1 AND borrowed > 0`,
      [userid],
    );
    if (userResult.rowCount === 0) {
      throw new AppError("User Update Failed", 400);
    }
    await client.query("COMMIT");

    
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
