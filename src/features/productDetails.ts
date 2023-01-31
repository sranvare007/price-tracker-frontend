import { createSlice } from "@reduxjs/toolkit";

export const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    productDetail: undefined,
  },
  reducers: {
    setProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProductDetail } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
