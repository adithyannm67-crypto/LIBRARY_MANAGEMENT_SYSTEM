
export const PopupContainer = () => {
  const { selectedBook, setSelectedBook } = usePage();
  return (
    selectedBook && (
      <Popup
        text="borrow"
        mode="borrow"
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => {
          setSelectedBook(null);
          document.body.style.overflow = "auto";
        }}
      />
    )
  );
};