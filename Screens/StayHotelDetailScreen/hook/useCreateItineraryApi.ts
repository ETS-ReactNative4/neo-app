import useApiCall, {
  IApiCallHookData,
  IApiCallConfig,
} from '../../../Services/networkRequests/hooks/useApiCall';
import {
  CONSTANT_createItinerary,
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

const useCreateItineraryApi = (requestBody): cityApiHookType => {
  const [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    makeApiCall,
  ] = useApiCall() as useCityApiCallType;

  const createItinerary = () => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: CONSTANT_createItinerary,
          method: 'POST',
          requestBody: requestBody || {
            "entity": "HOTELS",
            "searchIdentifier": "60953bc4612cae0001cd549e",
            "identifier": "309805EXPEDIA_RAPID_STANDALONE",
            "sourceProvider": "EXPEDIA_RAPID_STANDALONE",
            "subIdentifiers": [
              "314061467_381678817_0"
            ],
            "costingConfig": {
                "departureAirport": "$$$",
                "arrivalAirport": "$$$",
                "departureDate": "27/May/2021",
                "hotelGuestRoomConfigurations": [
                    {
                        "adultCount": 2,
                        "childAges": []
                    }
                ],
                "nights": "3",
                "nationality": "IN"
            }
        }
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    createItinerary,
  ];
};

export default useCreateItineraryApi;
