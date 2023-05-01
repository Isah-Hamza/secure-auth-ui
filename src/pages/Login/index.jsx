import React, { useState } from "react";
import Layout from "../../Layout";
import { TbHomeShield } from "react-icons/tb";
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { apiEndpoints } from "../../api";

const Login = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("password");
  const [mode, setMode] = useState("1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeType = () => {
    if (type === "text") setType("password");
    else setType("text");
  };

  const generateCode = async () => {
    setLoading(true);
    const payload = {
      email,
      mode: mode == 1 ? "otp" : "qr_code",
    };

    await axios
      .post(apiEndpoints.LOGIN_MODE, payload)
      .then((res) => {
        toast.success(res.data.message, { theme: "colored" });
      })
      .catch((e) => toast.error(e.response.data.message, { theme: "colored" }))
      .finally(() => setLoading(false));
  };

  const handleLogin = async () => {
    const payload = {
      email,
      mode: mode == 1 ? "otp" : "qr_code",
      password,
    };

    await axios
      .post(apiEndpoints.LOGIN, payload)
      .then((res) => {
        window.localStorage.setItem("user-name", res.data.user.name);
        window.localStorage.setItem("user-id", res.data.user._id);
        window.localStorage.setItem("occupation", res.data.user.occupation);
        navigate("/");
        toast.success(res.data.message, { theme: "colored" });
      })
      .catch((e) => toast.error(e.response.data.message, { theme: "colored" }));
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
            </div>
            <div>
              <label>{mode == "1" ? "OTP" : "QR Code"} </label>
              <div className="relative">
                <input
                  className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                  type={type}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              onClick={handleLogin}
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
