// src/Components/NavbarDashboard.jsx
import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Typography } from "antd";
import {
  MenuOutlined,
  DashboardOutlined,
  UserOutlined,
  HistoryOutlined,
  FileTextOutlined,
  TeamOutlined,
  DatabaseOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

const NavbarDashboard = () => {
  const [open, setOpen] = useState(false);
  const { role, user } = useSelector((state) => state.auth); // assuming role is stored in Redux
  const navigate = useNavigate();

  // Pages according to role
  const menuItemsByRole = {
    patient: [
      { key: "dashboard", label: "Dashboard", 
        icon: <DashboardOutlined />, path: "/Dashboard" },
      { key: "requestblood", label: "Request Blood", 
        icon: <FileTextOutlined />, path: "/RequestBlood" },
      { key: "myrequests", label: "My Requests", 
        icon: <HistoryOutlined />, path: "/ManageRequests" },
      { key: "profile", label: "Profile", 
        icon: <UserOutlined />, path: "/Profile" },
    ],
    donor: [
      { key: "dashboard", label: "Dashboard", 
        icon: <DashboardOutlined />, path: "/Dashboard" },
      { key: "findblood", label: "Find Requests", 
        icon: <TeamOutlined />, path: "/FindBlood" },
      { key: "history", label: "My Donations", icon: <HistoryOutlined />, path: "/history" },
      { key: "profile", label: "Profile", icon: <UserOutlined />, path: "/profile" },
    ],
    bloodbank: [
      { key: "dashboard", label: "Dashboard", 
        icon: <DashboardOutlined />, path: "/Dashboard" },
      { key: "inventory", label: "Manage Inventory", 
        icon: <DatabaseOutlined />, path: "/Manageinventory" },
      { key: "requests", label: "Incoming Requests", 
        icon: <FileTextOutlined />, path: "/ManageRequests" },
      { key: "donations", label: "Donation Records", 
        icon: <HistoryOutlined />, path: "/History" },
      { key: "profile", label: "Profile", icon: <UserOutlined />, path: "/profile" },
    ],
    admin: [
      { key: "dashboard", label: "Dashboard", 
        icon: <DashboardOutlined />, path: "/dashboard" },
      { key: "users", label: "Manage Users", 
        icon: <TeamOutlined />, path: "/manageusers" },
      { key: "banks", label: "Manage Blood Banks", 
        icon: <DatabaseOutlined />, path: "/managebloodbanks" },
      { key: "analytics", label: "Reports & Analytics", 
        icon: <BarChartOutlined />, path: "/Analytics" },
      { key: "profile", label: "Profile", 
        icon: <UserOutlined />, path: "/Profile" },
    ],
  };

  const menuItems = menuItemsByRole[role?.toLowerCase()] || [];

  return (
    <Layout className="bg-white">
      {/* Top Navbar */}
      <Header className="flex justify-between items-center px-4 bg-red-500">
        <Title level={3} className="!text-white m-0">
          Khoon Connect
        </Title>
        <div className="flex items-center gap-4">
          <span className="text-white">
            {user?.name ? `Hello, ${user.name}` : "Welcome"}
          </span>
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
          />
        </div>
      </Header>

      {/* Sidebar Drawer */}
      <Drawer
        title={`${role?.toUpperCase()} Menu`}
        placement="left"
        closable
        onClose={() => setOpen(false)}
        open={open}
      >
        <Menu
          mode="inline"
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => {
              navigate(item.path);
              setOpen(false);
            },
          }))}
        />
      </Drawer>
    </Layout>
  );
};

export default NavbarDashboard;
