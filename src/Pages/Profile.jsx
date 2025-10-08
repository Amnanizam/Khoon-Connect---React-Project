// src/pages/Profile.jsx
import React, { useEffect } from "react";
import { Card, Typography, Form, Input, Button, message } from "antd";
import NavbarDashboard from "../Components/NavbarDashboard";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../slices/userSlice";
import { setUser } from "../slices/authSlice"; // optional if auth stores user info

const { Title } = Typography;

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user, form]);

  const onFinish = (values) => {
    try {
      const updatedUser = {
        ...user,
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
      };

      // ✅ Update Redux (both users list and auth user)
      dispatch(updateUser({ id: user?.id, updates: updatedUser }));
      dispatch(setUser(updatedUser));

      // ✅ Save to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(updatedUser));

      message.success("✅ Profile updated successfully!");
    } catch (error) {
      console.error(error);
      message.error("❌ Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarDashboard />
      <div className="p-6 flex justify-center items-start mt-10">
        <Card className="w-full max-w-lg shadow-xl rounded-2xl border border-gray-200">
          <Title level={3} className="text-center text-red-600 mb-6">
            My Profile
          </Title>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="space-y-3"
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { type: "email", message: "Enter a valid email" },
                { required: true, message: "Please enter your email" },
              ]}
            >
              <Input placeholder="Enter your email address" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
                {
                  pattern: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item name="address" label="Address">
              <Input.TextArea
                placeholder="Enter your address (optional)"
                rows={2}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-red-500 hover:bg-red-600 w-full"
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
