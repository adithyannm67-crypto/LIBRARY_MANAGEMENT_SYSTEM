
export const PopupContainer = () => {
  const { selectedBook, setSelectedBook, setBorrowedBooks } = usePage();

  const closePopup = () => {
    setSelectedBook(null);
    document.body.style.overflow = "auto";
  };

  return (
    selectedBook && (
      <Popup
      from="borrowhistory"
        text="return"
        mode="return"
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={closePopup}
        setBorrowedBooks={setBorrowedBooks}
      />
    )
  );
};