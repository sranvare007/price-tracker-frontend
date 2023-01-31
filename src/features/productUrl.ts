import { createSlice } from "@reduxjs/toolkit";

export const productUrlSlice = createSlice({
  name: "productUrl",
  initialState: {
    productUrl: null,
  },
  reducers: {
    setProductUrlState: (state, action) => {
      state.productUrl = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProductUrlState } = productUrlSlice.actions;

export default productUrlSlice.reducer;
