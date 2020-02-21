import useApiCall, {
  IApiCallHookData
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_verifyMobileNumberV2 } from "../../../constants/apiUrls";
import DebouncedAlert from "../../../CommonComponents/DebouncedAlert/DebouncedAlert";
import generateUrlParams from "../../../Services/generateUrlParams/generateUrlParams";

export interface IMobileNumberRequestBody {
  mobileNumber: string;
  countryPhoneCode: string;
}

const useMobileNumberApi = (): [
  IApiCallHookData,
  (request: IMobileNumberRequestBody) => Promise<boolean>
] => {
  const [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    makeApiCall
  ] = useApiCall();

  const submitMobileNumber = (
    requestBody: IMobileNumberRequestBody
  ): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: `${CONSTANT_verifyMobileNumberV2}${generateUrlParams(
            requestBody
          )}`,
          method: "GET"
        });
        resolve(result);
      } catch (e) {
        DebouncedAlert("Oops!", "Network Request Failed...");
        reject();
      }
    });
  };

  return [
    {
      isError,
      isLoading,
      isSuccess,
      successResponseData,
      failureResponseData
    },
    submitMobileNumber
  ];
};

export default useMobileNumberApi;
