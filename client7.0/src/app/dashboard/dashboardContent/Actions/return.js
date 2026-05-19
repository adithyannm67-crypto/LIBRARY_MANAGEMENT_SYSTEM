
export default async function returnBook(borrowid) {
  console.log("returning", borrowid);
  const token = localStorage.getItem("token");
  if (!token) return;

  // Rreturns all book in the db
  try {
    const res = await fetch(
      `http://localhost:5000/api/returnbook/${borrowid}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const body = await res.json();
    if(!body.success) throw new Error(body.message);
    console.log("Returning    :   ", body);
    return {
        success: true,
        message: "Book Returned Successfully",
        data: null,
    }
  } catch (e) {
    return {
      success: false,
      message: err.message || "Book Returned Failed",
      data: null,
    }
  }
}