import borrowBook from "#root/lib/server/borrowbook.js";

export default async function borrowBookW(bookid) {
  try {
    const data = await borrowBook(bookid);
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
