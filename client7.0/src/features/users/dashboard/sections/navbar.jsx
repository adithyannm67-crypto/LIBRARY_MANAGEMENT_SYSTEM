"use client";

import style from "./section.module.css";

import { BookOpen, Menu, Bell } from "lucide-react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import logout from "#root/lib/server/auth/logout.js";

import DashBoardHeadings from "../components/dashBoardHeadings";

import { useSideBar } from "#root/context/sideBar.Context.jsx";

export default function NavBar() {
  const router = useRouter();
  const { setIsOpen } = useSideBar();

  const handleSideBar = (e) => {
    setIsOpen((prev) => !prev);
    e.stopPropagation();
  };
  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <header className={style.navBar}>
      <div className={style.headerLeft}>
        <button className="collapseBtn" onClick={handleSideBar}>
          <Menu size={30} />
        </button>
        <div className={style.headerIconBox}>
          <BookOpen className={style.headerIcon} />
        </div>
        <DashBoardHeadings />
      </div>
      <div className={style.headerRight}>
        <button className={style.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
        <Link href="/users/notifications" className={style.notificationBtn}>
          <Bell className={style.notificationIcon} />
          <span className={style.notificationDot} />
        </Link>
      </div>
    </header>
  );
}
