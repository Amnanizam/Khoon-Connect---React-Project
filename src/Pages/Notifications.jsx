// src/Pages/Notifications.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  Card,
  Typography,
  Tag,
  Button,
  message,
  Popconfirm,
  Empty,
} from "antd";
import {
  markAsRead,
  clearNotifications,
} from "../slices/notificationsSlice";

const { Title, Text } = Typography;

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);
  const { user } = useSelector((state) => state.auth);

  const userRole = user?.role;

  // ✅ Filter notifications by user role
  const roleNotifications = notifications.filter(
    (n) => !n.role || n.role === userRole
  );

  // ✅ Mark single notification as read
  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
    message.success("Notification marked as read.");
  };

  // ✅ Clear all notifications
  const handleClearAll = () => {
    dispatch(clearNotifications());
    message.info("All notifications cleared.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-4xl shadow-lg rounded-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Title level={3} className="text-red-500">
            Notifications
          </Title>

          {roleNotifications.length > 0 && (
            <Popconfirm
              title="Clear all notifications?"
              onConfirm={handleClearAll}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="default">
                Clear All
              </Button>
            </Popconfirm>
          )}
        </div>

        {/* If no notifications */}
        {roleNotifications.length === 0 ? (
          <Empty
            description={`No notifications for ${
              userRole || "this user"
            }`}
            className="text-gray-400 py-10"
          />
        ) : (
          // ✅ Notification list
          <List
            itemLayout="horizontal"
            dataSource={roleNotifications}
            renderItem={(item) => (
              <List.Item
                className={`rounded-lg px-4 py-3 mb-3 shadow-sm border ${
                  item.read ? "bg-gray-100" : "bg-red-50"
                }`}
                actions={[
                  !item.read && (
                    <Button
                      type="link"
                      onClick={() => handleMarkAsRead(item.id)}
                      className="text-blue-600"
                    >
                      Mark as Read
                    </Button>
                  ),
                ]}
              >
                <List.Item.Meta
                  title={
                    <div className="flex justify-between items-center">
                      <Text strong>{item.message}</Text>
                      <Tag
                        color={
                          item.type === "success"
                            ? "green"
                            : item.type === "warning"
                            ? "orange"
                            : item.type === "info"
                            ? "blue"
                            : "default"
                        }
                      >
                        {item.type?.toUpperCase() || "INFO"}
                      </Tag>
                    </div>
                  }
                  description={
                    <Text type="secondary">
                      {new Date(item.timestamp || item.id).toLocaleString()}
                    </Text>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default Notifications;
