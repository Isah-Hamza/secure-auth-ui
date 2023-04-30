import React, { useState } from "react";
import Layout from "../../Layout";
import { TbHomeShield } from "react-icons/tb";
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("password");
  const [mode, setMode] = useState("1");
  const [email, setEmail] = useState("");

  const handleChangeType = () => {
    if (type === "text") setType("password");
    else setType("text");
  };

  const generateCode = () => {
    toast.success(`${mode == "1" ? "OTP" : "QR Code"} sent successfully`, {
      theme: "colored",
    });
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
          <span className="underline cursor-pointer">login</span>
        </div>
        <p className="font-medium text-3xl">Login</p>
        <p>
          New to the platform?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 underline cursor-pointer text-sm"
          >
            Create New Acccunt
          </span>{" "}
        </p>
        <form className=" max-w-2xl mt-7 ">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div>
                <label>Email </label>
                <input
                  className="active:bg-white !bg-white w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* {touched.email && errors.email && <Error text={errors.email} />} */}
            </div>
            <div>
              <div>
                <label>Auth Mode </label>
                <div className="relative w-full">
                  <select
                    onChange={(e) => setMode(e.target.value)}
                    className="appearance-none w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                    placeholder=""
                    // {...getFieldProps("name")}
                  >
                    <option value="1">OTP</option>
                    <option value="2">QR Code</option>
                  </select>
                  <span className="absolute top-1/2 -translate-y-1/2 right-3">
                    <RiArrowDownSLine />
                  </span>
                </div>
              </div>
              {/* {touched.name && errors.name && <Error text={errors.name} />} */}
            </div>
            <div>
              <label>{mode == "1" ? "OTP" : "QR Code"} </label>
              <div className="relative">
                <input
                  className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                  type={type}
                  // {...getFieldProps("password")}
                />
                <span className="absolute top-1/2 -translate-y-1/2 right-2">
                  {type === "password" ? (
                    <FiEyeOff onClick={handleChangeType} />
                  ) : (
                    <FiEye onClick={handleChangeType} />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end  gap-2 mt-10">
            <button
              type="button"
              disabled={!email}
              className="disabled:bg-opacity-50 text-white bg-green-700 w-24 rounded py-2.5 text-sm"
            >
              Login
            </button>
            <button
              onClick={generateCode}
              type="button"
              disabled={!email}
              className="disabled:bg-opacity-50 text-white bg-cyan-700 w-40 rounded py-2.5 text-sm"
            >
              {mode == "1" ? "Generate OTP" : "Generate QR Code"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
