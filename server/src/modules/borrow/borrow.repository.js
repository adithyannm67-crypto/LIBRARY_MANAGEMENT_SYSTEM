import pool from "#root/db/db.js";
import AppError from "#root/classes/AppError.js";

export async function getBorrowedCount(userid) {
  const dbResult = await pool.query(
    `SELECT borrowed FROM users WHERE userid = $1`,
    [userid],
  );
  const row = dbResult.rows[0];
  if (!row) {
    throw new AppError("User not found", 404);
  }

  return row.borrowed;
}

export async function checkIsBookAvailable(bookid) {
  const dbResult = await pool.query(
    `SELECT availablecopies FROM books WHERE bookid = $1`,
    [bookid],
  );

  const row = dbResult.rows[0];
  if (!row) {
    throw new AppError("Book not found", 404);
  }
  if (row.availablecopies <= 0) {
    throw new AppError("No copies available", 400);
  }
  return;
}

export async function createBorrowTransaction(userid, bookid, today, status) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    // 1. Update book availability (SAFE version)
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
      throw new AppError("User not found", 404);
    }

    // 3. Insert borrow record
    const borrowResult = await client.query(
      `INSERT INTO borrowrecord (userid, bookid, borrowdate, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userid, bookid, today, status],
    );

    const borrowRow = borrowResult.rows[0];
    if (!borrowRow) {
      throw new AppError("Failed to create borrow record", 500);
    }

    await client.query("COMMIT");
    console.log(borrowRow);

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
export async function returnTransaction(borrowid, userid) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const deleteResult = await client.query(
      `DELETE FROM borrowrecord 
        WHERE borrowid=$1 AND userid=$2 
        RETURNING bookid `,
      [borrowid, userid],
    );
    console.log(deleteResult);
    if (deleteResult.rowCount === 0) {
      throw new AppError("Record not found or unauthorized", 404);
    }
    const { bookid } = deleteResult.rows[0];
    console.log(bookid);

    const bookUpdate = await client.query(
      `UPDATE books 
        SET availablecopies = availablecopies + 1  
        WHERE bookid = $1`,
      [bookid],
    );
    if (bookUpdate.rowCount === 0) {
      throw new AppError("Book Update Failed", 400);
    }
    const userUpdate = await client.query(
      `UPDATE users 
        SET borrowed = borrowed - 1     
        WHERE userid = $1 AND borrowed > 0`,
      [userid],
    );
    if (userUpdate.rowCount === 0) {
      throw new AppError("Invalid Borrow Count", 400);
    }
    await client.query("COMMIT");

    return true;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
/*
function getBookDetals(bookid) {
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

    const formattedRows = result.rows.map((record) => ({
      ...record,
      returndate: record.returndate?.toISOString().split("T")[0],
      borrowdate: record.borrowdate?.toISOString().split("T")[0],
      duedate: record.duedate?.toISOString().split("T")[0],
    }));
    return formattedRows;
  } catch (err) {
    const error = new Error("DB Error");
    error.statusCode = 500;
    throw error;
  }
}

*/
