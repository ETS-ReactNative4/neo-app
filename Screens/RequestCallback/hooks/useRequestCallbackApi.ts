import useApiCall, {
  IApiCallHookData
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_requestCallback } from "../../../constants/apiUrls";

export interface IRequestCallbackLeadSource {
  url: string;
  deviceType: string;
  keyword: string;
  campaign: string;
  cpid: string | null;
  landingPage: string;
  lastRoute: string;
  prodType: string;
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
  leadSource?: IRequestCallbackLeadSource;
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
          route: CONSTANT_requestCallback
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
