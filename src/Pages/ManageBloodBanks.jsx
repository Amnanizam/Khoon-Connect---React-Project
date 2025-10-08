import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Tag,
  Card,
  Typography,
  Popconfirm,
  message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addNotification } from "../slices/notificationSlice";

const { Title } = Typography;

const ManageBloodBanks = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [bloodBanks, setBloodBanks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBank, setEditingBank] = useState(null);
  const [form] = Form.useForm();

  // ✅ Load from localStorage
  useEffect(() => {
    const savedBanks = JSON.parse(localStorage.getItem("bloodBanks")) || [];
    setBloodBanks(savedBanks);
  }, []);

  // ✅ Save to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem("bloodBanks", JSON.stringify(bloodBanks));
  }, [bloodBanks]);

  // ✅ Add or update blood bank
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingBank) {
          const updated = bloodBanks.map((b) =>
            b.id === editingBank.id ? { ...b, ...values } : b
          );
          setBloodBanks(updated);
          message.success("Blood bank updated successfully!");
          dispatch(
            addNotification({
              id: Date.now(),
              message: `Blood bank ${values.name} updated by Admin.`,
              type: "info",
              read: false,
              role: "bloodbank",
            })
          );
        } else {
          const newBank = {
            id: Date.now(),
            ...values,
            status: "active",
          };
          setBloodBanks([...bloodBanks, newBank]);
          message.success("New blood bank added successfully!");
          dispatch(
            addNotification({
              id: Date.now(),
              message: `New blood bank ${values.name} added.`,
              type: "success",
              read: false,
              role: "admin",
            })
          );
        }

        setIsModalVisible(false);
        form.resetFields();
        setEditingBank(null);
      })
      .catch(() => {
        message.error("Please fill all required fields correctly!");
      });
  };

  // ✅ Delete blood bank
  const handleDelete = (id) => {
    const updated = bloodBanks.filter((b) => b.id !== id);
    setBloodBanks(updated);
    message.warning("Blood bank deleted successfully!");
    dispatch(
      addNotification({
        id: Date.now(),
        message: `A blood bank was deleted by Admin.`,
        type: "warning",
        read: false,
        role: "admin",
      })
    );
  };

  // ✅ Open edit modal
  const handleEdit = (record) => {
    setEditingBank(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "Bank ID", dataIndex: "id", key: "id" },
    { title: "Blood Bank Name", dataIndex: "name", key: "name" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "volcano"}>
          {status.toUpperCase()}
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
            title="Delete this blood bank?"
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
            Manage Blood Banks
          </Title>
          <Button
            type="primary"
            onClick={() => setIsModalVisible(true)}
            className="bg-red-500"
          >
            Add Blood Bank
          </Button>
        </div>

        <Table
          dataSource={bloodBanks}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>

      {/* ➕ Add / Edit Modal */}
      <Modal
        title={editingBank ? "Edit Blood Bank" : "Add New Blood Bank"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingBank(null);
          form.resetFields();
        }}
        okText="Save"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Blood Bank Name"
            name="name"
            rules={[{ required: true, message: "Please enter blood bank name" }]}
          >
            <Input placeholder="Enter blood bank name" />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter location" }]}
          >
            <Input placeholder="Enter location" />
          </Form.Item>

          <Form.Item
            label="Contact"
            name="contact"
            rules={[
              { required: true, message: "Please enter contact number" },
              {
                pattern: /^[0-9]{10,11}$/,
                message: "Enter a valid contact number",
              },
            ]}
          >
            <Input placeholder="Enter contact number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBloodBanks;
