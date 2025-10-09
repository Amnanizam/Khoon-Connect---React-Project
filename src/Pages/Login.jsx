// src/pages/Login.jsx
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Select,
  Alert,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setIsLoggedIn } from "../slices/authSlice";
import Navbar from "../Components/Navbar";
import "antd/dist/reset.css"; // ✅ important for Ant Design styling

const { Title } = Typography;
const { Option } = Select;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // 👈 show inline error

  const onFinish = (values) => {
    setLoading(true);
    setErrorMsg(""); // reset previous error
    const { email, password, role } = values;

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const userByEmail = storedUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!userByEmail) {
      setErrorMsg(" User not found. Please register first.");
      setLoading(false);
      return;
    }

    if (userByEmail.password !== password) {
      setErrorMsg("🔑 Incorrect password. Please try again.");
      setLoading(false);
      return;
    }

    if (userByEmail.role.toLowerCase() !== role.toLowerCase()) {
      setErrorMsg("⚠️ Role mismatch! Please select the correct role.");
      setLoading(false);
      return;
    }

    // ✅ Success login
    dispatch(setUser(userByEmail));
    dispatch(setIsLoggedIn(true));
    localStorage.setItem("currentUser", JSON.stringify(userByEmail));
    localStorage.setItem("isLoggedIn", "true");

    setErrorMsg(""); // clear any error
    navigate("/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Navbar />

      <div className="flex items-center justify-center py-10">
        <Card className="w-[400px] shadow-2xl rounded-2xl border border-gray-200">
          <Title level={3} className="text-center mb-6 font-semibold">
            Login to <span className="text-red-500">Khoon Connect</span>
          </Title>

          {/* 👇 Inline error alert like your screenshot */}
          {errorMsg && (
            <Alert
              message={errorMsg}
              type="error"
              showIcon
              style={{
                marginBottom: "16px",
                backgroundColor: "#fff1f0",
                border: "1px solid #ffa39e",
              }}
            />
          )}

          <Form layout="vertical" onFinish={onFinish}>
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
