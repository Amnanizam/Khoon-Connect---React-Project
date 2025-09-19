// src/pages/Login.jsx
import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Select, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    const { email, password, role } = values;

    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists
    const user = storedUsers.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (user) {
      // Save current user
      localStorage.setItem("currentUser", JSON.stringify(user));
      message.success(`Welcome back, ${user.username}!`);
      navigate("/dashboard"); // redirect to dashboard
    } else {
      message.error("Invalid credentials or role mismatch!");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-[400px] shadow-lg rounded-xl">
        <Title level={3} className="text-center">
          Login to Khoon Connect
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
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          Don’t have an account?{" "}
          <Button type="link" onClick={() => navigate("/register")}>
            Register
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
