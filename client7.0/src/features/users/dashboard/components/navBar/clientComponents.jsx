"use client";

import { Bell } from "lucide-react";
import style from "./navbar.module.css";
import { useRouter } from "next/navigation";
import logout from "#root/lib/server/logout.js";

const ButtonContainer = () => {
  const router = useRouter();
  return (
    <>
      <button
        id="logoutBtn"
        className={style.logoutBtn}
        onClick={() => {
          logout();
          router.push("/auth");
        }}
      >
        Logout
      </button>
      <button
        className={style.notificationBtn}
        onClick={() => {
          router.push("/users/notifications");
        }}
      >
        <Bell className={style.notificationIcon} />
        <span className={style.notificationDot} />
      </button>
    </>
  );
};

export default ButtonContainer;
