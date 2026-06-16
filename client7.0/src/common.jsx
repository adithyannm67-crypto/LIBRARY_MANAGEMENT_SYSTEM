import { usePathname } from "next/navigation";
import { useAppData } from "#root/context/AppDataContext.jsx";
import { useAuth } from "#root/context/AuthContext.jsx";
export function getAuthorString(authors) {
  const values = Object.values(authors ?? {}).filter(Boolean);

  return values.length ? values.join(" and ") : "Unknown Author";
}

export function formatDate(date) {
  if (!date) return "";

  //YYYY
  if (/^\d{4}$/.test(date)) return date;

  //YYYY-MM
  if (/^\d{4}-\d{2}$/.test(date)) {
    const [year, month] = date.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
    });
  }

  //YYYY-MM-DD
  const d = new Date(date);
  if (isNaN(d)) return date;
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateandTime(date) {
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function getDashBoardHeadings() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { stats } = useAppData();
  switch (pathname) {
    case "/users":
      return {
        headerSubTitl: `Welcome back, ${user?.username}`,
        headerTitle: "Library DashBoard",
      };

    case "/users/borrowhistory":
      return {
        headerSubTitle: `${stats?.totalBorrows} books borrowed`,
        headerTitle: "Borrow History",
      };
    case "/users/books":
      return {
        headerSubTitle: `Discover your next read`,
        headerTitle: "Books",
      };

    case "/users/myborrows":
      return {
        headerSubTitle: `Check your active borrows`,
        headerTitle: "My Borrows",
      };

    case "/users/profile":
      return {
        headerSubTitle: "Manage your profile",
        headerTitle: "Profile",
      };

    default:
      const pathSegments = pathname.split("/").filter(Boolean);

      if (pathSegments.includes("bookdetails")) {
        return {
          headerSubTitle: "View Book informations",
          headerTitle: "Book Details",
        };
      } else {
        return {
          headerSubTitle: "",
          headerTitle: "",
        };
      }
  }
}

export function getCoverUrl(coverid) {
  return coverid
    ? `https://covers.openlibrary.org/b/id/${coverid}-M.jpg`
    : null;
}
