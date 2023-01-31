import { ProductDetailType } from "./apiResponse";

type ReduxProductDetail = {
  productDetail: ProductDetailType;
};

type ProductUrlType = {
  productUrl: string;
};

export type RootState = {
  productDetails: ReduxProductDetail;
  productUrl: ProductUrlType;
};
