import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, message, Statistic, Tag, Typography } from "antd";
import NavbarDashboard from "../Components/NavbarDashboard";
import { updateAnalytics } from "../slices/analyticsSlice";
import { Outlet } from "react-router-dom";

const { Title } = Typography;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  const analytics = useSelector((state) => state.analytics);
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  // 🩸 On Mount
  useEffect(() => {
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
          bloodInventory: {
            "A+": 20,
            "A-": 12,
            "B+": 18,
            "B-": 8,
            "O+": 25,
            "O-": 10,
            "AB+": 7,
            "AB-": 4,
          },
        })
      );
      if (role === "admin") {
        message.info("System analytics synced successfully");
      }
    }
  }, [dispatch, user, role]);

  // 🧭 Role-Based Content
  const renderRoleContent = () => {
    switch (role?.toLowerCase()) {
      case "admin":
        return (
          <Row gutter={[16, 16]} justify="center" className="mt-6">
            <Col xs={24} sm={12} md={6}>
              <Card bordered className="shadow-md hover:shadow-lg">
                <Statistic
                  title="Total Requests"
                  value={analytics.totalRequests}
                  valueStyle={{ color: "#ef4444" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered className="shadow-md hover:shadow-lg">
                <Statistic
                  title="Fulfilled Requests"
                  value={analytics.fulfilledRequests}
                  valueStyle={{ color: "#22c55e" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered className="shadow-md hover:shadow-lg">
                <Statistic
                  title="Donors"
                  value={analytics.donorsCount}
                  valueStyle={{ color: "#3b82f6" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered className="shadow-md hover:shadow-lg">
                <Statistic
                  title="Patients"
                  value={analytics.patientsCount}
                  valueStyle={{ color: "#a855f7" }}
                />
              </Card>
            </Col>
          </Row>
        );

      case "donor":
        return (
          <Card
            title="Donor Dashboard"
            className="shadow-lg mt-8 max-w-3xl mx-auto text-center bg-white"
          >
            <p className="text-gray-600">
              ❤️ Thank you for being a lifesaver!
              <br />
              You have donated{" "}
              <b className="text-red-500">{analytics.fulfilledRequests}</b> times.
            </p>
          </Card>
        );

      case "patient":
        return (
          <Card
            title="Patient Dashboard"
            className="shadow-lg mt-8 max-w-3xl mx-auto text-center bg-white"
          >
            <p className="text-gray-600">
              Total Requests:{" "}
              <b className="text-red-500">{analytics.totalRequests}</b>
            </p>
            <p>
              Fulfilled:{" "}
              <b className="text-green-600">
                {analytics.fulfilledRequests || 0}
              </b>
            </p>
          </Card>
        );

      case "bloodbank":
        return (
          <Card
            title="Blood Bank Dashboard"
            className="shadow-lg mt-8 max-w-4xl mx-auto text-center bg-white"
          >
            <p className="text-gray-600 mb-4">
              Monitor your stock and requests efficiently.
            </p>
            <Row gutter={[16, 16]} justify="center">
              {Object.entries(analytics.bloodInventory || {}).map(
                ([group, units]) => (
                  <Col xs={12} sm={8} md={6} key={group}>
                    <Card size="small" className="shadow text-center">
                      <Tag color="red">{group}</Tag>
                      <p className="font-bold">{units} units</p>
                    </Card>
                  </Col>
                )
              )}
            </Row>
          </Card>
        );

      default:
        return (
          <Card className="text-center mt-8 max-w-lg mx-auto bg-white shadow-md">
            <p>No role data available. Please log in again.</p>
          </Card>
        );
    }
  };

  // 🔔 Notifications
  const renderNotifications = () => (
    <Card
      title="Recent Notifications"
      className="mt-10 max-w-3xl mx-auto shadow-md bg-white"
    >
      {notifications.length > 0 ? (
        notifications.slice(0, 5).map((note) => (
          <div
            key={note.id}
            className="border-b border-gray-200 py-2 flex justify-between items-center"
          >
            <span className="text-gray-700">{note.message}</span>
            <Tag
              color={
                note.type === "success"
                  ? "green"
                  : note.type === "warning"
                  ? "orange"
                  : "blue"
              }
            >
              {note.type?.toUpperCase()}
            </Tag>
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
      <NavbarDashboard />
      <div className="container mx-auto px-4 py-8">
        <Title
          level={3}
          className="text-center text-red-600 font-semibold mb-6"
        >
          {role?.toUpperCase()} DASHBOARD
        </Title>
        {renderRoleContent()}
        {renderNotifications()}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
