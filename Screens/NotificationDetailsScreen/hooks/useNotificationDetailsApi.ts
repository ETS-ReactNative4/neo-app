import useApiCall, {
  IApiCallHookData,
  IApiCallConfig
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_getNotificationDetails } from "../../../constants/apiUrls";
import { IMobileServerResponse } from "../../../TypeInterfaces/INetworkResponse";

export interface IItineraryNotificationInfo {
  _id: string;
  body: string;
  title: string;
  userId: string;
  itineraryId: string;
  deviceToken: string[];
  creationTime: number;
  whenToSentLamda: number;
  sentToLamda: boolean;
  fcmResponse: string;
  associatedWithFeed: boolean;
  identifier: string;
  data: any;
  expired: boolean;
  read: boolean; // denotes if the notification is read by the user
  negative: boolean; // denotes if the notification is a negative notification ex: missed a call from pick your trail
}

export interface IItineraryNotificationSuccessData
  extends IMobileServerResponse {
  data: IItineraryNotificationInfo[];
}

export interface INotificationDetailsApiData extends IApiCallHookData {
  successResponseData: IItineraryNotificationSuccessData | undefined;
}

const useNotificationDetailsApi = (): [
  INotificationDetailsApiData,
  (val: string) => Promise<boolean>
] => {
  const [apiDetails, makeApiCall] = useApiCall() as [
    INotificationDetailsApiData,
    (requestObject: IApiCallConfig) => Promise<boolean>
  ];

  const getNotificationDetails = (itineraryId: string): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: CONSTANT_getNotificationDetails.replace(
            ":itineraryId",
            itineraryId
          )
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [apiDetails, getNotificationDetails];
};

export default useNotificationDetailsApi;
