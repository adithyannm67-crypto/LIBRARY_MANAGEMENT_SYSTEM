import { NextResponse } from "next/server";

import AuthError from "#root/lib/server/classes/AuthError.js";

import authenticate from "#root/lib/server/middleware/authenticate.js";
import getBookById from "#root/lib/server/actions/getBookById.js";

export async function GET(request) {
  const user = await authenticate();
  const userid = user?.userid;
  if (!userid) throw new AuthError("User not authenticated", 401);

  const { searchParams } = new URL(request.url);
  const bookid = searchParams.get("bookid");
  if (!bookid) throw new AuthError("Book id not found", 404);

  const book = await getBookById(bookid, userid);

  return NextResponse.json({
    success: true,
    data: {
      book: book,
    },
    message: "Book Fetched Successfully",
    error: null,
  });
}
