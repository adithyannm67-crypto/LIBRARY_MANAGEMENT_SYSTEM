import "./users.css";

import NavBar from "#root/features/users/dashboard/components/navBar/navBar.jsx";
import SideBar from "#root/features/users/dashboard/components/sideBar/sideBar.jsx";

import fetchDashBoardData from "#root/lib/server/fetchDashBoardData.js";

import { AppDataProvider } from "#root/context/AppDataContext.jsx";

import CollapseBtn from "#root/app/users/collapseBtn.jsx";

export default async function UsersLayout({ children }) {
  const dashBoardData = await fetchDashBoardData();
  return (
    <AppDataProvider dashBoardData={dashBoardData}>
      <div className="usersLayout">
        <SideBar />

        <CollapseBtn />
        <div className="content">
          <NavBar />
          <main className="main">{children}</main>
        </div>
      </div>
    </AppDataProvider>
  );
}
