import AuthError from "#root/classes/AuthError.js";
import {
  getAllBooksService,
  getFullBorrowsService,
  getBookByIdService,
} from "./book.service.js";

export async function getAllBooksController({ req }) {
  const limit = req.query.limit ? Number(req.query.limit) : null;

  const books = await getAllBooksService(limit);

  return {
    success: true,
    data: { books: books },
    message: "Books Fetched Successfully",
    error: null,
  };
}

export async function getFullBorrowsController({ user }) {
  const { userid } = user;
  if (!userid) throw new AuthError("User not found", 404);
  const books = await getFullBorrowsService(userid);
  return {
    success: true,
    data: { books: books },
    message: "Books Fetched Successfully",
    error: null,
  };
}

export async function getBookByIdController({ params, user }) {
  const { bookid } = params;
  const { userid } = user;

  if(!userid) throw new AuthError("User not found", 404);
  if (!bookid) throw new AuthError("Book id not found", 404);
  const book = await getBookByIdService(bookid, userid);
  return {
    success: true,
    data: { book: book },
    message: "Book Fetched Successfully",
    error: null,
  };
}
