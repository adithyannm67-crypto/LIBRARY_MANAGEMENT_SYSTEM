export default async function borrowBook(bookid) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not authenticated");
    const res = await fetch(`http://localhost:5000/api/borrow/${bookid}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    });
    const body = await res.json();

    if (!res.ok || !body.success) throw new Error(body.message||"Borrowing failed");
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
