import useApiCall, {
  IApiCallHookData,
  IApiCallConfig,
} from '../../../Services/networkRequests/hooks/useApiCall';
import {CONSTANT_loadPackagesSearchv2} from '../../../constants/apiUrls';
import generateUrlParams from '../../../Services/generateUrlParams/generateUrlParams';
import {IMobileServerResponse} from '../../../TypeInterfaces/INetworkResponse';
import {IPackageItinerary} from '../../../TypeInterfaces/IPackageItinerary';

export interface IPackageSearchResponse extends IMobileServerResponse {
  data: {
    dealItineraries: IPackageItinerary[];
    nonDealItineraries: IPackageItinerary[];
  };
}

export interface IPackageSearchHookType extends IApiCallHookData {
  successResponseData: IPackageSearchResponse | undefined;
}

export type useSearchPackagesApi = [
  IPackageSearchHookType,
  (requestObject: IApiCallConfig) => Promise<boolean>,
];

export interface ILoadRequestParams {
  searchString: string;
  limit: number;
  offset: number;
  abortController?: any;
}

const usePackagesSearchV2Api = (): [
  IPackageSearchHookType,
  (params: ILoadRequestParams) => Promise<boolean>,
] => {
  const [apiDetails, makeApiCall] = useApiCall() as useSearchPackagesApi;

  const loadSearchResults = (
    requestParams: ILoadRequestParams,
  ): Promise<boolean> => {
    const {abortController, ...otherParams} = requestParams;
    return new Promise<boolean>((resolve, reject) => {
      try {
        const result = makeApiCall({
          route: CONSTANT_loadPackagesSearchv2 + generateUrlParams(otherParams),
          abortController: abortController,
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [apiDetails, loadSearchResults];
};

export default usePackagesSearchV2Api;
