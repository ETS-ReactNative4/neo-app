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
  | "ART_AND_CULTURE";

export const itineraryThemeEmojiMap: {
  [theme in itineraryThemeType]: string;
} = {
  ADVENTURE: "🔥",
  ATTRACTION: "🏰",
  CULTURE: "🎭",
  LEISURE: "🍹",
  NATURE: "🌴",
  KID_FRIENDLY: "👨‍👩‍👧‍👦",
  BEACH: "🏖",
  ART_AND_CULTURE: "🎭"
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
