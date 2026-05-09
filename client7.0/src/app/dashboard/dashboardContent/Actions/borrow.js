export default async function borrowBook(bookid) {
  console.log("borrowed", bookid);
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:5000/api/borrow/${bookid}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    });
    const body = await res.json();

    if (!body.success) throw new Error(body.message);
    console.log("body    :   ", body);
    return {
      success: true,
      message: "Book Borrowed Successfully",
      data: { ...body.data.borrowRecord },
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || "Book Borrow Failed",
      data: null,
    };
  }
}
