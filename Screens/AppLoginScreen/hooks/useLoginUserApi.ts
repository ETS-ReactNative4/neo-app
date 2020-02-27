import useApiCall, {
  IApiCallHookData,
  IApiCallConfig
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_verifyOtpV2 } from "../../../constants/apiUrls";
import { CONSTANT_responseSuccessStatus } from "../../../constants/stringConstants";

export interface ILoginRequestBody {
  otpDetailsId: string;
  mobileNumber: string;
  countryPhoneCode: string;
  otp: string;
}

export interface ILoginSuccessData {
  status: typeof CONSTANT_responseSuccessStatus;
  data?: {
    authToken?: string;
    otpStatus?: "VERIFIED";
  };
}

export interface ILoginFailureData {
  status: "FAILURE";
  data?: {
    otpStatus?: "VERIFICATIONFAILED";
  };
}

export interface ILoginApiHookData extends IApiCallHookData {
  successResponseData: ILoginSuccessData | undefined;
  failureResponseData: ILoginFailureData | undefined;
}

export type loginApiHook = [
  ILoginApiHookData,
  (requestObject: IApiCallConfig) => Promise<boolean>
];

const useLoginUserApi = (): [
  ILoginApiHookData,
  (requestBody: ILoginRequestBody) => Promise<boolean>
] => {
  const [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    makeApiCall
  ] = useApiCall() as loginApiHook;
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
