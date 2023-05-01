import React, { useState } from "react";
import Layout from "../../Layout";
import { TbHomeShield } from "react-icons/tb";
import { RiArrowRightSLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Error from "../../components/Error";
import * as Yup from "yup";
import { apiEndpoints } from "../../api";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("password");

  const handleChangeType = () => {
    if (type === "text") setType("password");
    else setType("text");
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    phone: Yup.string().required(),
    occupation: Yup.string().required(),
    password: Yup.string().required(),
    c_password: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      occupation: "",
      phone: "",
      password: "",
      c_password: "",
    },
    validationSchema,
    async onSubmit(values) {
      console.log(values);
      await axios
        .post(apiEndpoints.REGISTER, values)
        .then((res) => {
          navigate("/login", { state: { matric: res.data.user.matric } });
          toast.success(
            `${res.data.message}. Your unique ID. is ${res.data.user.matric}`,
            { theme: "colored", autoClose: false, closeOnClick: false }
          );
        })
        .catch((e) =>
          toast.error(e.response.data.message, { theme: "colored" })
        );
    },
  });

  const { values, touched, errors, getFieldProps, setFieldValue, handleSubmit } = formik;

  return (
    <Layout>
      <div className="p-5 px-7">
        <div className="flex items-center gap-1 opacity-70 mb-5">
          <TbHomeShield />
          <span>
            {" "}
            <RiArrowRightSLine size={17} />{" "}
          </span>
          <span className="underline cursor-pointer">register</span>
        </div>
        <p className="font-medium text-3xl">Create Free Account</p>
        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 underline cursor-pointer text-sm"
          >
            Login here
          </span>{" "}
        </p>
        <form onSubmit={handleSubmit} className=" max-w-2xl mt-7 ">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div>
                <label>Fullname </label>
                <input
                  className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                  placeholder=""
                  {...getFieldProps("name")}
                />
              </div>
              {touched.name && errors.name && <Error text={errors.name} />}
            </div>
            <div>
              <div>
                <label>Email </label>
                <input
                  className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                  placeholder=""
                  {...getFieldProps("email")}
                />
              </div>
              {touched.email && errors.email && <Error text={errors.email} />}
            </div>
            <div>
              <div>
                <label>Phone </label>
                <input
                  className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                  placeholder=""
                  {...getFieldProps("phone")}
                />
              </div>
              {touched.phone && errors.phone && <Error text={errors.phone} />}
            </div>
            <div>
              <div>
                <label>Occupation </label>
                <input
                  className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                  placeholder=""
                  {...getFieldProps("occupation")}
                />
              </div>
              {touched.occupation && errors.occupation && <Error text={errors.occupation} />}
            </div>
            <div>
              <div>
                <label>Password </label>
                <div className="relative">
                  <input
                    className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                    type={type}
                    {...getFieldProps("password")}
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
              {touched.password && errors.password && (
                  <Error text={errors.password} />
                )}
            </div>
            <div>
              <div>
                <label>Confirm Password </label>
                <div className="relative">
                  <input
                    className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                    type={type}
                    {...getFieldProps("c_password")}
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
              {touched.c_password && errors.c_password && (
                  <Error text={errors.c_password} />
                )}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-5">
            <button type="submit" className="text-white bg-cyan-700 w-36 rounded py-2.5 text-sm">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
