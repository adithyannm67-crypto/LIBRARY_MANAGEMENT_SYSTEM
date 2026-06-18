"use client";

import style from "./navbar.module.css";

import { Bell } from "lucide-react";

import { useRouter } from "next/navigation";

const ButtonContainer = () => {
  const router = useRouter();
  return (
    <>
      <button
        id="logoutBtn"
        className={style.logoutBtn}
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.clear();
          router.replace("/auth");
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
