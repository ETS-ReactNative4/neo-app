import { ICityWithNights } from "./IBookedItinerary";
import { IExploreFeedLinks } from "../Screens/ExploreScreen/ExploreFeedType";

export interface IPackageMeta {
  title: string;
  description: string;
}

export type itineraryThemeType =
  | "ADVENTURE"
  | "ATTRACTION"
  | "CULTURE"
  | "LEISURE"
  | "NATURE"
  | "KID_FRIENDLY"
  | "BEACH"
  | "ART_AND_CULTURE"
  | "VISA_ON_ARRIVAL"
  | "HONEYMOON"
  | "FAMILY";

export const itineraryThemeEmojiMap: {
  [theme in itineraryThemeType]: string;
} = {
  ADVENTURE: "๐ฅ",
  ATTRACTION: "๐ฐ",
  CULTURE: "๐ญ",
  LEISURE: "๐น",
  NATURE: "๐ด",
  KID_FRIENDLY: "๐จโ๐ฉโ๐งโ๐ฆ",
  BEACH: "๐",
  ART_AND_CULTURE: "๐ญ",
  VISA_ON_ARRIVAL: "โ๏ธ",
  HONEYMOON: "๐",
  FAMILY: "๐จโ๐ฉโ๐งโ๐ฆ"
};

export interface IPackageItinerary {
  campaignItineraryId: string;
  type: string;
  image: string;
  title: string;
  destinationString: string;
  departureCity: string;
  departureAirport: string;
  itineraryCost: number;
  itineraryCostWithoutFlights: number;
  hotelStarRating: number;
  nights: number;
  slug: string;
  metadata: IPackageMeta;
  themes: itineraryThemeType[];
  tripType: string;
  regionName: string;
  regionCode: string;
  activities: string[];
  cityHotelStay: ICityWithNights[];
  flightsIncluded: boolean;
  hotelsIncluded: boolean;
  transferIncluded: boolean;
  visaIncluded: boolean;
  visaType: string;
  highDemand: boolean;
  googleRating: number;
  numBookings: number;
  deepLinking: IExploreFeedLinks;
}

export interface IDealsPackageItinerary {
  campaignItineraryId: string;
  type: "DEAL";
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
  themes: itineraryThemeType[];
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
