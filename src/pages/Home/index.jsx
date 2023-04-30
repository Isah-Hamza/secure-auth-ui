import React from "react";
import Layout from "../../Layout";
import { TbHomeShield } from "react-icons/tb";
import { RiArrowRightSLine } from "react-icons/ri";

const Home = () => {
  return (
    <Layout>
      <div className="p-5">
        <div className="flex items-center gap-1 opacity-70 mb-5">
          <TbHomeShield />
          <span>  <RiArrowRightSLine size={17} /> </span>
          <span className="underline cursor-pointer">home</span>
        </div>
        <p className="font-medium text-3xl">Secure Authentication System</p>
        <p>You're successfully logged in</p>
      </div>
    </Layout>
  );
};

export default Home;
