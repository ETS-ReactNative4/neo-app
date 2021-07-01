import useApiCall, {
  IApiCallHookData,
  IApiCallConfig
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_retrieveGlobalData } from "../../../constants/apiUrls";
import { IMobileServerResponse } from "../../../TypeInterfaces/INetworkResponse";
import { ExploreFeedType } from "../ExploreFeedType";

export interface IExploreDataResponseType extends IMobileServerResponse {
  data: [
    {
      _id: string;
      locale: string;
      page: string;
      key: string;
      value: ExploreFeedType;
    }
  ];
}

export interface IExploreDataHookType extends IApiCallHookData {
  successResponseData: IExploreDataResponseType | undefined;
}

export type useExploreDataApi = [
  IExploreDataHookType,
  (requestObject: IApiCallConfig) => Promise<boolean>
];

const useExploreDataRequest = (): [
  IExploreDataHookType,
  () => Promise<boolean>
] => {
  const [apiResponse, makeApiCall] = useApiCall() as useExploreDataApi;

  const loadExploreScreenData = (): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: `${CONSTANT_retrieveGlobalData}?pageName=mobile_explore`
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [apiResponse, loadExploreScreenData];
};

export default useExploreDataRequest;
