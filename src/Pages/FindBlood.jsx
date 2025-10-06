import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Card, Typography, message, Tag } from "antd";
import { updateRequestStatus } from "../redux/slices/requestsSlice";
import { addNotification } from "../slices/notificationsSlice";

const { Title } = Typography;

const FindBlood = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { requests } = useSelector((state) => state.requests);

  // Check the role from Redux (only donors can see this page)
  const role = user?.role;

  if (role !== "donor") {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600 font-semibold">
        ❌ Access Denied – Only donors can view and manage blood requests.
      </div>
    );
  }

  // Filter only pending requests
  const pendingRequests = requests.filter((req) => req.status === "pending");

  // Function to accept a blood request
  const handleAccept = (record) => {
    dispatch(updateRequestStatus({ id: record.id, status: "accepted" }));
    dispatch(
      addNotification({
        id: Date.now(),
        message: `You accepted a blood request for ${record.bloodGroup}.`,
        type: "success",
        read: false,
      })
    );
    message.success(`Request for ${record.bloodGroup} accepted successfully!`);
  };

  // Define table columns
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      key: "bloodGroup",
      render: (text) => <Tag color="red">{text}</Tag>,
    },
    {
      title: "Hospital / Location",
      dataIndex: "hospital",
      key: "hospital",
    },
    {
      title: "Urgency",
      dataIndex: "urgency",
      key: "urgency",
      render: (text) => (
        <Tag color={text === "Urgent" ? "volcano" : "geekblue"}>{text}</Tag>
      ),
    },
    {
      title: "Required Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          className="bg-red-500"
          onClick={() => handleAccept(record)}
        >
          Accept
        </Button>
      ),
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-5xl shadow-lg rounded-2xl !bg-white p-6">
        <Title
          level={3}
          className="text-center mb-6 text-red-500 font-semibold uppercase"
        >
          Find Blood Requests
        </Title>
        {pendingRequests.length > 0 ? (
          <Table
            dataSource={pendingRequests}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        ) : (
          <div className="text-center text-gray-600 mt-10">
            No pending blood requests available at the moment.
          </div>
        )}
      </Card>
    </div>
  );
};

export default FindBlood;
