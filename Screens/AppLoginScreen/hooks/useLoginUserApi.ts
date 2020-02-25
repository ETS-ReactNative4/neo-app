import useApiCall, {
  IApiCallHookData
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_verifyOtpV2 } from "../../../constants/apiUrls";

export interface ILoginRequestBody {
  otpDetailsId: string;
  mobileNumber: string;
  countryPhoneCode: string;
  otp: string;
}

const useLoginUserApi = (): [
  IApiCallHookData,
  (requestBody: ILoginRequestBody) => Promise<boolean>
] => {
  const [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    makeApiCall
  ] = useApiCall();

  const loginUser = (requestBody: ILoginRequestBody): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const result = makeApiCall({
          route: CONSTANT_verifyOtpV2,
          requestBody,
          method: "POST"
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    loginUser
  ];
};

export default useLoginUserApi;
