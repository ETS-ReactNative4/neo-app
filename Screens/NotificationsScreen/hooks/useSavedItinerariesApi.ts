import { CONSTANT_savedItineraryDetails } from "../../../constants/apiUrls";
import useApiCall, {
  IApiCallHookData,
  IApiCallConfig
} from "../../../Services/networkRequests/hooks/useApiCall";
import { IMobileServerResponse } from "../../../TypeInterfaces/INetworkResponse";
import { IItineraryNotification } from "../Notifications";

export interface ISavedItinerarySuccessData extends IMobileServerResponse {
  status: "SUCCESS";
  data: IItineraryNotification[];
}

export interface ISavedItineraryApiCallData extends IApiCallHookData {
  successResponseData: ISavedItinerarySuccessData | undefined;
}

export type ISavedItineraryApiCallHook = [
  ISavedItineraryApiCallData,
  (req: IApiCallConfig) => Promise<boolean>
];

const useSavedItinerariesApi = (): [
  ISavedItineraryApiCallData,
  () => Promise<boolean>
] => {
  const [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    makeApiCall
  ] = useApiCall() as ISavedItineraryApiCallHook;

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
