"use client";
import "./users.css";
import { useState } from "react";
import NavBar from "#root/components/usersHome/navBar/navBar.jsx";
import SideBar from "#root/components/usersHome/sideBar/sideBar.jsx";
import { AppDataProvider } from "#root/context/AppDataContext.jsx";
import { ArrowRight as RightArrow } from "lucide-react";

export default function UsersLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <AppDataProvider>
      <div className="usersLayout">
        <SideBar isOpen={isOpen} />

        <button
          id="collapseBtn"
          className="collapseBtn"
          onClick={(e) => {
            setIsOpen(!isOpen);
            e.stopPropagation();
          }}
        >
          <RightArrow className="btn" />
        </button>

        <div className="content">
          <NavBar />
          <main className="main">{children}</main>
        </div>
      </div>
    </AppDataProvider>
  );
}
