import useApiCall, {
  IApiCallHookData
} from "../../../../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_appVersionCheck } from "../../../../../../constants/apiUrls";

export interface IForceUpdateData {
  iosVersion: string;
  androidVersion: string;
  androidUrl: string;
  iosUrl: string;
}

export interface IForceUpdateHookData extends IApiCallHookData {
  successResponseData: IForceUpdateData | undefined;
}

const useForceUpdateCheck = (): [IForceUpdateHookData, () => any] => {
  const [
    { successResponseData, failureResponseData, isLoading, isError, isSuccess },
    makeApiCall
  ] = useApiCall();

  const checkForForceUpdate = () => {
    makeApiCall({ route: CONSTANT_appVersionCheck })
      .then(() => null)
      .catch(() => null);
  };

  return [
    { successResponseData, failureResponseData, isLoading, isError, isSuccess },
    checkForForceUpdate
  ];
};

export default useForceUpdateCheck;
