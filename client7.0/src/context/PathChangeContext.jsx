"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";

export const PathChangeContext = createContext();

export function PathChangeProvider({ children }) {
  const pathname = usePathname();
  const isUsersLink = pathname.startsWith("/users");

  return (
    <PathChangeContext.Provider value={{ pathname, isUsersLink }}>
      {children}
    </PathChangeContext.Provider>
  );
}

export function usePathChange() {
  return useContext(PathChangeContext);
}
