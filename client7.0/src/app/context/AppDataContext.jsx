import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import fetchBorrowedBooks from "../Actions/BorrowedBooks";

export const AppDataContext = createContext();
export function AppDataProvider({ children }) {
  const { user } = useAuth();

  if (!user) return;

  useEffect(() => {
    console.log("BOrrowRecord fetching..");
    if (!user) return;
  }, [user]);

  return (
    <AppDataContext.Provider value={{}}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
