import "./users.css";

import NavBar from "#root/features/users/dashboard/components/navBar/navBar.jsx";
import SideBar from "#root/features/users/dashboard/components/sideBar/sideBar.jsx";

import fetchDashBoardData from "#root/lib/server/fetchDashBoardData.js";
import authenticate from "#root/lib/server/authenticate.js";

import { AppDataProvider } from "#root/context/AppDataContext.jsx";
import { AuthProvider } from "#root/context/AuthContext.jsx";
import SideBarProvider from "#root/context/sideBar.Context.jsx";

import CollapseBtn from "#root/app/users/collapseBtn.jsx";

export default async function UsersLayout({ children }) {
  const initialUser = await authenticate();
  const dashBoardData = await fetchDashBoardData();

  return (
    <AuthProvider initialUser={initialUser}>
      <AppDataProvider dashBoardData={dashBoardData}>
        <div className="usersLayout">
          <SideBarProvider>
            <SideBar />
            {/* <CollapseBtn /> */}

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
