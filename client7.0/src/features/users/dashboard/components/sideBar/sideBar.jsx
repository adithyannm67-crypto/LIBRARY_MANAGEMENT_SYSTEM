"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSideBar } from "#root/context/sideBar.Context.jsx";
import logout from "#root/lib/server/logout.js";

import {
  House,
  BookOpenCheck,
  Bell,
  Library,
  User,
  History,
  CircleHelp,
  LogOut,
} from "lucide-react";

const links = [
  { Icon: House, label: "Home", path: "/users" },
  { Icon: BookOpenCheck, label: "My Borrows", path: "/users/myborrows" },
  { Icon: Bell, label: "Notifications", path: "/users/notifications" },
  { Icon: Library, label: "Books", path: "/users/books" },
  { Icon: User, label: "Profile", path: "/users/profile" },
  { Icon: History, label: "Borrow History", path: "/users/borrowhistory" },
  { Icon: CircleHelp, label: "Help/Contact", path: "/users/help" },
  {
    Icon: LogOut,
    label: "Logout",
    path: "/auth",
  },
];
import styles from "./sidebar.module.css";
export default function SideBar() {
  const { isOpen } = useSideBar();
  return (
    <div
      id="sideBar"
      className={styles.sideBar + " " + (isOpen ? styles.open : "")}
    >
      {links.map((item, index) => {
        return <LinkComponent key={index} item={item} />;
      })}
    </div>
  );
}

const LinkComponent = ({ item }) => {
  const pathname = usePathname();
  const { Icon, path, label } = item;
  const active = pathname === path;
  const isLogout = label === "Logout";
  return (
    <Link
      href={path}
      className={styles.link}
      onClick={() => {
        if (isLogout) {
          logout();
          router.push("/auth");
        }
      }}
    >
      <div className={styles.iconWrapper + " " + (active ? styles.active : "")}>
        <Icon />
      </div>
      {label}
    </Link>
  );
};
