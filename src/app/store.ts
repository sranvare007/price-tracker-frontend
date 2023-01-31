import { configureStore } from "@reduxjs/toolkit";
import productDetailReducer from "../features/productDetails";
import productUrlReducer from "../features/productUrl";

export default configureStore({
  reducer: {
    productDetails: productDetailReducer,
    productUrl: productUrlReducer,
  },
});
