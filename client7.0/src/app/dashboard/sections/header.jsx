import style from "./page.module.css";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { BookOpen, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header({ loading, user }) {
  const router = useRouter();

  return (
    <header className={style.dashboardHeader}>
      <div className={style.headerLeft}>
        <div className={style.headerIconBox}>
          {loading ? (
            <Skeleton style={{ position: "absolute", inset: 0 }} />
          ) : (
            <BookOpen className={style.headerIcon} />
          )}
        </div>
        <div className={style.headerContent} >
          <h3>
            {loading ? (
              <Skeleton style={{ width: "80%" }} />
            ) : (
              "Library Dashboard"
            )}
          </h3>
          <p className={style.headerSubtitle} style={{ width: "80%" }}>
            {loading ? <Skeleton /> : `Welcome back, ${user?.username}`}
          </p>
        </div>
      </div>
      <div className={style.headerRight}>
        {loading ? (
          <>
            <Skeleton width={60} height={30} />
            <Skeleton
              circle
              containerClassName={style.notificationIcon}
              style={{ width: "100%", height: "100%" }}
            />
          </>
        ) : (
          <>
            <button
              className={style.logoutBtn}
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.clear();
                router.replace("/auth");
              }}
            >
              Logout
            </button>
            <button className={style.notificationBtn}>
              <Bell className={style.notificationIcon} />
              <span className={style.notificationDot} />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
