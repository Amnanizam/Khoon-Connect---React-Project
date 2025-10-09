// src/pages/Home.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography } from "antd";
import Navbar from "../Components/Navbar";

// available images
import donate from "../assets/donate.jpg";
import giftblood2 from "../assets/giftblood2.jpg";
import blood2 from "../assets/blood2.jpg";
import logo from "../assets/logo.png"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const { Title, Paragraph } = Typography;

const Home = () => {
  // safe destructure in case state.auth is undefined
  const { isLoggedIn = false, role = "" } = useSelector((state) => state.auth || {});
  const navigate = useNavigate();

  // Try to load a custom logo. If it doesn't exist, fallback to donate.jpg.
  // NOTE: `require` works in CRA / webpack setups. If you use Vite, see notes below.
  let logoSrc = donate;
  try {
    const maybe = require("../assets/logo.png");
    logoSrc = maybe?.default || maybe;
  } catch (e) {
    // fallback stays as donate
    logoSrc = donate;
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Navbar (hide auth buttons on home) */}
      <div className="absolute top-0 left-0 w-full z-40">
        <Navbar hideAuthButtons={true} />
      </div>

      {/* Main 3-column centered content */}
      <div className="relative z-30 flex items-center justify-center h-screen px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center w-full max-w-7xl">
          
          {/* LEFT: enlarged Khoon Connect image */}
          <div className="flex items-center justify-center mt-30">
            <img
              src={logo}
              alt="Khoon Connect"
              className="w-56 md:w-80 lg:w-96 object-contain shadow-lg rounded-md"
            />
          </div>

          
          <div className="flex items-center justify-center">
            <div className="mt-70 w-full max-w-md h-64 md:h-96 
            rounded-2xl overflow-hidden shadow-xl">
               
               <Card className="w-full max-w-md text-center shadow-lg rounded-2xl
                !bg-red-200 bg-opacity-90">
              <Title level={2} className="text-gray-900">Welcome to Khoon Connect</Title>
              <Paragraph className="text-gray-800">
                Our mission is to connect <b>donors</b> and <b>patients</b> who are
                in urgent need of blood. Together, we can save lives.
              </Paragraph>

              {!isLoggedIn ? (
                <div className="flex justify-center gap-4 mt-6">
                  <Button type="primary" size="large" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button type="default" size="large" onClick={() => navigate("/register")}>
                    Register
                  </Button>
                </div>
              ) : (
                <div className="mt-6">
                  <Paragraph>You are logged in as <b>{role}</b>.</Paragraph>
                  <Button type="primary" size="large" onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                  </Button>
                </div>
              )}
            </Card>
                
              
                
                
                  
                
            </div>
          </div>

          {/* RIGHT: Welcome + mission + Login/Register */}
          <div className="flex items-center justify-center">
            <img src={giftblood2} alt="slide-2" className="w-65 h-88 mt-30" />
            {/* <Card className="w-full max-w-md text-center shadow-lg rounded-2xl !bg-red-200 bg-opacity-90">
              <Title level={2} className="text-gray-900">Welcome to Khoon Connect</Title>
              <Paragraph className="text-gray-800">
                Our mission is to connect <b>donors</b> and <b>patients</b> who are
                in urgent need of blood. Together, we can save lives.
              </Paragraph>

              {!isLoggedIn ? (
                <div className="flex justify-center gap-4 mt-6">
                  <Button type="primary" size="large" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button type="default" size="large" onClick={() => navigate("/register")}>
                    Register
                  </Button>
                </div>
              ) : (
                <div className="mt-6">
                  <Paragraph>You are logged in as <b>{role}</b>.</Paragraph>
                  <Button type="primary" size="large" onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                  </Button>
                </div>
              )}
            </Card> */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
