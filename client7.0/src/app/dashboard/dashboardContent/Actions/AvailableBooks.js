export default async function fetchAvailableBooks() {
  // Rreturns all book in the db
  try {
    const res = await fetch("http://localhost:5000/api/allbooks/", {
      method: "GET",
    });

    const body = await res.json();
    if (!body) throw new Error("fetching Failed");
    return body.data.books;
  } catch (e) {
    console.error(e);
    return [];
  }
}
