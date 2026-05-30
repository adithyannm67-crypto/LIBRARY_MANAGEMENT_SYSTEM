"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";



export const PathChangeContext = createContext();

const paths = [
  { pathname: "/users", headerTitle: "Library DashBoard", headerSubtitle: "Welcome back," },
  {
    pathname: "/users/borrowhistory", headerTitle: "Borrow History", headerSubtitle: "books borrowed"
  }, {
    pathname: "/auth", headerTitle: "", headerSubtitle: ""
  }
  , {
    pathname: "/", headerTitle: "", headerSubtitle: ""
  }
]

export function PathChangeProvider({ children }) {
  const path = usePathname();
  const { pathname, headerTitle, headerSubtitle } = paths.find(o => o.pathname === path);

  const isUsersLink = pathname.startsWith("/users")

  return (
    <PathChangeContext.Provider value={{ pathname, headerTitle, headerSubtitle, isUsersLink }}>
      {children}
    </PathChangeContext.Provider>
  );
}

export function usePathChange() {
  return useContext(PathChangeContext);
}
