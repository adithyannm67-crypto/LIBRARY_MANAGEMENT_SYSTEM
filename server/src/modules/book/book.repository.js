import pool from "#root/db/db.js";
import AppError from "#root/classes/AppError.js";
export async function getBookDetails({ limit }) {
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
  return books;
}

export async function getFullBorrowRecord(userid) {
  const result = await pool.query(
    `SELECT 
         br.*, 
         b.title, 
         b.authors
       FROM borrowrecord br
       JOIN books b ON br.bookid = b.bookid
       WHERE br.userid = $1`,
    [userid],
  );
  if (result.rows.length === 0) {
    throw new AppError("No borrow records found for this user", 404);
  }
  return result.rows;
}

export async function getBookById(bookid, userid) {
  const result = await pool.query(
    `SELECT
    b.*,br.borrowid
     FROM books b LEFT JOIN borrowrecord br ON b.bookid = br.bookid AND br.userid = $1 AND br.status = 'borrowed' WHERE b.bookid = $2`,
    [userid, bookid],
  );

  if (result.rows.length === 0) {
    throw new AppError("Book not found", 404);
  }
  return result.rows[0];
}

export async function getActiveBorrowRecordById(userid) {
  const borrowrecordResult = await pool.query(
    `SELECT br.*,b.title,b.authors
    FROM borrowrecord br 
    JOIN books b ON br.bookid=b.bookid WHERE br.userid=$1 AND status = 'borrowed'`,
    [userid],
  );

  return borrowrecordResult.rows;
}

// const booksCorct = [
//   {
//     id: 3,
//     authors: {
//       "/authors/OL498120A": "Harper Lee",
//     },
//     coverid: 14817209,
//     isbn: null,
//     editionid: "/books/OL22199990M",
//     publishdate: "1960-07-11",
//     title: "To kill a mocking bird",
//     workid: "/works/OL3140822W",
//     description: "",
//     publishers: "McClelland & Stewart",
//   },
//   {
//     id: 1,
//     authors: {
//       "/authors/OL66700A": "Paulo Coelho",
//     },
//     coverid: 15121528,
//     isbn: "9780061122415",
//     editionid: "/books/OL7288233M",
//     publishdate: "2006-04-25",
//     title: "The Alchemist",
//     workid: "/works/OL796465W",
//     description: null,
//     publishers: "HarperSanFrancisco",
//   },
//   {
//     id: 2,
//     authors: {
//       "": "James Clear",
//     },
//     coverid: 15217381,
//     isbn: "9781847941831",
//     editionid: "/books/OL27918581M",
//     publishdate: "2018-10-16",
//     title: "Atomic Habits",
//     workid: "/works/OL17930368W",
//     description: null,
//     publishers: "Random House Business Books",
//   },
//   {
//     id: 4,
//     authors: {
//       "/authors/OL118077A": "George Orwell",
//     },
//     coverid: null,
//     isbn: "9798589519365",
//     editionid: "/books/OL42383395M",
//     publishdate: "2021",
//     title: "1984",
//     workid: "/works/OL30827457W",
//     description: null,
//     publishers: "independently published",
//   },
//   {
//     id: 5,
//     authors: {
//       "/authors/OL2670651A": "Andrew Hunt",
//       "/authors/OL2670652A": "David Thomas",
//     },
//     coverid: 15136784,
//     isbn: "9780201616224",
//     editionid: "/books/OL7408140M",
//     publishdate: "1999-10-20",
//     title: "The Pragmatic Programmer",
//     workid: "/works/OL5748544W",
//     description:
//       "Ward Cunningham Straight from the programming trenches, The Pragmatic Programmer cuts through the increasing specialization and technicalities of modern software development to examine the core process--taking a requirement and producing working, maintainable code that delights its users. It covers topics ranging from personal responsibility and career development to architectural techniques for keeping your code flexible and easy to adapt and reuse. Read this book, and you’ll learn how to Fight software rot; Avoid the trap of duplicating knowledge; Write flexible, dynamic, and adaptable code; Avoid programming by coincidence; Bullet-proof your code with contracts, assertions, and exceptions; Capture real requirements; Test ruthlessly and effectively; Delight your users; Build teams of pragmatic programmers; and Make your developments more precise with automation. Written as a series of self-contained sections and filled with entertaining anecdotes, thoughtful examples, and interesting analogies, The Pragmatic Programmer illustrates the best practices and major pitfalls of many different aspects of software development. Whether you’re a new coder, an experienced program.",
//     publishers: "Addison-Wesley",
//   },
//   {
//     id: 6,
//     authors: { "": "Yuval Noah Harari" },
//     coverid: 8284312,
//     isbn: "9788377059968",
//     editionid: "/books/OL26592198M",
//     publishdate: "2018 01-01",
//     workid: "/works/OL17075811W",
//     description: null,
//     title: "Sapiens",
//     publishers: "Wydawnictwo Naukowe PWN and Dom Wydawniczy PWN",
//   },
//   {
//     id: 7,
//     authors: { "/authors/OL23919A": "J.K. Rowling" },
//     coverid: 15225096,
//     isbn: "9780545582889",
//     editionid: "/books/OL30621390M",
//     publishdate: "2013-09",
//     title: "Harry Potter and the Sorcerer's Stone",
//     workid: "/works/OL82563W",
//     description:
//       "Till now there's been no magic for Harry Potter. He lives with the miserable Dursleys and their abominable son, Dudley. Harry's room is a tiny closet beneath the stairs, and he hasn't had a birthday party in eleven years.But then a mysterious letter arrives by owl messenger: a letter with an invitation to an incredible place called Hogwarts School of Witchcraft and Wizardry. And there he finds not only friends, flying sports on broomsticks, and magic in everything from classes to meals, but a great destiny that's been waiting for him... if Harry can survive the encounter.",
//     publishers: "Scholastic",
//   },
// ];
// let i = 1;
// for (const book of booksCorct) {
//   const {
//     authors,
//     coverid,
//     isbn,
//     editionid,
//     publishdate,
//     title,
//     workid,
//     description,
//     publishers,
//   } = book;
//   await pool.query(
//     `UPDATE books SET authors = $1, coverid = $2, isbn = $3, editionid = $4, publishdate = $5, title = $6, workid = $7, description = $8, publishers = $9 WHERE bookid = $10`,
//     [
//       authors,
//       coverid,
//       isbn,
//       editionid,
//       publishdate,
//       title,
//       workid,
//       description,
//       publishers,
//       i,
//     ],
//   );
//   i++;
// }
