import useApiCall, {
  IApiCallHookData,
  IApiCallConfig
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_getPackagesDetails } from "../../../constants/apiUrls";
import { IPackageItinerary } from "../../../TypeInterfaces/IPackageItinerary";
import { ICampaignDetails } from "../../../TypeInterfaces/ICampaignDetails";
import { IMobileServerResponse } from "../../../TypeInterfaces/INetworkResponse";

export interface IPackageRequestBody {
  apiUrl?: string;
  key: string;
  limit?: number;
  interests?: string[];
  durations?: string[];
  budgets?: string[];
  hotelRatings?: string[];
}

export interface IPackageRequest {
  requestBody: IPackageRequestBody;
  abortController: any;
}

export interface IPackagesResponseData extends IMobileServerResponse {
  status: "SUCCESS";
  data: {
    campaignDetails: ICampaignDetails;
    filteredItineraries: IPackageItinerary[];
    testimonials: any;
    tripStartingPrice: number;
  };
}

export interface IPackageApiCallHookData extends IApiCallHookData {
  successResponseData: IPackagesResponseData | undefined;
}

export type packagesApiHookType = [
  IPackageApiCallHookData,
  (requestObject: IPackageRequest) => Promise<boolean>
];

export type usePackagesApiCallType = [
  IPackageApiCallHookData,
  (requestObject: IApiCallConfig) => Promise<boolean>
];

const usePackagesApi = (): packagesApiHookType => {
  const [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    makeApiCall
  ] = useApiCall() as usePackagesApiCallType;

  const loadPackages = ({
    requestBody,
    abortController
  }: IPackageRequest): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: requestBody.apiUrl || CONSTANT_getPackagesDetails,
          method: "POST",
          requestBody,
          abortController
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    loadPackages
  ];
};

export default usePackagesApi;
