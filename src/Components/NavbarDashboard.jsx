import React, { useState } from "react";
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
import { logout } from "../slices/authSlice";
import logo from "../assets/logo.png";

const { Header } = Layout;

const NavbarDashboard = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const role = user?.role?.toLowerCase() || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Role-based pages
  const menuItemsByRole = {
    patient: [
      { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
      { key: "requestblood", label: "Request Blood", icon: <FileTextOutlined />, path: "/dashboard/request-blood" },
      { key: "managerequests", label: "Manage Requests", icon: <HistoryOutlined />, path: "/dashboard/manage-requests" },
      { key: "profile", label: "Profile", icon: <UserOutlined />, path: "/dashboard/profile" },
      { key: "logout", label: "Logout", icon: <LogoutOutlined /> },
    ],

    donor: [
      { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
      { key: "findblood", label: "Find Requests", icon: <TeamOutlined />, path: "/dashboard/find-blood" },
      { key: "history", label: "My Donations", icon: <HistoryOutlined />, path: "/dashboard/history" },
      { key: "profile", label: "Profile", icon: <UserOutlined />, path: "/dashboard/profile" },
      { key: "logout", label: "Logout", icon: <LogoutOutlined /> },
    ],

    bloodbank: [
      { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
      { key: "managerequests", label: "Manage Requests", icon: <FileTextOutlined />, path: "/dashboard/manage-requests" },
      { key: "managebloodbanks", label: "Manage Blood Banks", icon: <DatabaseOutlined />, path: "/dashboard/manage-bloodbanks" },
      { key: "notifications", label: "Notifications", icon: <HistoryOutlined />, path: "/dashboard/notifications" },
      { key: "logout", label: "Logout", icon: <LogoutOutlined /> },
    ],

    admin: [
      { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
      { key: "manageusers", label: "Manage Users", icon: <TeamOutlined />, path: "/dashboard/manage-users" },
      { key: "managebloodbanks", label: "Manage Blood Banks", icon: <DatabaseOutlined />, path: "/dashboard/manage-bloodbanks" },
      { key: "analytics", label: "Reports & Analytics", icon: <BarChartOutlined />, path: "/dashboard/analytics" },
      { key: "notifications", label: "Notifications", icon: <HistoryOutlined />, path: "/dashboard/notifications" },
      { key: "logout", label: "Logout", icon: <LogoutOutlined /> },
    ],
  };

  const menuItems = menuItemsByRole[role] || [];

  return (
    <Layout className="bg-white">
      {/* 🔺 Top Navbar */}
      <Header className="flex justify-between items-center px-4 !bg-red-300">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-20 h-15" />
          <h3 className="text-3xl font-dancing italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-900 via-red-900 to-red-900">
            Zinadgi Ka Rishta Khoon Ke Zariye
          </h3>
        </div>

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

      {/* 🔹 Sidebar Drawer */}
      <Drawer
        title={`${role?.toUpperCase() || "USER"} MENU`}
        placement="right"
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
              if (item.key === "logout") {
                dispatch(logout());
                navigate("/login");
              } else if (item.path) {
                navigate(item.path);
              }
              setOpen(false);
            },
          }))}
        />
      </Drawer>
    </Layout>
  );
};

export default NavbarDashboard;
