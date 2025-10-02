import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: null, // "admin" | "donor" | "patient" | "bloodbank"
  user: null, // { name, email, ... }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload.role;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
