import { createContext, useContext, useState, useEffect } from "react";
import fetchBorrowedBooks from "../Actions/BorrowedBooks";
import { useAuth } from "./AuthContext";

const BorrowContext = createContext();
export function BorrowProvider({ children }) {
  const { user } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    console.log("BOrrowRecord fetching..")

    const cached=JSON.parse(localStorage.getItem("borrowedBooks"));
    if(cached){
      setBorrowedBooks(cached);
    }


    if (!user) return;
    async function fetchBorrowedData() {
      
      let data = await fetchBorrowedBooks();
      data = data.filter((book) => !book.returned_at);
      localStorage.setItem("borrowedBooks", JSON.stringify(data));
      setBorrowedBooks(data);
    }
    fetchBorrowedData();
    
  }, [user]);
  
  function addBorrowedBook(book) {
    setBorrowedBooks((prev) => {
      const updated = [...prev, book];
      localStorage.setItem("borrowedBooks", JSON.stringify(updated));
      return updated;
    });
  }

  function removeBorrowedBook(bookId) {
    const updated = borrowedBooks.filter((book) => book.bookid !== bookId);
    setBorrowedBooks(updated);
    localStorage.setItem("borrowedBooks", JSON.stringify(updated));
  }

  return (
    <BorrowContext.Provider
      value={{
      
        borrowedBooks,
        setBorrowedBooks,
        addBorrowedBook,
        removeBorrowedBook,
      }}
    >
      {children}
    </BorrowContext.Provider>
  );
}

export function useBorrow() {
  return useContext(BorrowContext);
}
