import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Card, Typography, Tag, message } from "antd";

const { Title } = Typography;

const History = () => {
  const { requests } = useSelector((state) => state.requests);
  const { user } = useSelector((state) => state.auth);

  const patientRequests = requests.filter(
    (req) => req.patientName === user?.name
  );

  useEffect(() => {
    if (patientRequests.length === 0) {
      message.info("No requests found in your history.");
    }
  }, [patientRequests]);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
    { title: "Hospital", dataIndex: "hospital", key: "hospital" },
    { title: "Urgency", dataIndex: "urgency", key: "urgency" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "approved") color = "green";
        if (status === "declined") color = "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-5xl shadow-lg rounded-2xl !bg-white">
        <Title level={3} className="text-center mb-4 text-red-500">
          My Requests History
        </Title>
        <Table
          columns={columns}
          dataSource={patientRequests}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default History;
