import React from "react";
import { Logo } from "../assets/img";
import { NavLink } from "react-router-dom";
import { MdOutlineHome } from "react-icons/md";
import { CgAlbum } from "react-icons/cg";
import { FaArtstation } from "react-icons/fa";

const StaticSideBar = () => {
  return (
    <div>
      <NavLink className="" to={"/"}>
        <img src={Logo} className="w-40 mx-auto mt-2" alt="" />
      </NavLink>
      <div className="w-full h-[1px] bg-white mt-[23px]"></div>
      <ul className="flex flex-col mt-4 px-2">
        <NavLink
          to="/"
          className="text-white hover:bg-[#25a56a] py-4 md:pl-6 pl-2 transition-all duration-300 "
        >
          <li className="font-semibold flex items-center gap-3 text-xl">
            <MdOutlineHome /> Home
          </li>
        </NavLink>
        <NavLink
          to="/dashboard/albums"
          className="text-white hover:bg-[#25a56a] py-4 pl-6 transition-all duration-300 "
        >
          <li className="font-semibold flex items-center gap-3 text-xl">
            <CgAlbum /> Albums
          </li>
        </NavLink>
        <NavLink
          to="/dashboard/artist"
          className="text-white hover:bg-[#25a56a] py-4 pl-6 transition-all duration-300 "
        >
          <li className="font-semibold flex items-center gap-3 text-xl">
            <FaArtstation /> Artists
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default StaticSideBar;
