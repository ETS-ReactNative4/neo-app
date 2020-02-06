import useApiCall, {
  IApiCallHookData
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_verifyMobileNumber } from "../../../constants/apiUrls";
import DebouncedAlert from "../../../CommonComponents/DebouncedAlert/DebouncedAlert";

export interface IMobileNumberRequestBody {
  mob_num: string;
  ccode: string;
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
          requestBody,
          route: CONSTANT_verifyMobileNumber,
          method: "POST"
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
