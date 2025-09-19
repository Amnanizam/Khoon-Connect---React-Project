// src/pages/Register.jsx
import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Select, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    const { username, email, password, role } = values;

    // Get existing users
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const existingUser = storedUsers.find((u) => u.email === email);

    if (existingUser) {
      message.error("User with this email already exists!");
      setLoading(false);
      return;
    }

    // Create new user
    const newUser = { username, email, password, role };
    storedUsers.push(newUser);

    // Save updated users list
    localStorage.setItem("users", JSON.stringify(storedUsers));

    message.success("Registration successful! Please login.");
    navigate("/login");

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-[400px] shadow-lg rounded-xl">
        <Title level={3} className="text-center">
          Register at Khoon Connect
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          {/* Role Selection */}
          <Form.Item
            name="role"
            label="Select Role"
            rules={[{ required: true, message: "Please select your role" }]}
          >
            <Select placeholder="Choose your role">
              <Option value="Donor">Donor</Option>
              <Option value="Patient">Patient</Option>
              <Option value="Bank">Blood Bank</Option>
              <Option value="Admin">Admin</Option>
            </Select>
          </Form.Item>

          {/* Username */}
          <Form.Item
            name="username"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="bg-red-500"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          Already have an account?{" "}
          <Button type="link" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Register;
