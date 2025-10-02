import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [], // { id, patientName, bloodGroup, status, date }
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    updateRequestStatus: (state, action) => {
      const { id, status } = action.payload;
      const req = state.requests.find((r) => r.id === id);
      if (req) req.status = status;
    },
    deleteRequest: (state, action) => {
      state.requests = state.requests.filter((r) => r.id !== action.payload);
    },
  },
});

export const { addRequest, updateRequestStatus, deleteRequest } =
  requestsSlice.actions;
export default requestsSlice.reducer;
