import React from "react";
import { Layout, Menu, Typography } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import {
  UserOutlined,
  DashboardOutlined,
  HistoryOutlined,
  NotificationOutlined,
  TeamOutlined,
  BankOutlined,
  FundOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import NavbarDashboard from "../Components/NavbarDashboard";

const { Sider, Content } = Layout;
const { Title } = Typography;

// Role → menu mapping
const roleMenus = {
  admin: [
    { key: "dashboard", 
      label: "Dashboard", path: "/Dashboard", icon: <DashboardOutlined /> },
    { key: "manageRequests", 
      label: "Manage Requests", path: "/ManageRequests", icon: <FormOutlined /> },
    { key: "manageUsers", 
      label: "Manage Users", path: "/ManageUsers", icon: <TeamOutlined /> },
    { key: "manageBloodbanks", 
      label: "Manage Bloodbanks", path: "ManageBloodBanks", icon: <BankOutlined /> },
    { key: "analytics", 
      label: "Analytics", path: "/Analytics", icon: <FundOutlined /> },
    { key: "notifications", 
      label: "Notifications", path: "/Notifications", icon: <NotificationOutlined /> },
  ],
  patient: [
    { key: "dashboard", 
      label: "Dashboard", path: "/Dashboard", icon: <DashboardOutlined /> },
    { key: "requestBlood", 
      label: "Request Blood", path: "/RequestBlood", icon: <FormOutlined /> },
    { key: "history", 
      label: "History", path: "/History", icon: <HistoryOutlined /> },
    { key: "notifications", 
      label: "Notifications", path: "/Notifications", icon: <NotificationOutlined /> },
    { key: "profile", 
      label: "Profile", path: "/Profile", icon: <UserOutlined /> },
  ],
  donor: [
    { key: "dashboard", 
      label: "Dashboard", path: "/Dashboard", icon: <DashboardOutlined /> },
    { key: "findBlood", 
      label: "Find Blood", path: "/FindBlood", icon: <SearchOutlined /> },
    { key: "history", 
      label: "History", path: "/History", icon: <HistoryOutlined /> },
    { key: "notifications", 
      label: "Notifications", path: "/Notifications", icon: <NotificationOutlined /> },
    { key: "profile", 
      label: "Profile", path: "/Profile", icon: <UserOutlined /> },
  ],
  bloodbank: [
    { key: "dashboard", 
      label: "Dashboard", path: "/Dashboard", icon: <DashboardOutlined /> },
    { key: "manageRequests", 
      label: "Manage Requests", path: "/ManageRequests", icon: <FormOutlined /> },
    { key: "manageBloodbanks", 
      label: "Manage Bloodbanks", path: "/ManageBloodBanks", icon: <BankOutlined /> },
    { key: "notifications", 
      label: "Notifications", path: "/Notifications", icon: <NotificationOutlined /> },
  ],
};

const Dashboard = () => {
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const menus = roleMenus[role] || [];

  const handleClick = ({ key }) => {
    const menu = menus.find((m) => m.key === key);
    if (menu) navigate(menu.path);
  };

  return (
    <Layout className="min-h-screen">
      {/* Navbar at top */}
      <Layout>
        <NavbarDashboard />
      </Layout>

      {/* Sidebar + Content */}
      <Layout>
        <Sider width={220} className="bg-white shadow-md">
          <div className="p-4">
            <Title level={4} className="text-center text-red-500">
              {role?.toUpperCase()} PANEL
            </Title>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            style={{ height: "100%" }}
            items={menus.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
            }))}
            onClick={handleClick}
          />
        </Sider>

        <Layout className="p-4 bg-gray-50">
          <Content className="bg-white rounded-lg shadow p-6">
            {/* This is where pages load */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
