"use client";

import styles from "./component.module.css";

import { usePathname } from "next/navigation";

import Link from "next/link";
const tabs = [
  { id: "overview", label: "Overview" },
  { id: "readinghistory", label: "Reading History" },
  { id: "achievements", label: "Achievements" },
];

const TabBar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.tabs}>
      {tabs.map((t) => (
        <Link
          href={`/users/profile/${t.id}`}
          key={t.id}
          className={`${styles.tabButton} ${
            pathname.includes(t.id) ? styles.activeTab : ""
          }`}
        >
          {t.label}

          {pathname.includes(t.id) && <span className={styles.tabIndicator} />}
        </Link>
      ))}
    </div>
  );
};

export default TabBar;
