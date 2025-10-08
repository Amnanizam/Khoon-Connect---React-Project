// src/pages/History.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tag, Button, Card, Typography, message } from "antd";
import { updateRequestStatus } from "../slices/requestSlice";
import { addNotification } from "../slices/notificationSlice";
import NavbarDashboard from "../Components/NavbarDashboard";

const { Title } = Typography;

const History = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { requests } = useSelector((state) => state.requests);

  const role = user?.role;
  const isPatient = role === "patient";
  const isDonor = role === "donor";
  const isAdmin = role === "admin";
  const isBloodBank = role === "bloodbank";

  // ✅ Filter data by role
  const filteredRequests =
    isPatient
      ? requests.filter((r) => r.patientName === user?.name)
      : isDonor
      ? requests.filter((r) => r.donorName === user?.name)
      : requests; // Admin & BloodBank can view all

  // ✅ Common columns
  const baseColumns = [
    { title: "Request ID", dataIndex: "id", key: "id" },
    { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
    { title: "Hospital", dataIndex: "hospital", key: "hospital" },
    {
      title: "Urgency",
      dataIndex: "urgency",
      key: "urgency",
      render: (urgency) =>
        urgency ? (
          <Tag color={urgency === "Urgent" ? "red" : "blue"}>{urgency}</Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "pending"
              ? "orange"
              : status === "accepted"
              ? "blue"
              : status === "donated"
              ? "green"
              : "gray"
          }
        >
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  // ✅ Add donor action column
  const donorColumns = [
    ...baseColumns,
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "pending" ? (
          <Button
            type="primary"
            onClick={() => handleMarkAsDonated(record.id)}
            className="bg-green-500"
          >
            Mark as Donated
          </Button>
        ) : (
          <Tag color="green">Completed</Tag>
        ),
    },
  ];

  // ✅ Add admin/bloodbank control columns
  const adminColumns = [
    ...baseColumns,
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Donor Name",
      dataIndex: "donorName",
      key: "donorName",
      render: (name) => name || <Tag color="default">Unassigned</Tag>,
    },
  ];

  // ✅ Handle donor marking
  const handleMarkAsDonated = (id) => {
    dispatch(updateRequestStatus({ id, status: "donated" }));
    dispatch(
      addNotification({
        id: Date.now(),
        message: `Donation completed successfully!`,
        type: "success",
        role: "donor",
        read: false,
      })
    );

    message.success("Marked as donated!");
  };

  // ✅ Columns per role
  const columns = isDonor
    ? donorColumns
    : isAdmin || isBloodBank
    ? adminColumns
    : baseColumns;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarDashboard />
      <div className="p-6 flex justify-center items-start">
        <Card className="w-full max-w-6xl shadow-lg rounded-2xl">
          <Title level={3} className="text-center mb-6 text-red-600">
            {isPatient
              ? "My Blood Request History"
              : isDonor
              ? "My Donation History"
              : isAdmin
              ? "All Requests Overview"
              : "Blood Bank Request Log"}
          </Title>

          <Table
            dataSource={filteredRequests}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 6 }}
            bordered
          />
        </Card>
      </div>
    </div>
  );
};

export default History;
