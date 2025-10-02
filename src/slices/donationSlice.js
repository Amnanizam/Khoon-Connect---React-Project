import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  donations: [], // { id, donorName, bloodGroup, date, location }
};

const donationsSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {
    addDonation: (state, action) => {
      state.donations.push(action.payload);
    },
    deleteDonation: (state, action) => {
      state.donations = state.donations.filter((d) => d.id !== action.payload);
    },
  },
});

export const { addDonation, deleteDonation } = donationsSlice.actions;
export default donationsSlice.reducer;
