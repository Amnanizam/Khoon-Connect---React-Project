// src/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load user data from localStorage
const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const initialState = {
  user: storedUser,
  isLoggedIn: !!storedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("currentUser");
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUser, logout, setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
