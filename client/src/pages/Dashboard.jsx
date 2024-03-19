import React from "react";
import { IoHome } from "react-icons/io5";
import { NavLink, Route, Routes } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import {
  Sidebar,
  DashboardAlbums,
  DashboardHome,
  DashboardUser,
  DashboardSongs,
  DashboardArtists,
  DashboardNewSong,
} from "../components";
import { useStateValue } from "../Context/StateProvider";
import StaticSideBar from "./StaticSideBar";
const Dashboard = () => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="min-h-[100vh] grid grid-cols-12">
      <div className="col-span-2 border-r border-white">
        <StaticSideBar />
      </div>
      <div className="col-span-10 w-full flex flex-col items-center justify-center bg-primary">
        <Sidebar />

        <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
          {/* prettier-ignore */}
          <NavLink to={"/dashboard/home"}><IoHome className="text-2xl text-textColor" /></NavLink>
          {/* prettier-ignore */}
          {user?.user?.role === "admin" && (
            <NavLink
              to={"/dashboard/user"}
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
            >
              {" "}
              Users{" "}
            </NavLink>
          )}

          {/* prettier-ignore */}
          <NavLink to={"/dashboard/songs"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Songs </NavLink>

          {/* prettier-ignore */}
          <NavLink to={"/dashboard/artist"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Artist </NavLink>

          {/* prettier-ignore */}
          <NavLink to={"/dashboard/albums"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Albums </NavLink>
        </div>

        <div className="my-4 w-full p-4">
          <Routes>
            <Route path="/home" element={<DashboardHome />} />
            <Route path="/user" element={<DashboardUser />} />
            <Route path="/songs" element={<DashboardSongs />} />
            <Route path="/artist" element={<DashboardArtists />} />
            <Route path="/albums" element={<DashboardAlbums />} />
            <Route path="/newSong" element={<DashboardNewSong />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
