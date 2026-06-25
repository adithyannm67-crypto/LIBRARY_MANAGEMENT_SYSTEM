import style from "./component.module.css";

import { usePathname } from "next/navigation";
import { useAuth } from "#root/context/AuthContext.jsx";
import { useAppData } from "#root/context/AppDataContext.jsx";

const DashBoardHeadings = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const { stats } = useAppData();
  let headerSubTitle = "";
  let headerTitle = "";
  switch (pathname) {
    case "/users":
      headerSubTitle = `Welcome back, ${user?.username}`;
      headerTitle = "Library DashBoard";

    case "/users/borrowhistory":
      headerSubTitle = `${stats?.totalBorrows} books borrowed`;
      headerTitle = "Borrow History";

    case "/users/books":
      headerSubTitle = `Discover your next read`;
      headerTitle = "Books";

    case "/users/myborrows":
      headerSubTitle = `Check your active borrows`;
      headerTitle = "My Borrows";

    case "/users/profile":
      headerSubTitle = "Manage your profile";
      headerTitle = "Profile";

    default:
      if (pathname.includes("bookdetails")) {
        headerSubTitle = "View Book informations";
        headerTitle = "Book Details";
      }
  }

  return (
    <div className={style.headerContent}>
      <h3>{headerTitle}</h3>
      <p className={style.headerSubtitle}>{headerSubTitle}</p>
    </div>
  );
};

export default DashBoardHeadings;
