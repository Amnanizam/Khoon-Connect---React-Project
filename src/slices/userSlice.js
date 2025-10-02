import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [], // { id, name, role, email, status }
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, updates } = action.payload;
      const user = state.users.find((u) => u.id === id);
      if (user) Object.assign(user, updates);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
