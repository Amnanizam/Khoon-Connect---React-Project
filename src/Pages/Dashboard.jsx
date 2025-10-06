import React, { useState } from "react";
import { Layout, Menu, Button, Dropdown } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  HistoryOutlined,
  BellOutlined,
  TeamOutlined,
  BankOutlined,
  BarChartOutlined,
  LogoutOutlined,
  HeartOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice"; // make sure you have this action

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, user } = useSelector((state) => state.auth);

  // 🔹 Sidebar menu items based on user role
  const roleMenu = {
    admin: [
      { key: "1", label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
      { key: "2", label: "Manage Requests", icon: <FileAddOutlined />, path: "/dashboard/manage-requests" },
      { key: "3", label: "Manage Users", icon: <TeamOutlined />, path: "/dashboard/manage-users" },
      { key: "4", label: "Manage Bloodbanks", icon: <BankOutlined />, path: "/dashboard/manage-bloodbanks" },
      { key: "5", label: "Analytics", icon: <BarChartOutlined />, path: "/dashboard/analytics" },
      { key: "6", label: "Notifications", icon: <BellOutlined />, path: "/dashboard/notifications" },
    ],
    donor: [
      { key: "1", label: "Find Blood", icon: <HeartOutlined />, path: "/dashboard/find-blood" },
      { key: "2", label: "History", icon: <HistoryOutlined />, path: "/dashboard/history" },
      { key: "3", label: "Notifications", icon: <BellOutlined />, path: "/dashboard/notifications" },
      { key: "4", label: "Profile", icon: <UserOutlined />, path: "/dashboard/profile" },
    ],
    patient: [
      { key: "1", label: "Request Blood", icon: <FileAddOutlined />, path: "/dashboard/request-blood" },
      { key: "2", label: "History", icon: <HistoryOutlined />, path: "/dashboard/history" },
      { key: "3", label: "Notifications", icon: <BellOutlined />, path: "/dashboard/notifications" },
      { key: "4", label: "Profile", icon: <UserOutlined />, path: "/dashboard/profile" },
    ],
    bloodbank: [
      { key: "1", label: "Manage Requests", icon: <FileAddOutlined />, path: "/dashboard/manage-requests" },
      { key: "2", label: "Manage Bloodbanks", icon: <BankOutlined />, path: "/dashboard/manage-bloodbanks" },
      { key: "3", label: "Notifications", icon: <BellOutlined />, path: "/dashboard/notifications" },
    ],
  };

  const items = roleMenu[role] || [];

  // 🔹 Dropdown for user info (top-right)
  const userMenu = {
    items: [
      {
        key: "1",
        label: <span onClick={() => navigate("/dashboard/profile")}>Profile</span>,
      },
      {
        key: "2",
        label: (
          <span
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            Logout
          </span>
        ),
      },
    ],
  };

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-red-600"
      >
        <div className="text-white text-center text-xl font-bold py-4">
          {collapsed ? "KC" : "Khoon Connect"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="bg-red-600"
          items={items.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: (
              <span
                className="cursor-pointer"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </span>
            ),
          }))}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header className="flex justify-between items-center px-4 bg-white shadow">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">
              {user?.name || "User"} ({role})
            </span>
            <Dropdown menu={userMenu} placement="bottomRight">
              <Button shape="circle" icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>

        {/* Content */}
        <Content className="m-4 p-6 bg-white shadow rounded-lg">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
