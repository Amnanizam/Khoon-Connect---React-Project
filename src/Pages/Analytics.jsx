import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Statistic, Row, Col, Table, message, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import {
  updateAnalytics,
  resetAnalytics,
} from "../slices/analyticsSlice";

const Analytics = () => {
  const dispatch = useDispatch();
  const analytics = useSelector((state) => state.analytics);

  // For demo, just confirm data loaded
  useEffect(() => {
    if (analytics) {
      console.log("Analytics loaded:", analytics);
    }
  }, [analytics]);

  const handleReset = () => {
    dispatch(resetAnalytics());
    message.success("Analytics data reset successfully!");
  };

  const handleSimulate = () => {
    const simulatedData = {
      ...analytics,
      totalRequests: analytics.totalRequests + 3,
      fulfilledRequests: analytics.fulfilledRequests + 2,
      donorsCount: analytics.donorsCount + 1,
    };
    dispatch(updateAnalytics(simulatedData));
    message.success("Simulated analytics updated!");
  };

  // Blood group inventory data
  const bloodData = Object.entries(analytics.bloodInventory).map(
    ([group, units]) => ({
      key: group,
      group,
      units,
    })
  );

  const columns = [
    {
      title: "Blood Group",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Units Available",
      dataIndex: "units",
      key: "units",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center text-red-600 mb-6">
        Analytics Overview
      </h1>

      {/* Summary Stats */}
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-md">
            <Statistic
              title="Total Requests"
              value={analytics.totalRequests}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-md">
            <Statistic
              title="Fulfilled Requests"
              value={analytics.fulfilledRequests}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-md">
            <Statistic
              title="Total Donors"
              value={analytics.donorsCount}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-md">
            <Statistic
              title="Total Patients"
              value={analytics.patientsCount}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Blood Inventory Table */}
      <Card
        title="Current Blood Inventory"
        className="mt-8 shadow-lg rounded-xl"
        bordered={false}
      >
        <Table
          dataSource={bloodData}
          columns={columns}
          pagination={false}
          bordered
        />
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={handleSimulate}
        >
          Simulate Data Update
        </Button>
        <Button danger onClick={handleReset}>
          Reset Analytics
        </Button>
      </div>

      {/* Optional Future Chart Section */}
      <div className="mt-10 text-center text-gray-500 italic">
        (Charts and visual trends coming soon using Chart.js or Recharts 🚀)
      </div>
    </div>
  );
};

export default Analytics;
