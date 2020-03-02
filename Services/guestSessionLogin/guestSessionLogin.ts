import apiCall from "../networkRequests/apiCall";
import { CONSTANT_guestLogin } from "../../constants/apiUrls";
import { IMobileServerResponse } from "../../TypeInterfaces/INetworkResponse";
import { CONSTANT_responseSuccessStatus } from "../../constants/stringConstants";
import { registerTokenV2 } from "../registerToken/registerToken";

export interface IGuestLoginServerResponse extends IMobileServerResponse {
  data?: {
    authToken?: string;
    otpStatus: string;
  };
}

const guestSessionLogin = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    apiCall(CONSTANT_guestLogin)
      .then((response: IGuestLoginServerResponse) => {
        if (response.status === CONSTANT_responseSuccessStatus) {
          if (response?.data?.authToken) {
            registerTokenV2(response.data.authToken)
              .then(resolve)
              .catch(reject);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      })
      .catch(reject);
  });
};

export default guestSessionLogin;
