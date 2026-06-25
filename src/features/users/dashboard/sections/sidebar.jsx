"use client";

import styles from "./section.module.css";

import LinkComponent from "../components/sidebarLink";

import links from "@/lib/navigation/navigation.js";

import { useSideBar } from "#root/context/sideBar.Context.jsx";

export default function SideBar() {
  const { isOpen } = useSideBar();

  return (
    <div className={styles.sideBar + " " + (isOpen ? styles.open : "")}>
      {links.map((item, index) => {
        return <LinkComponent key={index} item={item} />;
      })}
    </div>
  );
}
