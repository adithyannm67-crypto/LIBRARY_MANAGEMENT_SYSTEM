"use client";

import { createContext, useState, useContext } from "react";

export const SideBarContext = createContext();

export default function SideBarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SideBarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SideBarContext.Provider>
  );
}

export const useSideBar = () => useContext(SideBarContext);
