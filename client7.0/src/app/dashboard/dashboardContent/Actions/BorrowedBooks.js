export default async function fetchBorrowedBooks() {

  const token= localStorage.getItem("token");
  try {
    const res =await fetch(`http://localhost:5000/api/borrowCatalogue/`, {
      headers:{"Authorization": `Bearer ${token}`},
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
