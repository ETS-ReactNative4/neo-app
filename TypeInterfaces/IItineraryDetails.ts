export enum IRegion {
  SEA = "South East Asia",
  EUROPE = "Europe",
  ANZ = "Australia and Newzealand",
  VANILLA = "Islands",
  MIDDLE_EAST = "Middle East",
  SOUTH_AMERICA = "South America",
  NORTH_AMERICA = "North America",
  OTHERS = ""
}

export enum IMonth {
  JANUARY = "JANUARY",
  FEBRUARY = "FEBRUARY",
  MARCH = "MARCH",
  APRIL = "APRIL",
  MAY = "MAY",
  JUNE = "JUNE",
  JULY = "JULY",
  SEPTEMBER = "SEPTEMBER",
  AUGUST = "AUGUST",
  OCTOBER = "OCTOBER",
  NOVEMBER = "NOVEMBER",
  DECEMBER = "DECEMBER"
}

export interface ICountry {
  countryId: number;
  name: string;
}

export interface IDealCancellationInfo {
  title: string;
  refundAmt: number;
}

export interface IDealInfo {
  dealId: string;
  shortDesc: string;
  bannerLink: string[];
  slug: string;
  availableDates: string[];
  bookingDates: {
    start: string;
    end: string;
  };
  discountPercent: number;
  mealFAQ: boolean;
  paxFAQ: boolean;
  staticDeal: boolean;
  cancellationTimeLineList: IDealCancellationInfo[];
  allowedPassports?: string[];
}

export interface IItineraryDetails {
  itineraryId: string;
  departSlot: string;
  totalCost: string;
  oldTotalCost: string;
  netCost: string;
  regionCode: string;
  suggestedDepartureDate: string;
  uniqueId: string;
  regionName: string;
  specialImage: string;
  specialTitle: string;
  averageAmountIncrease: string;
  title: string;
  virtualAccountNumber: string;
  pricingVersion: number;
  nights: number;
  matchingPercentage: number;
  daysForTravel: number;
  bookingDateMillis: number;
  landPackage: boolean;
  costed: boolean;
  userUpdated: boolean;
  rcAvailable: boolean;
  cityWiseOrderMap: { [index: number]: number };
  staleCost: boolean;
  booking: boolean;
  shared: boolean;
  hidePackagedRate: boolean;
  packageRate: boolean;
  frozen: boolean;
  flightsBlocked: boolean;
  special: boolean;
  splitPricing: boolean;
  campaign: boolean;
  agent: boolean;
  notEdtiableByAnyone: boolean;
  occasion: string;
  region: IRegion;
  preferredMonth: IMonth;
  allCityKeys: string[];
  interests: string[];
  countries: ICountry[];
  discountedPrice: number;
  flightsBookedByUserAlready: boolean;
  strikedPrice: number;
  passengerDetailPresent: boolean;
  comfyScore: number;
  dealInfo?: IDealInfo;
}
