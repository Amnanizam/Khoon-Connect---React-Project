import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tag, Button, Card, Typography, message } from "antd";
import { updateRequestStatus } from "../redux/slices/requestsSlice";
import { addNotification } from "../slices/notificationsSlice";

const { Title } = Typography;

const History = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { requests } = useSelector((state) => state.requests);

  const role = user?.role;
  const isPatient = role === "patient";
  const isDonor = role === "donor";

  // ✅ Filter data based on role
  const patientRequests = requests.filter(
    (r) => r.patientName === user?.name
  );
  const donorRequests = requests.filter(
    (r) => r.donorName === user?.name
  );

  // ✅ Columns for patients
  const patientColumns = [
    { title: "Request ID", dataIndex: "id", key: "id" },
    { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
    { title: "Hospital", dataIndex: "hospital", key: "hospital" },
    {
      title: "Urgency",
      dataIndex: "urgency",
      key: "urgency",
      render: (urgency) => (
        <Tag color={urgency === "Urgent" ? "red" : "blue"}>{urgency}</Tag>
      ),
    },
    { title: "Date", dataIndex: "date", key: "date" },
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
              ? "green"
              : "gray"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  // ✅ Columns for donors
  const donorColumns = [
    { title: "Request ID", dataIndex: "id", key: "id" },
    { title: "Patient Name", dataIndex: "patientName", key: "patientName" },
    { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
    { title: "Hospital", dataIndex: "hospital", key: "hospital" },
    { title: "Date", dataIndex: "date", key: "date" },
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
              ? "green"
              : "gray"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
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

  // ✅ Handle donor action
  const handleMarkAsDonated = (id) => {
    dispatch(updateRequestStatus({ id, status: "donated" }));
    dispatch(
      addNotification({
        id: Date.now(),
        message: `Donation completed successfully.`,
        type: "success",
        read: false,
      })
    );
    message.success("Marked as donated!");
  };

  return (
    <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-5xl shadow-lg rounded-2xl">
        <Title level={3} className="text-center mb-4 text-red-500">
          {isPatient ? "My Blood Request History" : "My Donation History"}
        </Title>

        {isPatient && (
          <Table
            dataSource={patientRequests}
            columns={patientColumns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        )}

        {isDonor && (
          <Table
            dataSource={donorRequests}
            columns={donorColumns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        )}
      </Card>
    </div>
  );
};

export default History;
