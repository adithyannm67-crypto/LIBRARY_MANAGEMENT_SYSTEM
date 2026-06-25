import  returnBook  from "#root/lib/server/actions/returnbook.js";
export default async function returnBookW(borrowid) {
  // i should implimemt the cokki based

  try {
    const data = await returnBook(borrowid);
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
