// src/pages/Home.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography } from "antd";
import Navbar from "../Components/Navbar";
import donate from "../assets/donate.jpg";
import giftblood from '../assets/giftblood.jpg'
import blood2 from '../assets/blood2.jpg'


import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const { Title, Paragraph } = Typography;

const Home = () => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen">
      {/* Navbar always on top */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Background slider */}
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        className="absolute top-10 left-0 w-full h-100 z-0"
      >
        <SwiperSlide>
          <img
            src={donate}
            alt="Slide 1"
            className="w-full h-100 object-cover filter "
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={giftblood}
            alt="Slide 2"
            className="w-full h-100 object-cover filter"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={blood2}
            alt="Slide 3"
            className="w-full h-100 object-cover filter"
          />
        </SwiperSlide>
      </Swiper>

      {/* Foreground content */}
      <div 
      className="relative z-20 flex flex-col items-center justify-center 
      h-0 text-white">
        
        <Card 
        className="main-h-scrneen max-w-2xl w-full text-center shadow-lg rounded-2xl
         !bg-red-400 bg-opacity-80 z-20">
          <Title level={2}>Welcome to Khoon Connect</Title>
          <Paragraph>
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
              <Paragraph>
                You are logged in as <b>{role}</b>.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Home;
