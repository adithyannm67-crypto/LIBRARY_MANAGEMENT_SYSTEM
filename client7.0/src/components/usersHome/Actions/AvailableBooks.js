export async function fetchAvailableBooks({ limit } = {}) {
  // Rreturns all book in the db

  const url = limit ? `?limit=${limit}` : "";
  const res = await fetch(`http://localhost:5000/api/allbooks/${url}`, {
    method: "GET",
  });

  const body = await res.json();
  
  if (!res.ok || !body.success) {
    throw new Error("fetching Failed");
  }
  return body.data.books;
}

export async function fetchBookById(bookid) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not authenticated");
    const res = await fetch(`http://localhost:5000/api/book/${bookid}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json();
    if (!res.ok || !body.success) throw new Error("fetching Failed");
    return body.data.book;
  } catch (e) {
    return [e.message || "An error occurred while fetching book"];
  }
}
