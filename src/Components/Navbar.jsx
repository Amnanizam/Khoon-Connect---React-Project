// src/Components/Navbar.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { logout } from "../slices/authSlice";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // menu items (data-driven)
  const menuItems = !isLoggedIn
    ? [
        { key: "home", label: "Home" },
        { key: "login", label: "Login" },
        { key: "register", label: "Register" },
      ]
    : [
        { key: "dashboard", label: "Dashboard" },
        { key: "findblood", label: "Find Blood" },
        { key: "requestblood", label: "Request Blood" },
        { key: "logout", label: `Logout (${role})` },
      ];

  // central onClick handler for Menu
  const onMenuClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
      return;
    }

    switch (key) {
      case "home":
        handleClick("/");
        break;
      case "login":
        handleClick("/FindBlood");
        break;
      case "register":
        handleClick("/RequestBlood");
        break;
      case "dashboard":
        handleClick("/dashboard");
        break;
      case "findblood":
        handleClick("/findblood");
        break;
      case "requestblood":
        handleClick("/requestblood");
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-red-300 via-red-400 to-red-500 rounded-lg text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <span
          className="flex items-center gap-3 text-xl font-bold text-red-600 cursor-pointer"
          onClick={() => handleClick("/")}
        >
          <img src={logo} alt="logo" className="w-20 h-15" />
        </span>

        {/* Title */}
        <h3 className="text-3xl font-dancing italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-900 via-red-900 to-red-900">
          Zinadgi Ka Rishta Khoon Ke Zariye
        </h3>

        {/* AntD v5 Menu (items prop) */}
        <Menu
          mode="horizontal"
          selectable={false}
          className="border-0 bg-transparent"
          items={menuItems}
          onClick={onMenuClick}
        />
      </div>
    </div>
  );
};

export default Navbar;
