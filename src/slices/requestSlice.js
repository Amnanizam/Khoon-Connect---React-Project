import { createSlice } from "@reduxjs/toolkit";

// ✅ Load saved requests from localStorage (if any)
const savedRequests = JSON.parse(localStorage.getItem("requests")) || [];

const initialState = {
  requests: savedRequests,
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    // ➕ Add new blood request (Patient)
    addRequest: (state, action) => {
      state.requests.push(action.payload);
      localStorage.setItem("requests", JSON.stringify(state.requests));
    },

    // 🔁 Update request status or assign donor
    updateRequestStatus: (state, action) => {
      const { id, status, donor } = action.payload;
      const req = state.requests.find((r) => r.id === id);
      if (req) {
        req.status = status;
        if (donor) req.donorName = donor;
      }
      localStorage.setItem("requests", JSON.stringify(state.requests));
    },

    // ❌ Remove request (Admin)
    removeRequest: (state, action) => {
      state.requests = state.requests.filter((r) => r.id !== action.payload);
      localStorage.setItem("requests", JSON.stringify(state.requests));
    },
  },
});

// ✅ Export actions and reducer
export const { addRequest, updateRequestStatus, removeRequest } =
  requestsSlice.actions;

export default requestsSlice.reducer;
