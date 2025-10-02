import React from "react";
import { Layout } from "antd";
import NavbarDashboard from "../Components/NavbarDashboard";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const Dashboard = () => {
  return (
    <Layout className="min-h-screen">
      {/* Top Navbar + Sidebar Drawer */}
      <NavbarDashboard />

      {/* Page Content */}
      <Layout style={{ marginTop: "64px" }}> {/* pushes below header */}
        <Content className="p-6 bg-gray-100 min-h-[calc(100vh-64px)]">
          <Outlet /> {/* This will render the clicked page */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
