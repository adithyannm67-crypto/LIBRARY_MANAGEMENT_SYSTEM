import style from "./page.module.css";
import { Skeleton } from "#root/components/skeletons";
import { BookOpen, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header({ loading, user }) {
  const router = useRouter();
  if (loading) {
    return (
      <div className={`${style.dashboardHeader} ${style.headerInner}`}>
        <Skeleton width="95%" height="140px" />
      </div>
    );
  }
  return (
    <header className={style.dashboardHeader}>
      <div className={`${style.containerInner} ${style.headerInner}`}>
        <div className={style.headerLeft}>
          <BookOpen className={style.headerIcon} />
          <div>
            <h1>Library Dashboard</h1>
            <p className={style.headerSubtitle}>
              Welcome back, {user?.username}
            </p>
          </div>
        </div>
        <div className={style.headerRight}>
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
        </div>
      </div>
    </header>
  );
}
