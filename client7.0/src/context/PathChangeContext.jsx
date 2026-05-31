"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";



export const PathChangeContext = createContext();

export function PathChangeProvider({ children }) {
  const pathname = usePathname();

  return (
    <PathChangeContext.Provider value={{ pathname }}>
      {children}
    </PathChangeContext.Provider>
  );
}

export function usePathChange() {
  return useContext(PathChangeContext);
}
