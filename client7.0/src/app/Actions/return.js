
export default async function returnBook(borrowid) {
  
  

  
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not authenticated");
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
    if(!res.ok || !body.success) throw new Error(body.message||"Book Return Failed");
    console.log("Returning    :   ", body);
    return {
        success: true,
        message: "Book Returned Successfully",
        data: body.data ,
    }
  } catch (e) {
    return {
      success: false,
      message: e.message || "Book Returned Failed",
      data: null,
    }
  }
}