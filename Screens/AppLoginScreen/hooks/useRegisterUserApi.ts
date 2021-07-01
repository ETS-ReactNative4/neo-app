import useApiCall, {
  IApiCallHookData
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_registerNewUser } from "../../../constants/apiUrls";
import DebouncedAlert from "../../../CommonComponents/DebouncedAlert/DebouncedAlert";
import { IRequestCallbackLeadSource } from "../../RequestCallback/hooks/useRequestCallbackApi";
import { Platform } from "react-native";
import { CONSTANT_platformIos } from "../../../constants/stringConstants";

export interface ILeadSource extends IRequestCallbackLeadSource {}

export interface IRegisterRequestBody {
  mobileNumber: string;
  userName: string;
  email: string;
  countryPhoneCode: string;
  leadSource?: ILeadSource;
  cpid?: string;
}

const useRegisterUserApi = (): [
  IApiCallHookData,
  (request: IRegisterRequestBody) => Promise<boolean>
] => {
  const [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    makeApiCall
  ] = useApiCall();

  const registerUser = (
    requestBody: IRegisterRequestBody
  ): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      if (requestBody.leadSource) {
        requestBody.leadSource = {
          ...requestBody.leadSource,
          deviceType:
            Platform.OS === CONSTANT_platformIos ? "iOS" : "Android OS"
        };
      } else {
        requestBody.leadSource = {
          deviceType:
            Platform.OS === CONSTANT_platformIos ? "iOS" : "Android OS"
        };
      }
      try {
        const result = await makeApiCall({
          route: CONSTANT_registerNewUser,
          method: "POST",
          requestBody
        });
        resolve(result);
      } catch (e) {
        DebouncedAlert("Oops!", "Network Request Failed...");
        reject();
      }
    });
  };

  return [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    registerUser
  ];
};

export default useRegisterUserApi;
