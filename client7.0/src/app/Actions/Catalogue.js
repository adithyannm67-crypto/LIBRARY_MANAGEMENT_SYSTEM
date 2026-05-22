export default async function fetchCatalogue() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not authenticated");
    const res = await fetch(`http://localhost:5000/api/borrowCatalogue/`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "GET",
    });
    const body = await res.json();
    if (!res.ok || !body.success)
      throw new Error(body.message || "Fetching failed");
    return body.data.books;
  } catch (e) {
    return [e.message || "An error occurred while fetching catalogue"];
  }
}
