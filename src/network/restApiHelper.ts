import { networkConstants } from "../constants/networkConstants";
import { globalConstants } from "../constants/constants";
import axios from "axios";

const RestApiHelper = {
  async postRequest(endpoint: string, requestParams: object, headers = {}) {
    try {
      const result = await axios.post(endpoint, requestParams, {
        baseURL: networkConstants.BASE_URL,
        headers: headers,
        timeout: 1000 * 60, // 60 secs
      });
      if (result != null && result.data != null) return result.data;
    } catch (err: any) {
      console.log("Post async error:: ", err);
      if (err != null && err.response != null) {
        return err.response;
      }

      return {
        data: {
          clientMessage: globalConstants.STATUS.FAILED,
        },
      };
    }
  },

  async getRequest(endpoint: string, requestParams: object, headers = {}) {
    try {
      const result = await axios.get(endpoint, {
        baseURL: networkConstants.BASE_URL,
        params: requestParams,
        responseType: "json",
        headers: headers,
        timeout: 1000 * 60, // 60 secs
      });

      if (result != null && result.data != null) {
        return result.data;
      }
    } catch (err) {
      console.log("Get async error:: " + err + "  " + endpoint);
      return err;
    }
    return {};
  },
};
export default RestApiHelper;
