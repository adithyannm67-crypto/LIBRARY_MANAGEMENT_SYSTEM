
import { cookies } from "next/headers";

export async function fetchBookById(bookid) {
  
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;

  if (!token) throw new Error("User not authenticated");
  const res = await fetch(`http://localhost:5000/api/book/${bookid}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await res.json();
  if (!res.ok || !body.success) throw new Error("fetching Failed");
  return body.data.book;
}


export  async function fetchBorrowedBooks() {

  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  if (!token) throw new Error("User not authenticated");
  const res = await fetch(`http://localhost:5000/api/borrowCatalogue/`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "GET",
  });
  const body = await res.json();
  
  if (!res.ok || !body.success)
    throw new Error(body.message || "Fetching failed");
  return body.data.books;
}

export  async function fetchActiveBorrows() {

  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  if (!token) throw new Error("User not authenticated");
  const res = await fetch(`http://localhost:5000/api/activeBorrows/`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "GET",
  });
  const body = await res.json();
  
  if (!res.ok || !body.success)
    throw new Error(body.message || "Fetching failed");
  return body.data.books;
}



