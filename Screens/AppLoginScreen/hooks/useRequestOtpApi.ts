import useApiCall, {
  IApiCallHookData,
  IApiCallConfig
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_requestOtp } from "../../../constants/apiUrls";

type otpFactor = "SMS" | "EMAIL";

export interface IOtpRequestBody {
  mob_num: string;
  ccode: string;
  email?: string;
  factors: otpFactor[];
}

export interface IOtpRequestSuccessData {
  status: "SUCCESS";
  data?: {
    otpDetailsId?: string;
    otpExpiresIn?: number;
  };
}

export interface IOtpApiHookData extends IApiCallHookData {
  successResponseData: IOtpRequestSuccessData | undefined;
}

export type otpApiHook = [
  IOtpApiHookData,
  (requestObject: IApiCallConfig) => Promise<boolean>
];

const useRequestOtpApi = (): [
  IOtpApiHookData,
  (requestBody: IOtpRequestBody) => Promise<boolean>
] => {
  const [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    makeApiCall
  ] = useApiCall() as otpApiHook;

  const makeOtpRequestCall = (
    requestBody: IOtpRequestBody
  ): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = makeApiCall({
          route: CONSTANT_requestOtp,
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
    makeOtpRequestCall
  ];
};

export default useRequestOtpApi;
