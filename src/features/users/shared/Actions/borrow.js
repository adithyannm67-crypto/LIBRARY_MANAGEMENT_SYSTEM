import { borrowBookService } from "@/lib/server/services/borrow.service.js";

export default async function borrowBook(bookid) {
  try {
    const data = await borrowBookService(bookid);
    return {
      success: true,
      message: "Book Borrowed Successfully",
      data: data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || "Book Borrow Failed",
      data: null,
    };
  }
}
