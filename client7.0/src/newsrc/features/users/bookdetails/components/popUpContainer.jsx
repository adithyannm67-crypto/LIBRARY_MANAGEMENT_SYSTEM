import Popup from "./Popup";
//need to import pop up correctly
import { useBookDetails } from "../providers/usePage";

export const PopupContainer = ({ option, from }) => {
  const { selectedBook, setSelectedBook } = useBookDetails();
  return (
    selectedBook && (
      <Popup
        from={from}
        mode={option.includes("Borrow") ? "borrow" : "return"}
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
