import useApiCall, {
  IApiCallHookData,
  IApiCallConfig,
} from '../../../Services/networkRequests/hooks/useApiCall';
import {
  CONSTANT_coupon_apply,
  CONSTANT_coupon_remove,
  CONSTANT_createItinerary,
  CONSTANT_getCity,
  CONSTANT_getPackagesDetails,
  CONSTANT_loyalty_apply,
  CONSTANT_savePassengers,
} from '../../../constants/apiUrls';
import {IDealsPackageItinerary} from '../../../TypeInterfaces/IPackageItinerary';
import {ICampaignDetails} from '../../../TypeInterfaces/ICampaignDetails';
import {IMobileServerResponse} from '../../../TypeInterfaces/INetworkResponse';

interface CityDataType {
  airportCode: string;
  airportName: string | null;
  cityId: number;
  country: string;
  countryCode: string;
  name: string;
}

export interface ICityListResponseData extends IMobileServerResponse {
  status: 'SUCCESS';
  data: CityDataType[];
  options: [];
}

export interface ICityListApiCallHookData extends IApiCallHookData {
  successResponseData: ICityListResponseData | undefined;
}

export type cityApiHookType = [
  ICityListApiCallHookData,
  (requestObject: IApiCallConfig) => Promise<boolean>,
];

export type useCityApiCallType = [
  ICityListApiCallHookData,
  (requestObject: IApiCallConfig) => Promise<boolean>,
];

const useLoayltyCreditApi = (requestBody): cityApiHookType => {
  const [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    makeApiCall,
  ] = useApiCall() as useCityApiCallType;

  const applyCredit = ({
    coupon,
    itineraryId,
  }: {
    coupon: string;
    itineraryId: string;
  }) => {
    return new Promise<boolean>(async (resolve, reject) => {
      const url = coupon
        ? CONSTANT_loyalty_apply({coupon, itineraryId})
        : CONSTANT_coupon_remove({itineraryId});

      const method =  coupon ? 'POST' : 'DELETE'
      try {
        const result = await makeApiCall({
          route: url,
          method,
          requestBody: {},
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    applyCredit,
  ];
};

export default useLoayltyCreditApi;
