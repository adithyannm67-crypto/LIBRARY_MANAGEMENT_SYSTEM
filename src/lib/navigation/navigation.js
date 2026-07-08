import {
  House,
  BookOpenCheck,
  Bell,
  Library,
  User,
  History,
  CircleHelp,
  LogOut,
} from "lucide-react";

const links = [
  { Icon: House, label: "Home", path: "/users/home" },
  { Icon: BookOpenCheck, label: "My Borrows", path: "/users/myborrows" },
  { Icon: Bell, label: "Notifications", path: "/users/notifications" },
  { Icon: Library, label: "Books", path: "/users/books" },
  { Icon: User, label: "Profile", path: "/users/profile" },
  { Icon: History, label: "Borrow History", path: "/users/borrowhistory" },
  { Icon: CircleHelp, label: "Help/Contact", path: "/users/help" },
  {
    Icon: LogOut,
    label: "Logout",
    path: "/auth",
  },
];

export default links;
