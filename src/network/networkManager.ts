import { ValidateUrlResponse } from "../types/apiResponse";
import RestApiHelper from "./restApiHelper";

export const NetworkManager = {
  VALIDATE_PRODUCT_URL: "validateUrl",
  TRACK_PRODUCT_PRICE: "trackPrice",

  async vaidateProductUrl(requestParams: object): Promise<ValidateUrlResponse> {
    const result = await RestApiHelper.postRequest(this.VALIDATE_PRODUCT_URL, {
      ...requestParams,
    });
    return result;
  },

  async addProductPriceTracking(
    requestParams: object
  ): Promise<ValidateUrlResponse> {
    const result = await RestApiHelper.postRequest(this.TRACK_PRODUCT_PRICE, {
      ...requestParams,
    });
    return result;
  },
};
