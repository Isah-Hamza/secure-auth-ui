import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar-new.jpg";
import { TbHomeShield } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { MdLockPerson, MdLogout, MdMedicalInformation } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation().pathname.split("/");

  const [activeTab, setActiveTab] = useState("");

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    const length = location.length;
    setActiveTab(location[length - 1]);
  }, [location]);

  const navigations = [
    {
      title: "Home",
      name: "",
      url: "/",
      icon: TbHomeShield,
    },
    {
      title: "Login",
      name: "login",
      url: "/login",
      icon: MdLockPerson,
    },
    {
      title: "Register",
      name: "register",
      url: "/register",
      icon: MdMedicalInformation,
    },
    {
      title: "Profile",
      name: "profile",
      url: "/profile",
      icon: CgProfile,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="w-full flex h-screen">
      <div className="w-[300px] bg-[#0F172A] h-full text-white">
        <div className="mt-10">
          <div className="mx-auto w-24 h-24 rounded-full overflow-hidden ">
            <img className="w-full" src={avatar} alt="avatar" />
          </div>
          <div className="text-center flex flex-col mt-2">
            <span className="text-lg font-medium">Isah Hamza </span>
            <span className="-mt-2 opacity-60">student</span>
          </div>
          <div className="mt-10">
            <ul className="flex flex-col">
              {navigations.map((nav, idx) => (
                <li
                  onClick={() => navigate(nav.url)}
                  key={idx}
                  className={` ${
                    activeTab == nav.name &&
                    "bg-black/40 hover:!bg-black/40 font-semibold !opacity-100"
                  } flex gap-2 text-sm items-center px-6 pl-10 py-2.5 cursor-pointer hover:bg-black/25 opacity-70`}
                >
                  <span>
                    {" "}
                    <nav.icon size={17} />{" "}
                  </span>
                  <span>{nav.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-blue-50 ">
        <div className="h-14 w-full shadow flex justify-between items-center px-5">
          <div className="text-sm font-medium">SECURE AUTH</div>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleLogout}
              className="text-white bg-[coral] bg-opacity-90 w-32 rounded py-2 text-sm flex justify-center items-center gap-1"
            >
              <MdLogout size={18} />
              Logout
            </button>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
