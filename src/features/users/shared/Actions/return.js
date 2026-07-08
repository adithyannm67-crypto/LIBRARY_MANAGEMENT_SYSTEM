import { returnBookService } from "@/lib/server/services/borrow.service";
export default async function returnBook(borrowid) {
  try {
    const data = await returnBookService(borrowid);
    return {
      success: true,
      message: "Book Returned Successfully",
      data: data,
    };
  } catch (e) {
    return {
      success: false,
      message: e.message || "Book Returned Failed",
      data: null,
    };
  }
}
