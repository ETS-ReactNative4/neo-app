import useApiCall, {
  IApiCallHookData,
  IApiCallConfig,
} from '../../../Services/networkRequests/hooks/useApiCall';
import {CONSTANT_getHotelDeal} from '../../../constants/apiUrls';
import {IMobileServerResponse} from '../../../TypeInterfaces/INetworkResponse';
import {ICityWithNights} from '../../../TypeInterfaces/IBookedItinerary';
import {IExploreFeedLinks} from '../../ExploreScreen/ExploreFeedType';

export interface DealsPackageType {
  campaignItineraryId: string;
  type: 'DEAL';
  image: string;
  title: string;
  totalPAX: number;
  destinationString: string;
  departureCity: string;
  departureAirport: string;
  itineraryCost: number;
  strikedCost: number;
  itineraryCostWithoutFlights: number;
  hotelStarRating: number;
  nights: number;
  slug: string;
  tripType: string;
  regionName: string;
  regionCode: string;
  activities: string[];
  cityHotelStay: ICityWithNights[];
  flightsIncluded: boolean;
  hotelsIncluded: boolean;
  visaIncluded: boolean;
  visaType: string;
  highDemand: boolean;
  googleRating: number;
  numBookings: number;
  deepLinking: IExploreFeedLinks;
  dealDiscountPercentage: number;
  availableDates: string[];
  bookingDateRange: {
    start: string;
    end: string;
  };
}

export interface IHotelDealListResponseData extends IMobileServerResponse {
  status: 'SUCCESS';
  data: DealsPackageType[];
}

export interface IHotelDealApiCallHookData extends IApiCallHookData {
  successResponseData: IHotelDealListResponseData | undefined;
}

export type hotelDealApiHookType = [
  IHotelDealApiCallHookData,
  (planningToolId: number) => Promise<boolean>,
];

export type useHotelDealApiCallType = [
  IHotelDealApiCallHookData,
  (requestObject: IApiCallConfig) => Promise<boolean>,
];

const useHotelDealAPi = (): hotelDealApiHookType => {
  const [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    makeApiCall,
  ] = useApiCall() as useHotelDealApiCallType;

  const getHotelDeal = (planningToolId: number) => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: `${CONSTANT_getHotelDeal}${planningToolId}`,
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    getHotelDeal,
  ];
};

export default useHotelDealAPi;
