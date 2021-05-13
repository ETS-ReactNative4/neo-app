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
import _orderBy from 'lodash/orderBy';
import _groupBy from 'lodash/groupBy';
import {RoomDataType} from '../StayHotelDetailScreen';

export interface SearchHotelRoomResponseType extends IMobileServerResponse {
  status: 'SUCCESS';
  data: {roomCostingVOList: RoomDataType[]; currentRoomCostingVO: RoomDataType};
  roomsData: {};
}

export interface SearchHotelRoomApiCallHookData extends IApiCallHookData {
  successResponseData: SearchHotelRoomResponseType | undefined;
}
export type SearchHotelRoomRequestType = {
  entity: string;
  searchIdentifier: string;
  identifier: string;
  sourceProvider: string;
  subIdentifiers: string[];
};

export type SearchHotelRoomApiHookType = [
  SearchHotelRoomApiCallHookData,
  (requestObject: SearchHotelRoomRequestType) => Promise<boolean>,
];

export type useCityApiCallType = [
  SearchHotelRoomApiCallHookData,
  (requestObject: IApiCallConfig) => Promise<boolean>,
];

const useSearchHotelRoomApi = (): SearchHotelRoomApiHookType => {
  const [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    makeApiCall,
  ] = useApiCall() as useCityApiCallType;

  const searchHotelRoom = (requestBody = {}) => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: constants.getHotelRoom,
          method: 'POST',
          requestBody: requestBody,
        });

        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  if (!isError && successResponseData?.data) {
    const {data} = successResponseData ?? {};
    const roomData = [...data.roomCostingVOList, data.currentRoomCostingVO];
    const orderedRoomData = _orderBy(roomData, ['ourCost'], ['asc']);
    const roomGroupData = _groupBy(orderedRoomData, room => room.name);
    successResponseData.roomsData = roomGroupData;
  }

  return [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    searchHotelRoom,
  ];
};

export default useSearchHotelRoomApi;
