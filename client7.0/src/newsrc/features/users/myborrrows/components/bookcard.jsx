
export const BookCardWrapper = ({ book }) => {
  const { setSelectedBook } = usePage();
  return <BookCard book={book} clickHandler={() => setSelectedBook(book)} />;
};
