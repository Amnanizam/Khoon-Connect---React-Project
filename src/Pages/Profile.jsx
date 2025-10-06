// src/pages/Profile.jsx
import React, { useEffect } from "react";
import { Card, Typography, Form, Input, Button, message } from "antd";
import NavbarDashboard from "../Components/NavbarDashboard";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../slices/usersSlice";

const { Title } = Typography;

export default function Profile() {
  const { user } = useSelector(state => state.auth);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ name: user.name, email: user.email });
    }
  }, [user]);

  const onFinish = (values) => {
    // Update local redux users list and optionally auth user (if you keep user in authSlice)
    dispatch(updateUser({ id: user?.id, updates: { name: values.name, email: values.email } }));
    message.success("Profile updated!");
  };

  return (
    <div>
      <NavbarDashboard />
      <div className="p-6 flex justify-center">
        <Card className="w-full max-w-md shadow-lg rounded-lg">
          <Title level={3} className="text-red-600">My Profile</Title>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Please enter your name" }]}>
              <Input />
            </Form.Item>

            <Form.Item name="email" label="Email" rules={[{ type: "email", message: "Enter a valid email" }, { required: true, message: "Please enter email" }]}>
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-red-500 w-full">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
