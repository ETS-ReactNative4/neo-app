import useApiCall, {
  IApiCallHookData
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_requestCallback } from "../../../constants/apiUrls";

export type leadSourceProdType = "App_search" | "App_listing" | "App_explore";

export type leadSourceDeviceType = "Android OS" | "iOS";

export interface IRequestCallbackLeadSource {
  url?: string;
  deviceType: leadSourceDeviceType;
  keyword?: string;
  campaign?: string;
  cpid?: string;
  landingPage?: string;
  lastRoute?: string;
  prodType: leadSourceProdType;
}

export interface IRequestCallbackRequestBody {
  name: string;
  mobileNumber: string;
  email: string;
  itineraryId?: string;
  pageUrl: string;
  countryPhoneCode: string;
  canSendWhatsAppMessages: boolean;
  preferredTime: number;
  campaignId?: string;
  leadSource: IRequestCallbackLeadSource;
}

const useRequestCallbackApi = (): [
  IApiCallHookData,
  (request: IRequestCallbackRequestBody) => Promise<boolean>
] => {
  const [apiDetails, makeApiCall] = useApiCall();

  const requestCallback = (
    requestBody: IRequestCallbackRequestBody
  ): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          requestBody,
          route: CONSTANT_requestCallback,
          method: "POST"
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [apiDetails, requestCallback];
};

export default useRequestCallbackApi;
