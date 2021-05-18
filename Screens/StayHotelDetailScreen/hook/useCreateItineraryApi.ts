import useApiCall, {
  IApiCallHookData,
  IApiCallConfig,
} from '../../../Services/networkRequests/hooks/useApiCall';
import {CONSTANT_createItinerary} from '../../../constants/apiUrls';
import {IMobileServerResponse} from '../../../TypeInterfaces/INetworkResponse';
import {StayHotelRoomConfigurationType} from '../../StayHotelSearchScreen/StayHotelSearchScreen';
import {IItinerary} from '../../../TypeInterfaces/IItinerary';
export interface CreateItineraryResponseType extends IMobileServerResponse {
  status: 'SUCCESS';
  data: IItinerary;
  displayCurrency: string;
}

type CostingConfigType = {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  hotelGuestRoomConfigurations: StayHotelRoomConfigurationType[];
  nights: number;
};
export interface CreateItineraryRequestType {
  entity: string;
  searchIdentifier: string;
  identifier: string;
  sourceProvider: string;
  subIdentifiers: string[];
  costingConfig: CostingConfigType;
}
export interface ICreateItineraryApiCallHookData extends IApiCallHookData {
  successResponseData: CreateItineraryResponseType | undefined;
}

export type createItineraryApiHookType = [
  ICreateItineraryApiCallHookData,
  (requestObject: CreateItineraryRequestType) => Promise<boolean>,
];

export type useCreateItineraryApiCallType = [
  ICreateItineraryApiCallHookData,
  (requestObject: IApiCallConfig) => Promise<boolean>,
];

const useCreateItineraryApi = (): createItineraryApiHookType => {
  const [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    makeApiCall,
  ] = useApiCall() as useCreateItineraryApiCallType;

  const createItinerary = (requestBody = {}) => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: CONSTANT_createItinerary,
          method: 'POST',
          requestBody,
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
