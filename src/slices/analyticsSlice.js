// src/slices/analyticsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const storedAnalytics = localStorage.getItem("analyticsData");

const initialState = storedAnalytics
  ? JSON.parse(storedAnalytics)
  : {
      totalRequests: 0,
      fulfilledRequests: 0,
      donorsCount: 0,
      patientsCount: 0,
      bloodInventory: {
        "A+": 10,
        "A-": 5,
        "B+": 8,
        "B-": 4,
        "AB+": 6,
        "AB-": 3,
        "O+": 12,
        "O-": 5,
      },
    };

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    updateAnalytics: (state, action) => {
      Object.assign(state, action.payload);
      localStorage.setItem("analyticsData", JSON.stringify(state));
    },
    incrementRequest: (state) => {
      state.totalRequests += 1;
      localStorage.setItem("analyticsData", JSON.stringify(state));
    },
    fulfillRequest: (state) => {
      state.fulfilledRequests += 1;
      localStorage.setItem("analyticsData", JSON.stringify(state));
    },
    updateDonorCount: (state, action) => {
      state.donorsCount = action.payload;
      localStorage.setItem("analyticsData", JSON.stringify(state));
    },
    updatePatientCount: (state, action) => {
      state.patientsCount = action.payload;
      localStorage.setItem("analyticsData", JSON.stringify(state));
    },
    updateBloodInventory: (state, action) => {
      const { group, units } = action.payload;
      if (state.bloodInventory[group] !== undefined) {
        state.bloodInventory[group] = units;
      }
      localStorage.setItem("analyticsData", JSON.stringify(state));
    },
    resetAnalytics: () => {
      localStorage.removeItem("analyticsData");
      return initialState;
    },
  },
});

export const {
  updateAnalytics,
  incrementRequest,
  fulfillRequest,
  updateDonorCount,
  updatePatientCount,
  updateBloodInventory,
  resetAnalytics,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
