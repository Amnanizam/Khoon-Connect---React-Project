// src/pages/Register.jsx
import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";
import Navbar from "../Components/Navbar";

const { Title } = Typography;
const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    const { name, email, password, role } = values;

    // ✅ Fetch existing users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Check if email already exists
    const existingUser = storedUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      message.error("⚠️ User with this email already exists!");
      setLoading(false);
      return;
    }

    // ✅ Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: role.toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    // ✅ Update Redux store and localStorage
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    dispatch(addUser(newUser));

    // ✅ Success message and redirect
    message.success("✅ Registration successful! Please login.");
    navigate("/login");

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
      {/* ✅ Public Navbar (simple) */}
      <Navbar />

      <div className="flex items-center justify-center py-10">
        <Card className="w-[400px] shadow-2xl rounded-2xl border border-gray-200">
          <Title
            level={3}
            className="text-center text-red-600 mb-6 font-semibold"
          >
            Register on <span className="text-red-500">Khoon Connect</span>
          </Title>

          <Form layout="vertical" onFinish={onFinish} autoComplete="off">
            {/* Role Selection */}
            <Form.Item
              name="role"
              label="Select Role"
              rules={[{ required: true, message: "Please select your role" }]}
            >
              <Select placeholder="Choose your role">
                <Option value="donor">Donor</Option>
                <Option value="patient">Patient</Option>
                <Option value="bloodbank">Blood Bank</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>

            {/* Full Name */}
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please enter your full name" }]}
            >
              <Input placeholder="Enter your name" />
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
              <Input placeholder="Enter your email address" />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter a password" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long",
                },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="bg-red-500 hover:bg-red-600"
              >
                Register
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-3">
            Already have an account?{" "}
            <Button
              type="link"
              className="text-red-600"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
