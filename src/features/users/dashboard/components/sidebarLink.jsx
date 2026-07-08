import styles from "./component.module.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

import logout from "#root/lib/server/auth/logout.js";

const LinkComponent = ({ item }) => {
  const pathname = usePathname();
  const { Icon, path, label } = item;
  const active = pathname.includes(path);
  const isLogout = label === "Logout";
  return (
    <Link
      href={path}
      className={styles.link + " " + (active ? styles.active : "")}
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

export default LinkComponent;
