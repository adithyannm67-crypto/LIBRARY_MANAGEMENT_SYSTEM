import "./users.css";

import NavBar from "#root/features/users/dashboard/sections/navbar.jsx";
import SideBar from "#root/features/users/dashboard/sections/sidebar.jsx";

import fetchDashBoardData from "@/lib/server/services/users.service.js";
import authenticate from "#root/lib/server/auth/authenticate.js";

import { AppDataProvider } from "#root/context/AppDataContext.jsx";
import { AuthProvider } from "#root/context/AuthContext.jsx";
import SideBarProvider from "#root/context/sideBar.Context.jsx";

export default async function UsersLayout({ children }) {
  const initialUser = await authenticate();
  const dashBoardData = await fetchDashBoardData();

  return (
    <AuthProvider initialUser={initialUser}>
      <AppDataProvider dashBoardData={dashBoardData}>
        <div className="usersLayout">
          <SideBarProvider>
            <SideBar />
            <div className="content">
              <NavBar />
              <main className="main">{children}</main>
            </div>
          </SideBarProvider>
        </div>
      </AppDataProvider>
    </AuthProvider>
  );
}
