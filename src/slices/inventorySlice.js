import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stock: {
    Aplus: 0,
    Aminus: 0,
    Bplus: 0,
    Bminus: 0,
    ABplus: 0,
    ABminus: 0,
    Oplus: 0,
    Ominus: 0,
  },
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    updateStock: (state, action) => {
      const { bloodGroup, amount } = action.payload;
      if (state.stock[bloodGroup] !== undefined) {
        state.stock[bloodGroup] += amount;
      }
    },
    resetStock: (state) => {
      Object.keys(state.stock).forEach((key) => {
        state.stock[key] = 0;
      });
    },
  },
});

export const { updateStock, resetStock } = inventorySlice.actions;
export default inventorySlice.reducer;
