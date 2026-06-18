
export const PopUpContainer = () => {
  const { selectedBook, setSelectedBook, setBorrowedBooks } = usePage();

  return (
    selectedBook && (
      <Popup
        text="return"
        mode="return"
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => {
          setSelectedBook(null);
          document.body.style.overflow = "auto";
        }}
        setBorrowedBooks={setBorrowedBooks}
      />
    )
  );
};
