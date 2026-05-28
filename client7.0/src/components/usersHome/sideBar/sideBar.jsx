import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathChange } from "#root/context/PathChangeContext.jsx";
import { useAppData } from "#root/context/AppDataContext.jsx";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const links = [
  "",
  "myborrows",
  "notifications",
  "books",
  "borrowrequests",
  "profile",
  "borrowhistory",
  "help",
];
import styles from "./somthing.module.css";
export default function SideBar() {
  const { loading } = useAppData();
  const router = useRouter();

  return (
    <div id="sideBar" className={styles.sideBar}>
      {links.map((path, index) => {
        return <LinkComponent key={index} path={path} loading={loading} />;
      })}
      {loading ? (
        <Skeleton containerClassName={styles.logoutBtn} width={70} />
      ) : (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.clear();
            router.replace("/auth");
          }}
          className={styles.logoutBtn}
        >
          Logout
        </button>
      )}
    </div>
  );
}

const LinkComponent = ({ path, index, loading }) => {
  const { pathname } = usePathChange();
  return loading ? (
    <Skeleton containerClassName={styles.link} width={70} />
  ) : (
    <Link
      key={index}
      href={"/users/" + path}
      className={
        styles.link + " " + (pathname === "/users/" + path ? styles.active : "")
      }
    >
      {path === "" ? "Home" : path}
    </Link>
  );
};
