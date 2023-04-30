import "./App.css";
import Home from "./pages/Home";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";

function App() {
  const routes = [
    {
      title: "",
      component: Home,
      path: "/",
    },
    {
      title: "login",
      component: Login,
      path: "/login",
    },
    {
      title: "register",
      component: Register,
      path: "/register",
    },
    {
      title: "profile",
      component: Profile,
      path: "/profile",
    },
  ];

  return (
    <>
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={<route.component />} />
        ))}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
