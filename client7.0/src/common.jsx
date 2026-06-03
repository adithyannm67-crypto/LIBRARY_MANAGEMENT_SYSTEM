import { usePathname } from "next/navigation";
import { useAppData } from "#root/context/AppDataContext.jsx";
import { useAuth } from "#root/context/AuthContext.jsx";

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getDashBoardHeadings() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { stats } = useAppData();
  let headerSubTitle = "";
  let headerTitle = "";
  switch (pathname) {
    case "/users":
      headerSubTitle = `Welcome back, ${user?.username}`;
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
    case "/users/profile":
      headerSubTitle = "Manage your profile";
      headerTitle = "Profile";
      break;
    default:
      const parts = pathname.split("/").filter(Boolean);

      if (parts[0] === "users" && parts[1] === "books" && !isNaN(parts[2])) {
        headerSubTitle = "View Book informations";
        headerTitle = "Book Details";
      } else {
        headerSubTitle = "";
        headerTitle = "";
      }
  }
  return { headerSubTitle, headerTitle };
}

export function getCoverUrl(coverid) {
  return coverid
    ? `https://covers.openlibrary.org/b/id/${coverid}-M.jpg`
    : null;
}