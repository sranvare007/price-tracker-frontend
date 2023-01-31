export type ValidateUrlResponse = {
  status: string;
  message: ProductDetailType | string;
};

export type ProductDetailType = {
  productName: string;
  productPrice: string;
  productImageUrl: string;
  productMrp: string;
  productDiscount: string;
};
