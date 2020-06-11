import useApiCall, {
  IApiCallHookData,
  IApiCallConfig
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_getDeals } from "../../../constants/apiUrls";
import { IDealsPackageItinerary } from "../../../TypeInterfaces/IPackageItinerary";
import { ICampaignDetails } from "../../../TypeInterfaces/ICampaignDetails";

export interface IDealsListingRequestBody {
  key: "deal/staycation";
  category: "staycation";
  budget?: string[];
  months?: number[];
  limit?: number;
  discount?: string[];
  sortBy?: "ASC" | "DESC";
  fieldToBeSorted?: "dealDiscountPercentage" | "cost";
}

export interface IDealsListingRequest {
  requestBody: IDealsListingRequestBody;
  abortController: any;
}

export interface IDealsListingResponseData {
  status: "SUCCESS";
  data: {
    campaignDetails: ICampaignDetails;
    filteredItineraries: IDealsPackageItinerary[];
  };
}

export interface IDealsListingApiCallHookData extends IApiCallHookData {
  successResponseData: IDealsListingResponseData | undefined;
}

export type dealsApiHookType = [
  IDealsListingApiCallHookData,
  (requestObject: IDealsListingRequest) => Promise<boolean>
];

export type useDealsApiCallType = [
  IDealsListingApiCallHookData,
  (requestObject: IApiCallConfig) => Promise<boolean>
];

const useDealsListingApi = (): dealsApiHookType => {
  const [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    makeApiCall
  ] = useApiCall() as useDealsApiCallType;

  const loadPackages = ({
    requestBody,
    abortController
  }: IDealsListingRequest): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: CONSTANT_getDeals,
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

export default useDealsListingApi;
