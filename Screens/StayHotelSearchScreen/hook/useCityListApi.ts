import useApiCall, {
  IApiCallHookData,
  IApiCallConfig,
} from '../../../Services/networkRequests/hooks/useApiCall';
import {
  CONSTANT_getCity,
  CONSTANT_getPackagesDetails,
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
  options: []
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

const useCityListApi = (): cityApiHookType => {
  const [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    makeApiCall,
  ] = useApiCall() as useCityApiCallType;

  const getCityList = () => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: CONSTANT_getCity,
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };
  if(successResponseData){
    const cityList = successResponseData.data.map(city => ({
      label: city.name,
      value: city.cityId,
    }))
    successResponseData.options = cityList
  }

  return [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    getCityList,
  ];
};

export default useCityListApi;
