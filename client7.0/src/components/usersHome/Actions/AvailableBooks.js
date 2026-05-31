export default async function fetchAvailableBooks({ limit }={}) {
  // Rreturns all book in the db

  const url = limit ? `?limit=${limit}` : "";
  try {
    const res = await fetch(`http://localhost:5000/api/allbooks/${url}`, {
      method: "GET",
    });

    const body = await res.json();
    if (!res.ok || !body.success) throw new Error("fetching Failed");
    return body.data.books;
  } catch (e) {
    return [e.message || "An error occurred while fetching available books"];
  }
}
