"use client";

import { usePathname } from "next/navigation";

import { useAppData } from "#root/providers/AppDataContext.jsx";
import { useAuth } from "#root/providers/AuthContext.jsx";

export default function getDashBoardHeadings() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { stats } = useAppData();
  switch (pathname) {
    case "/users":
      return {
        headerSubTitle: `Welcome back, ${user?.username}`,
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
