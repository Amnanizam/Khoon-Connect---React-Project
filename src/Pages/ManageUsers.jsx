import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Tag,
  Card,
  Typography,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addNotification } from "../slices/notificationsSlice";

const { Title } = Typography;
const { Option } = Select;

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  // ✅ Load users from localStorage
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  // ✅ Save users to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // ✅ Add or Update user
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingUser) {
          // Update existing user
          const updated = users.map((u) =>
            u.id === editingUser.id ? { ...u, ...values } : u
          );
          setUsers(updated);
          message.success("User updated successfully!");
          dispatch(
            addNotification({
              id: Date.now(),
              message: `User ${values.name} updated by Admin.`,
              type: "info",
              read: false,
              role: "admin",
            })
          );
        } else {
          // Add new user
          const newUser = {
            id: Date.now(),
            ...values,
          };
          setUsers([...users, newUser]);
          message.success("New user added successfully!");
          dispatch(
            addNotification({
              id: Date.now(),
              message: `New user ${values.name} added by Admin.`,
              type: "success",
              read: false,
              role: "admin",
            })
          );
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditingUser(null);
      })
      .catch(() => {
        message.error("Please fill all required fields correctly!");
      });
  };

  // ✅ Delete user
  const handleDelete = (id) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    message.warning("User deleted successfully!");
    dispatch(
      addNotification({
        id: Date.now(),
        message: `A user was deleted by Admin.`,
        type: "warning",
        read: false,
        role: "admin",
      })
    );
  };

  // ✅ Open edit modal
  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "User ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag
          color={
            role === "admin"
              ? "gold"
              : role === "donor"
              ? "red"
              : role === "patient"
              ? "blue"
              : "green"
          }
        >
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-6xl shadow-lg rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <Title level={3} className="text-red-500">
            Manage Users
          </Title>
          <Button
            type="primary"
            onClick={() => setIsModalVisible(true)}
            className="bg-red-500"
          >
            Add User
          </Button>
        </div>

        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>

      {/* ➕ Add / Edit Modal */}
      <Modal
        title={editingUser ? "Edit User" : "Add New User"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingUser(null);
          form.resetFields();
        }}
        okText="Save"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select placeholder="Select role">
              <Option value="admin">Admin</Option>
              <Option value="donor">Donor</Option>
              <Option value="patient">Patient</Option>
              <Option value="bloodbank">Blood Bank</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUsers;
