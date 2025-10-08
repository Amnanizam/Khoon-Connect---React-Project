// src/pages/Login.jsx
import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setIsLoggedIn } from "../slices/authSlice";
import Navbar from "../Components/Navbar";

const { Title } = Typography;
const { Option } = Select;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    const { email, password, role } = values;

    // ✅ Retrieve users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Match user with email, password, and role
    const user = storedUsers.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password &&
        u.role.toLowerCase() === role.toLowerCase()
    );

    if (user) {
      // ✅ Save user info in Redux and localStorage
      dispatch(setUser(user));
      dispatch(setIsLoggedIn(true));
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      message.success(`Welcome back, ${user.name || "User"}! 👋`);

      // ✅ Navigate to dashboard
      navigate("/dashboard");
    } else {
      message.error("Invalid credentials or role mismatch!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* ✅ Simple Navbar (public view) */}
      <Navbar />

      <div className="flex items-center justify-center py-10">
        <Card className="w-[400px] shadow-2xl rounded-2xl border border-gray-200">
          <Title
            level={3}
            className="text-center text-red-600 mb-6 font-semibold"
          >
            Login to <span className="text-red-500">Khoon Connect</span>
          </Title>

          <Form layout="vertical" onFinish={onFinish}>
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
                className="bg-red-500 hover:bg-red-600"
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-3">
            Don’t have an account?{" "}
            <Button
              type="link"
              className="text-red-600"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
