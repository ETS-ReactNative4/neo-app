import useApiCall, {
  IApiCallHookData
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_registerNewUser } from "../../../constants/apiUrls";
import DebouncedAlert from "../../../CommonComponents/DebouncedAlert/DebouncedAlert";

export type leadProdType = "PRE_TRIP";

export interface ILeadSource {
  url: string;
  deviceType: string;
  keyword: string;
  campaign: string;
  cpid?: string;
  landingPage: string;
  lastRoute: string;
  prodType: leadProdType;
}

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
