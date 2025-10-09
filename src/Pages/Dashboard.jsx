import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, message, Statistic } from "antd";
import NavbarDashboard from "../Components/NavbarDashboard";
import { updateAnalytics } from "../slices/analyticsSlice";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  const analytics = useSelector((state) => state.analytics);
  const notifications = useSelector((state) => state.notifications.notifications);

  useEffect(() => {
    // Welcome notification on dashboard load
    if (user?.name) {
      message.success(`Welcome back, ${user.name}!`, 2);
    }

    // Auto sync analytics if empty
    if (!analytics.totalRequests) {
      dispatch(
        updateAnalytics({
          ...analytics,
          totalRequests: 10,
          fulfilledRequests: 6,
          donorsCount: 15,
          patientsCount: 9,
        })
      );
    }
  }, [dispatch, user]);

  // 🩸 Role-based content
  const renderRoleContent = () => {
    switch (role) {
      case "admin":
        return (
          <Row gutter={[16, 16]} justify="center" className="mt-6">
            <Col xs={24} sm={12} md={6}>
              <Card bordered className="shadow-md">
                <Statistic
                  title="Total Requests"
                  value={analytics.totalRequests}
                  valueStyle={{ color: "#cf1322" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered className="shadow-md">
                <Statistic
                  title="Fulfilled Requests"
                  value={analytics.fulfilledRequests}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered className="shadow-md">
                <Statistic
                  title="Total Donors"
                  value={analytics.donorsCount}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered className="shadow-md">
                <Statistic
                  title="Total Patients"
                  value={analytics.patientsCount}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
          </Row>
        );

      case "donor":
        return (
          <Card
            title="Donor Dashboard"
            className="shadow-lg mt-8 max-w-3xl mx-auto text-center !bg-white"
          >
            <p className="text-gray-600">
              Thank you for being a lifesaver ❤️ <br />
              You have donated <b>{analytics.fulfilledRequests}</b> times.
            </p>
          </Card>
        );

      case "patient":
        return (
          <Card
            title="Patient Dashboard"
            className="shadow-lg mt-8 max-w-3xl mx-auto text-center !bg-white"
          >
            <p className="text-gray-600">
              Your recent requests: <b>{analytics.totalRequests}</b>
            </p>
            <p>
              Fulfilled so far:{" "}
              <b className="text-green-600">{analytics.fulfilledRequests}</b>
            </p>
          </Card>
        );

      case "bloodbank":
        return (
          <Card
            title="Blood Bank Dashboard"
            className="shadow-lg mt-8 max-w-4xl mx-auto text-center !bg-white"
          >
            <p className="text-gray-600 mb-2">
              Monitor your inventory and fulfill pending requests efficiently.
            </p>
            <Row gutter={[16, 16]} justify="center">
              {Object.entries(analytics.bloodInventory).map(([group, units]) => (
                <Col xs={12} sm={8} md={6} key={group}>
                  <Card size="small" className="text-center shadow">
                    <p className="font-bold text-lg text-red-600">{group}</p>
                    <p>{units} units</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        );
        

      default:
        return (
          <Card className="text-center mt-8 max-w-lg mx-auto !bg-white shadow-md">
            <p>No role data available. Please log in again.</p>
          </Card>
        );
    }
  };

  // 🔔 Recent Notifications section
  const renderNotifications = () => (
    <Card
      title="Recent Notifications"
      className="mt-10 max-w-3xl mx-auto shadow-md !bg-white"
    >
      {notifications.length > 0 ? (
        notifications.slice(0, 5).map((note) => (
          <div
            key={note.id}
            className="border-b border-gray-200 py-2 text-gray-700"
          >
            • {note.message}
          </div>
        ))
      ) : (
        <p className="text-gray-400 italic text-center">
          No new notifications.
        </p>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar at top */}
      <NavbarDashboard />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-6">
          Dashboard
        </h1>
        {renderRoleContent()}
        {renderNotifications()}
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
