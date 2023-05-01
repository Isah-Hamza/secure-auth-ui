import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { TbHomeShield } from "react-icons/tb";
import { RiArrowRightSLine } from "react-icons/ri";

import avatar from "../../assets/avatar-new.jpg";
import { apiEndpoints } from "../../api";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const id = window.localStorage.getItem("user-id");
  if (!id) navigate("/login");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      occupation: user.occupation,
      matric: user.matric,
    },
    async onSubmit(values) {
      console.log(values);
      await axios
        .patch(apiEndpoints.USER + "/" + id, values)
        .then((res) => {
          getUserDetails();
          console.log("here", res);
          window.localStorage.setItem("user-name", res.data.data.name);
          window.localStorage.setItem("user-id", res.data.data._id);
          window.localStorage.setItem("occupation", res.data.data.occupation);
          toast.success(res.data.message, { theme: "colored" });
        })
        .catch((e) =>
          toast.error(e.response.data.message, { theme: "colored" })
        );
    },
    enableReinitialize: true,
  });

  const { getFieldProps, setFieldValue, handleSubmit } = formik;

  const getUserDetails = () => {
    setLoading(true);
    axios
      .get(apiEndpoints.USER + "/" + id)
      .then((res) => {
        setUser(res.data.user);
        console.log(res);
      })
      .catch((e) => console.log(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getUserDetails();
  }, []);

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
        <form className=" max-w-2xl mt-7" onSubmit={handleSubmit}>
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
                    // defaultValue={"TH90Q"}
                    readOnly={true}
                    {...getFieldProps("matric")}
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
                    // defaultValue={"Isah Hamza"}
                    {...getFieldProps("name")}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label>Email </label>
                  <input
                    className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                    placeholder=""
                    // defaultValue={"itshamzy@gmail.com"}
                    {...getFieldProps("email")}
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
                    // defaultValue={"09012121212"}
                    {...getFieldProps("phone")}
                  />
                </div>
                {/* {touched.phone && errors.phone && <Error text={errors.phone} />} */}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-7">
            <button
              type="submit"
              className="text-white bg-cyan-700 w-36 rounded py-2.5 text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
