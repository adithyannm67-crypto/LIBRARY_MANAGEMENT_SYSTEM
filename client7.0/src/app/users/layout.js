"use client";
import "./users.css";
import { useEffect, useState } from "react";
import NavBar from "#root/components/usersHome/_navBar/navBar.jsx";
import SideBar from "#root/components/usersHome/sideBar/sideBar.jsx";
import { useAuth } from "#root/context/AuthContext";
import { useAppData, AppDataProvider } from "#root/context/AppDataContext.jsx";
import { ArrowRight as RightArrow } from "lucide-react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function UsersLayout({ children }) {
  return (
    <AppDataProvider>
      <UsersLayoutContent>{children}</UsersLayoutContent>
    </AppDataProvider>
  );
}

function UsersLayoutContent({ children }) {
  const { user } = useAuth();
  const { loading } = useAppData();
  if (!loading) {
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth > 768) {
          document.getElementById("sideBar").classList.remove("open");

          document.getElementById("logoutBtn").classList.remove("close");
          document.getElementById("logoutBtn").classList.add("openblock");
        } else if (window.innerWidth > 370) {
          document.getElementById("logoutBtn").classList.remove("close");
          document.getElementById("logoutBtn").classList.add("openblock");
        } else {
          document.getElementById("logoutBtn").classList.remove("openblock");
          document.getElementById("logoutBtn").classList.add("close");
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  }
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="usersLayout">
      <SideBar />
      {loading ? (
        <Skeleton containerClassName="collapseBtn" />
      ) : (
        <button
          id="collapseBtn"
          className="collapseBtn"
          onClick={(e) => {
            setIsOpen(!isOpen);
            isOpen
              ? document.getElementById("sideBar").classList.remove("open")
              : document.getElementById("sideBar").classList.add("open");
          }}
        >
          <RightArrow className="btn" />
        </button>
      )}

      <div className="content">
        <NavBar />
        <main>{children}</main>
      </div>
    </div>
  );
}
