// src/pages/FindBlood.jsx
import React, { useMemo, useState } from "react";
import { Table, Button, Card, Typography, Select, Form, Row, Col, message, Tag } from "antd";
import NavbarDashboard from "../Components/NavbarDashboard";
import { useDispatch, useSelector } from "react-redux";
import { updateRequestStatus } from "../redux/slices/requestsSlice";
import { addDonation } from "../redux/slices/donationsSlice";
import { addNotification } from "../redux/slices/notificationsSlice";

const { Title } = Typography;
const { Option } = Select;

export default function FindBlood() {
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requests);
  const { user } = useSelector((state) => state.auth);
  const [filterForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // default show only pending requests
  const [filters, setFilters] = useState({ bloodGroup: null, hospital: "" });

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (r.status !== "pending") return false;
      if (filters.bloodGroup && r.bloodGroup !== filters.bloodGroup) return false;
      if (filters.hospital && !r.hospital.toLowerCase().includes(filters.hospital.toLowerCase())) return false;
      return true;
    });
  }, [requests, filters]);

  const handleAccept = (record) => {
    setLoading(true);
    // mark request approved & record donor
    dispatch(updateRequestStatus({ id: record.id, status: "approved", donor: user?.name }));
    // add donation record
    dispatch(addDonation({
      id: Date.now(),
      donor: user?.name,
      patientName: record.patientName,
      bloodGroup: record.bloodGroup,
      date: new Date().toISOString().split("T")[0],
      hospital: record.hospital,
    }));
    // notify patient
    dispatch(addNotification({
      id: Date.now(),
      message: `${user?.name} has accepted your request for ${record.bloodGroup}.`,
      type: "info",
      read: false
    }));
    message.success("You accepted the request. Please contact the patient/hospital.");
    setLoading(false);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 90 },
    { title: "Patient", dataIndex: "patientName", key: "patientName" },
    { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
    { title: "Hospital", dataIndex: "hospital", key: "hospital" },
    { title: "Urgency", dataIndex: "urgency", key: "urgency", render: (u) => <Tag color={u === "Urgent" ? "red" : "blue"}>{u}</Tag> },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Action", key: "action", render: (_, record) => (
        <Button type="primary" className="bg-red-500" loading={loading} onClick={() => handleAccept(record)}>
          Accept
        </Button>
      )
    }
  ];

  const onFilter = (values) => {
    setFilters({ bloodGroup: values.bloodGroup || null, hospital: values.hospital || "" });
  };

  return (
    <div>
      <NavbarDashboard />
      <div className="p-6">
        <Card className="shadow-lg rounded-lg">
          <Title level={3} className="text-red-600">Find Blood Requests</Title>

          <Form form={filterForm} layout="inline" onFinish={onFilter} className="mb-4">
            <Row gutter={12} className="w-full">
              <Col xs={24} sm={10}>
                <Form.Item name="bloodGroup">
                  <Select placeholder="Filter by blood group" allowClear className="w-full">
                    <Option value="A+">A+</Option>
                    <Option value="A-">A-</Option>
                    <Option value="B+">B+</Option>
                    <Option value="B-">B-</Option>
                    <Option value="AB+">AB+</Option>
                    <Option value="AB-">AB-</Option>
                    <Option value="O+">O+</Option>
                    <Option value="O-">O-</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={10}>
                <Form.Item name="hospital">
                  <input placeholder="Search by hospital" className="w-full border rounded px-3 py-2" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={4}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="bg-red-500">Filter</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Table
            columns={columns}
            dataSource={filtered}
            rowKey="id"
            pagination={{ pageSize: 6 }}
            locale={{ emptyText: "No pending requests found." }}
          />
        </Card>
      </div>
    </div>
  );
}
