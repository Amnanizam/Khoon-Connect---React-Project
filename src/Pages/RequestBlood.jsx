import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select, DatePicker, Button, Card, Typography, message } from "antd";
import { addRequest } from "../redux/slices/requestsSlice";
import { addNotification } from "../redux/slices/notificationsSlice";

const { Title } = Typography;
const { Option } = Select;

const RequestBlood = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    const newRequest = {
      id: Date.now(),
      patientName: user?.name || "Unknown",
      bloodGroup: values.bloodGroup,
      hospital: values.hospital,
      urgency: values.urgency,
      date: values.date.format("YYYY-MM-DD"),
      status: "pending",
    };

    dispatch(addRequest(newRequest));
    dispatch(
      addNotification({
        id: Date.now(),
        message: `Blood request submitted for ${values.bloodGroup}`,
        type: "info",
        read: false,
      })
    );

    message.success("Your blood request has been submitted!");
  };

  const onFinishFailed = () => {
    message.error("Please fill all required fields before submitting.");
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl !bg-white">
        <Title level={3} className="text-center mb-4 text-red-500">
          Request Blood
        </Title>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Patient Name">
            <Input value={user?.name} disabled />
          </Form.Item>

          <Form.Item
            label="Blood Group"
            name="bloodGroup"
            rules={[{ required: true, message: "Please select blood group" }]}
          >
            <Select placeholder="Select blood group">
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

          <Form.Item
            label="Hospital / Location"
            name="hospital"
            rules={[{ required: true, message: "Please enter hospital name" }]}
          >
            <Input placeholder="Enter hospital or location" />
          </Form.Item>

          <Form.Item
            label="Urgency"
            name="urgency"
            rules={[{ required: true, message: "Please select urgency level" }]}
          >
            <Select placeholder="Select urgency">
              <Option value="Normal">Normal</Option>
              <Option value="Urgent">Urgent</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Required Date"
            name="date"
            rules={[{ required: true, message: "Please pick a date" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-red-500">
              Submit Request
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RequestBlood;
