import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Button, Card, Typography, Badge, message } from "antd";
import { markAsRead, clearNotifications } from "../redux/slices/notificationsSlice";

const { Title } = Typography;

const Notifications = () => {
  const { notifications } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearNotifications());
    message.success("All notifications cleared!");
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-3xl shadow-lg rounded-2xl !bg-white">
        <div className="flex justify-between items-center mb-4">
          <Title level={3} className="text-red-500">
            Notifications
          </Title>
          <Button type="default" danger onClick={handleClear}>
            Clear All
          </Button>
        </div>

        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              actions={[
                !item.read && (
                  <Button
                    size="small"
                    onClick={() => {
                      dispatch(markAsRead(item.id));
                      message.info("Notification marked as read.");
                    }}
                  >
                    Mark as Read
                  </Button>
                ),
              ]}
            >
              <List.Item.Meta
                title={
                  <Badge dot={!item.read}>
                    <span>{item.message}</span>
                  </Badge>
                }
                description={`Type: ${item.type}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Notifications;
