import { CONSTANT_savedItineraryDetails } from "../../../constants/apiUrls";
import useApiCall, {
  IApiCallHookData
} from "../../../Services/networkRequests/hooks/useApiCall";
import { IMobileServerResponse } from "../../../TypeInterfaces/INetworkResponse";
import { IItineraryNotification } from "../Notifications";

export interface ISavedItinerarySuccessData extends IMobileServerResponse {
  status: "SUCCESS";
  data: IItineraryNotification[];
}

export interface ISavedItineraryApiCallData extends IApiCallHookData {
  successResponseData: ISavedItinerarySuccessData;
}

export type ISavedItineraryApiCallHook = [
  ISavedItineraryApiCallData,
  () => Promise<boolean>
];

const useSavedItinerariesApi = (): [
  IApiCallHookData,
  () => Promise<boolean>
] => {
  const [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    makeApiCall
  ] = useApiCall();

  const loadItineraryDetails = (): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: CONSTANT_savedItineraryDetails
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    loadItineraryDetails
  ];
};

export default useSavedItinerariesApi;
