import { ILocationDetail } from "../Services/deepLink/deepLink";
import { IExploreFeedLinks } from "../Screens/ExploreScreen/ExploreFeedType";

export interface ICityWithNights {
  cityId: number;
  cityName: string;
  countryName: string;
  hotelId: number;
  nights: number;
  roomIdentifierList: string[];
  sourceProvider: string;
}

export interface IBookedItinerary {
  itineraryId: string;
  image: string;
  cost: string;
  bookedOn: number;
  travellingOn: number;
  departueAirport: string; // PT TODO: This is a type in key - not sure how big of an impact it has on BE
  departureCity: string;
  nights: number;
  countriesList: string[];
  selfBooker: boolean;
  bookedBy: string;
  customizations: number;
  cities: ICityWithNights[];
  type: string;
  itineraryText: string;
  location: ILocationDetail;
  region: string;
  deepLinking: IExploreFeedLinks;
}
