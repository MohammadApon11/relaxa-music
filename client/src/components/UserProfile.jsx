import React from "react";
import { Sidebar } from ".";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  return (
    <div className="w-full text-white h-[100vh] ">
      <Sidebar />
      <span className="flex items-center justify-center text-5xl">
        User Profile coming soon...
      </span>
      <NavLink
        className="bg-green-500 w-[200px] px-5 py-3 flex items-center justify-center mx-auto mt-6"
        to="/"
      >
        Back to Home
      </NavLink>
    </div>
  );
};

export default UserProfile;
