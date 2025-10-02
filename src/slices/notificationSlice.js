import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [], // { id, message, type: "success" | "error" | "info", read }
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
        read: false,
      });
    },
    markAsRead: (state, action) => {
      const notif = state.notifications.find((n) => n.id === action.payload);
      if (notif) notif.read = true;
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, markAsRead, clearNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
