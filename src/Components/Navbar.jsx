// src/Components/Navbar.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { logout } from "../slices/authSlice";
import logo from "../assets/logo.png";
import donate from "../assets/donate.jpg";
import giftblood from "../assets/giftblood.jpg";
import blood2 from "../assets/blood2.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

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
        handleClick("/Login");
        break;
      case "register":
        handleClick("/Register");
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
<div className="flex items-center justify-center">
            <div className="w-full max-w-full h-64 md:h-20 rounded-2xl overflow-hidden shadow-xl">
              <Swiper
                spaceBetween={16}
                slidesPerView={1}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full h-full"
              >
                <SwiperSlide>
                  <img src={donate} alt="slide-1" className="w-full h-full object-cover" />
                </SwiperSlide>
                {/* <SwiperSlide>
                  <img src={giftblood} alt="slide-2" className="w-full h-full object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={blood2} alt="slide-3" className="w-full h-full object-cover" />
                </SwiperSlide> */}
              </Swiper>
            </div>
          </div>

    // <div className="w-full bg-gradient-to-r from-red-300
    //  via-red-400 to-red-500 rounded-lg text-white">
    //   <div className="container mx-auto flex justify-between items-center p-4">
    //     {/* Logo */}
    //     <span
    //       className="flex items-center gap-3 text-xl font-bold text-red-600 cursor-pointer"
    //       onClick={() => handleClick("/")}
    //     >
    //       <img src={logo} alt="logo" className="w-20 h-15" />
    //     </span>

    //     {/* Title */}
    //     <h3 className="text-3xl font-dancing italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-900 via-red-900 to-red-900">
    //       Zinadgi Ka Rishta Khoon Ke Zariye
    //     </h3>

    //     {/* AntD v5 Menu (items prop) */}
    //     <Menu
    //       mode="horizontal"
    //       selectable={false}
    //       className="border-0 bg-transparent"
    //       items={menuItems}
    //       onClick={onMenuClick}
    //     />
    //   </div>
    // </div>
  );
};

export default Navbar;
