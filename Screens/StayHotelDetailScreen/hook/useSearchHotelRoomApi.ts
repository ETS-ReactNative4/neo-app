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
import constants from '../../../constants/constants';
import _orderBy from 'lodash/orderBy'
import _groupBy from 'lodash/groupBy'

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

const useSearchHotelRoomApi = (): cityApiHookType => {
  const [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    makeApiCall,
  ] = useApiCall() as useCityApiCallType;

  const searchHotelRoom = (requestBody) => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: constants.getHotelRoom,
          method: 'POST',
          requestBody: requestBody 
        });
        console.log('in res', successResponseData)
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };
  console.log('successResponseData room-->',successResponseData)
  if(!isError && successResponseData?.data){
 
    const { data } = successResponseData ?? {}
    const roomData = [...data.roomCostingVOList, data.currentRoomCostingVO]
    const orderedRoomData = _orderBy(roomData, ['ourCost'], ['asc'])
    const roomGroupData = _groupBy(orderedRoomData, room => room.name)
    successResponseData.roomsData = roomGroupData
  }
 
  return [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    searchHotelRoom,
  ];
};

export default useSearchHotelRoomApi;
