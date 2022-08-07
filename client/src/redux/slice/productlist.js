import { createSlice } from "@reduxjs/toolkit";

const products = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    getProductlistSlice: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
export const { getProductlistSlice } = products.actions;
export default products.reducer;
