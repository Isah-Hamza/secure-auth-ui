import React, { useState } from "react";
import Layout from "../../Layout";
import { TbHomeShield } from "react-icons/tb";
import { RiArrowRightSLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import avatar from "../../assets/avatar-new.jpg";

const Profile = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("password");

  const handleChangeType = () => {
    if (type === "text") setType("password");
    else setType("text");
  };

  return (
    <Layout>
      <div className="p-5 px-7">
        <div className="flex items-center gap-1 opacity-70 mb-5">
          <TbHomeShield />
          <span>
            {" "}
            <RiArrowRightSLine size={17} />{" "}
          </span>
          <span className="underline cursor-pointer">profile</span>
        </div>
        {/* <p className="font-medium text-2xl">User Profile</p> */}
        <form className=" max-w-2xl mt-7 ">
          <div>
            <div className="w-[150px] h-[150px]">
              <img src={avatar} className="w-full h-full rounded-md" />
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5">
              <div>
                <div>
                  <label>Unique ID </label>
                  <input
                    className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                    placeholder=""
                    defaultValue={"TH90Q"}
                    readOnly={true}
                    // {...getFieldProps("occupation")}
                  />
                </div>
                {/* {touched.occupation && errors.occupation && <Error text={errors.occupation} />} */}
              </div>
              <div>
                <div>
                  <label>Name </label>
                  <input
                    className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                    placeholder=""
                    defaultValue={"Isah Hamza"}
                    // {...getFieldProps("name")}
                  />
                </div>
                {/* {touched.name && errors.name && <Error text={errors.name} />} */}
              </div>
              <div>
                <div>
                  <label>Email </label>
                  <input
                    className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                    placeholder=""
                    defaultValue={"itshamzy@gmail.com"}
                    // {...getFieldProps("email")}
                  />
                </div>
                {/* {touched.email && errors.email && <Error text={errors.email} />} */}
              </div>
              <div>
                <div>
                  <label>Phone </label>
                  <input
                    className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                    placeholder=""
                    defaultValue={"09012121212"}
                    // {...getFieldProps("phone")}
                  />
                </div>
                {/* {touched.phone && errors.phone && <Error text={errors.phone} />} */}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-7">
            <button className="text-white bg-cyan-700 w-36 rounded py-2.5 text-sm">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
