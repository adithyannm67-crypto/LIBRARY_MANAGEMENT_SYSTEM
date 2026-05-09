import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import fetchBorrowedBooks from "../dashboard/dashboardContent/Actions/BorrowedBooks";

export const AppDataContext = createContext();
export function AppDataProvider({ children }) {
  const { user } = useAuth();

  if (!user) return;

  useEffect(() => {
    console.log("BOrrowRecord fetching..");
    if (!user) return;
    async function fetchBorrowedData() {
        let cached=JSON.parse(localStorage.getItem("borrowedBooks"));
        if(cached){
          return
        }
      let data = await fetchBorrowedBooks();
      data = data.filter((book) => !book.returndate);
      localStorage.setItem("borrowedBooks", JSON.stringify(data));
    }
    fetchBorrowedData();
  }, [user]);

  return (
    <AppDataContext.Provider value={{}}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
