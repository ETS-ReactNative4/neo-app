import useApiCall, {
  IApiCallHookData,
  IApiCallConfig
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_loadPackagesSearch } from "../../../constants/apiUrls";
import generateUrlParams from "../../../Services/generateUrlParams/generateUrlParams";
import { IMobileServerResponse } from "../../../TypeInterfaces/INetworkResponse";
import { IPackageItinerary } from "../../../TypeInterfaces/IPackageItinerary";

export interface IPackageSearchResponse extends IMobileServerResponse {
  data: IPackageItinerary[];
}

export interface IPackageSearchHookType extends IApiCallHookData {
  successResponseData: IPackageSearchResponse | undefined;
}

export type useSearchPackagesApi = [
  IPackageSearchHookType,
  (requestObject: IApiCallConfig) => Promise<boolean>
];

export interface ILoadRequestParams {
  searchString: string;
  limit: number;
  offset: number;
}

const usePackagesSearchApi = (): [
  IPackageSearchHookType,
  (params: ILoadRequestParams) => Promise<boolean>
] => {
  const [apiDetails, makeApiCall] = useApiCall() as useSearchPackagesApi;

  const loadSearchResults = (
    requestParams: ILoadRequestParams
  ): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const result = makeApiCall({
          route: CONSTANT_loadPackagesSearch + generateUrlParams(requestParams)
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [apiDetails, loadSearchResults];
};

export default usePackagesSearchApi;
