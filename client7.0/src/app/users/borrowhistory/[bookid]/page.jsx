

export default async function Page({ params }) {
  const { bookid } = await params;
//   console.log(bookid);
  return <h1>Book {bookid}</h1>;
}
