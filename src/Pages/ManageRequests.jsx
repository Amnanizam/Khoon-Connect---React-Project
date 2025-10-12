// src/pages/ManageRequests.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Tag,
  Button,
  Card,
  Typography,
  message,
  Popconfirm,
  Select,
} from "antd";
import {
  updateRequestStatusWithAnalytics,
  removeRequest,
} from "../slices/requestSlice";
import { addNotification } from "../slices/notificationSlice";

const { Title } = Typography;
const { Option } = Select;

const ManageRequests = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { requests } = useSelector((state) => state.requests);

  const role = user?.role?.toLowerCase();

  // ✅ Filter requests based on role
  const visibleRequests =
    role === "admin"
      ? requests
      : role === "patient"
      ? requests.filter((r) => r.patientName === user?.name)
      : requests.filter(
          (r) => r.assignedTo === user?.name || r.status === "pending"
        );

  // ✅ Handle status change (analytics auto-update)
  const handleStatusChange = (id, newStatus) => {
    dispatch(updateRequestStatusWithAnalytics({ id, status: newStatus }));

    dispatch(
      addNotification({
        id: Date.now(),
        message: `Request #${id} marked as ${newStatus}`,
        type: "info",
        read: false,
      })
    );

    message.success(`Request marked as ${newStatus}!`);
  };

  // ✅ Handle delete (admin only)
  const handleDelete = (id) => {
    dispatch(removeRequest(id));
    dispatch(
      addNotification({
        id: Date.now(),
        message: `Request #${id} has been removed from records.`,
        type: "warning",
        read: false,
      })
    );
    message.warning("Request deleted successfully.");
  };

  const columns = [
    {
      title: "Request ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      key: "bloodGroup",
      render: (bg) => <Tag color="red">{bg}</Tag>,
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
      render: (urgency) => (
        <Tag color={urgency === "Urgent" ? "volcano" : "blue"}>{urgency}</Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Accepted", value: "accepted" },
        { text: "Donated", value: "donated" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag
          color={
            status === "pending"
              ? "orange"
              : status === "accepted"
              ? "blue"
              : "green"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        // 🩸 Patients: View only
        if (role === "patient") {
          return <i className="text-gray-400">View Only</i>;
        }

        // 🏥 Blood Banks / Admin: Update status
        return (
          <div className="flex gap-2">
            <Select
              defaultValue={record.status}
              onChange={(val) => handleStatusChange(record.id, val)}
              style={{ width: 130 }}
            >
              <Option value="pending">Pending</Option>
              <Option value="accepted">Accepted</Option>
              <Option value="donated">Donated</Option>
            </Select>

            {/* 👨‍💼 Delete option for admin only */}
            {role === "admin" && (
              <Popconfirm
                title="Delete this request?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-6xl shadow-lg rounded-2xl">
        <Title level={3} className="text-center mb-4 text-red-500">
          {role === "admin"
            ? "Manage All Blood Requests"
            : role === "patient"
            ? "Your Blood Requests"
            : "Blood Requests Overview"}
        </Title>

        <Table
          columns={columns}
          dataSource={visibleRequests}
          rowKey="id"
          pagination={{ pageSize: 6 }}
        />
      </Card>
    </div>
  );
};

export default ManageRequests;
