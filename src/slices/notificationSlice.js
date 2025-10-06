import { createSlice } from "@reduxjs/toolkit";

// ✅ Load notifications from localStorage
const savedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];

const initialState = {
  notifications: savedNotifications,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // ➕ Add a new notification
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload); // newest first
      localStorage.setItem("notifications", JSON.stringify(state.notifications));
    },

    // ✅ Mark notification as read
    markAsRead: (state, action) => {
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification) {
        notification.read = true;
        localStorage.setItem("notifications", JSON.stringify(state.notifications));
      }
    },

    // 🧹 Clear all notifications
    clearNotifications: (state) => {
      state.notifications = [];
      localStorage.setItem("notifications", JSON.stringify(state.notifications));
    },
  },
});

export const { addNotification, markAsRead, clearNotifications } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
