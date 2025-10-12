// src/Components/NavbarDashboard.jsx
import React, { useState } from "react";
import { logout } from "../slices/authSlice";
import { Layout, Menu, Button, Drawer } from "antd";
import {
  MenuOutlined,
  DashboardOutlined,
  UserOutlined,
  HistoryOutlined,
  FileTextOutlined,
  TeamOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import { setIsLoggedIn, setUser } from "../slices/authSlice";
import { message } from "antd";

const { Header } = Layout;

const NavbarDashboard = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const role = user?.role?.toLowerCase();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🧭 Role-based menu items
  const menuItemsByRole = {
    patient: [
      { key: "dashboard", label: "Dashboard", 
        icon: <DashboardOutlined />, path: "/dashboard" },
      { key: "requestblood", label: "Request Blood", 
        icon: <FileTextOutlined />, path: "/dashboard/request-blood" },
      { key: "managerequests", label: "Manage Requests", 
        icon: <HistoryOutlined />, path: "/dashboard/manage-requests" },
      { key: "profile", label: "Profile", 
        icon: <UserOutlined />, path: "/dashboard/profile" },
    ],
    donor: [
      { key: "dashboard", label: "Dashboard", 
        icon: <DashboardOutlined />, path: "/dashboard" },
      { key: "findblood", label: "Find Blood",
         icon: <TeamOutlined />, path: "/dashboard/find-blood" },
      { key: "history", label: "My Donations", 
        icon: <HistoryOutlined />, path: "/dashboard/history" },
      { key: "profile", label: "Profile", 
        icon: <UserOutlined />, path: "/dashboard/profile" },
    ],
    bloodbank: [
      { key: "dashboard", label: "Dashboard", 
        icon: <DashboardOutlined />, path: "/dashboard" },
      { key: "managerequests", label: "Manage Requests",
         icon: <FileTextOutlined />, path: "/dashboard/manage-requests" },
      { key: "managebloodbanks", label: "Manage Blood Banks", 
        icon: <DatabaseOutlined />, path: "/dashboard/manage-bloodbanks" },
      { key: "profile", label: "Profile", 
        icon: <UserOutlined />, path: "/dashboard/profile" },
    ],
    admin: [
      { key: "dashboard", label: "Dashboard",
         icon: <DashboardOutlined />, path: "/dashboard" },
      { key: "manageusers", label: "Manage Users", 
        icon: <TeamOutlined />, path: "/dashboard/manage-users" },
      { key: "managebloodbanks", label: "Manage Blood Banks", 
        icon: <DatabaseOutlined />, path: "/dashboard/manage-bloodbanks" },
      { key: "analytics", label: "Reports & Analytics", 
        icon: <BarChartOutlined />, path: "/dashboard/analytics" },
      { key: "profile", label: "Profile", 
        icon: <UserOutlined />, path: "/dashboard/profile" },
    ],
  };

  const menuItems = menuItemsByRole[role] || [];

  // 🚪 Logout handler
 const handleLogout = () => {
  dispatch(logout()); // ✅ clears Redux + localStorage
  message.success({
    content: "Logged out successfully!",
    style: { marginTop: '10vh' }, // show near top
    duration: 2,
  });

  setTimeout(() => {
    navigate("/"); // 👈 use your real home route here
  }, 500); // small delay ensures Redux updates
};



  return (
    <Layout className="bg-white">
      <Header className="flex justify-between items-center px-4 !bg-red-500">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/dashboard")}>
          <img src={logo} alt="logo" className="w-16 h-16" />
          <h3 className="text-xl text-white font-semibold">Khoon Connect</h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white">
            {user?.name ? `Hi, ${user.name}` : "Welcome"}</span>
          <Button type="text" icon={<MenuOutlined />} onClick={() => setOpen(true)} className="text-white" />
        </div>
      </Header>

      {/* Drawer Sidebar */}
      <Drawer
        title={`${role?.toUpperCase() || "USER"} MENU`}
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Menu
          mode="inline"
          items={[
            ...menuItems.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
              onClick: () => {
                navigate(item.path);
                setOpen(false);
              },
            })),
            { type: "divider" },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: handleLogout,
            },
          ]}
        />
      </Drawer>
    </Layout>
  );
};

export default NavbarDashboard;
