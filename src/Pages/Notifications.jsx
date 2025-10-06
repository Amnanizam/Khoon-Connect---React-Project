import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Button, Tag, message } from "antd";
import { markAsRead, clearNotifications } from "../redux/slices/notificationsSlice";

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);
  const { role } = useSelector((state) => state.auth);

  // Filter notifications based on role
  const roleNotifications = notifications.filter((n) => n.role === role);

  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
    message.success("Marked as read!");
  };

  const handleClear = () => {
    dispatch(clearNotifications(role));
    message.info("All notifications cleared for your role!");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-red-600">Notifications</h1>
        {roleNotifications.length > 0 && (
          <Button danger onClick={handleClear}>
            Clear All
          </Button>
        )}
      </div>

      {roleNotifications.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No notifications available for your role.</p>
        </div>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={roleNotifications}
          bordered
          renderItem={(item) => (
            <List.Item
              className={`${
                item.read ? "bg-white" : "bg-red-50"
              } transition-all duration-200 rounded-md mb-2 shadow-sm`}
              actions={[
                !item.read && (
                  <Button type="link" onClick={() => handleMarkAsRead(item.id)}>
                    Mark as read
                  </Button>
                ),
              ]}
            >
              <List.Item.Meta
                title={
                  <div className="flex justify-between">
                    <span>{item.message}</span>
                    <Tag color={item.type === "success" ? "green" : "red"}>
                      {item.type.toUpperCase()}
                    </Tag>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Notifications;
