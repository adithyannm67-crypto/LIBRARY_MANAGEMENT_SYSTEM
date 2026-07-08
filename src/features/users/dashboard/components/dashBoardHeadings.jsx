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
    case "/users/home":
      headerSubTitle = `Welcome back, ${user?.name}`;
      headerTitle = "Library DashBoard";
      break;

    case "/users/borrowhistory":
      headerSubTitle = `${stats?.totalBorrows} books borrowed`;
      headerTitle = "Borrow History";
      break;

    case "/users/books":
      headerSubTitle = `Discover your next read`;
      headerTitle = "Books";
      break;
    case "/users/myborrows":
      headerSubTitle = `Check your active borrows`;
      headerTitle = "My Borrows";
      break;

    default:
      if (pathname.includes("bookdetails")) {
        headerSubTitle = "View Book informations";
        headerTitle = "Book Details";
      } else if (pathname.includes("profile")) {
        headerSubTitle = "Manage your profile";
        headerTitle = "Profile";
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
