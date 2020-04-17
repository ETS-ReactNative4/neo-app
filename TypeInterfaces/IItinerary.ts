import { IItineraryDetails, IMonth } from "./IItineraryDetails";
import { ICustomCostings } from "./ICustomCostings";

export enum IItineraryVersion {
  SPEEDBOAT = "SPEEDBOAT",
  SANDUNE = "SANDUNE",
  WORLDCUP_T20_WOMEN = "WORLDCUP_T20_WOMEN",
  WORLDCUP_T20_MEN = "WORLDCUP_T20_MEN"
}

export enum IDiffChangeType {
  PRICEINCREASE = "PRICEINCREASE",
  PRICEDECREASE = "PRICEDECREASE",
  ELEMENTCHANGE = "ELEMENTCHANGE",
  NOTAPPLICABLE = "NOTAPPLICABLE",
  NONE = "NONE"
}

export interface ICostDiff {
  percentage: number;
  diffCost: number;
  diffChangeType: IDiffChangeType;
}

export enum IGeneralCostingStatus {
  SUCCESS = "SUCCESS",
  USER_REMOVED = "USER_REMOVED",
  NOT_COSTED = "NOT_COSTED",
  ERROR = "ERROR",
  UNAVAILABLE = "UNAVAILABLE",
  BLOCKED = "BLOCKED",
  SOLD_OUT = "SOLD_OUT",
  ROOM_SOLD_OUT = "ROOM_SOLD_OUT"
}

export interface IRateMatchInfo {
  appliedBy: string;
  discount: number;
  source: string;
  reason: string;
  approvedBy: string;
  timestampMillis: number;
  retainCancellationPolicy: boolean;
}

export interface IAbstractCosting {
  configKey: string;

  status: IGeneralCostingStatus;

  ourCost: string;

  publishedCost: string;

  itineraryId: string;

  identifier: string;

  diff: ICostDiff;

  refundable: boolean;

  rateMatches: IRateMatchInfo[];

  costingId: string;

  voucher?: any; // TODO: Define proper voucher types
}

export interface IAbstractCostingValue {
  totalPublishedCost: string;
  totalOurCost: string;
  totalDiff: string;
}

export interface IFlightRoute {
  depMonth: string;
  depDateOfMonth: string;
  departureTime: string;
  arrMonth: string;
  arrDateOfMonth: string;
  arrivalTime: string;
}

export interface IFlightRouteConfig {
  routes: IFlightRoute[];
}

export interface IFlightCosting extends IAbstractCosting {
  dbFlightId: string;
  airlineCode: string;
  text: string;
  allTrips: string[];
  trips: { [index: string]: IFlightRouteConfig };
}

export interface IFlightCostingValue extends IAbstractCostingValue {
  costingById: { [index: string]: IFlightCosting };
}

export interface IActivityCosting extends IAbstractCosting {
  activityId: string;
  activityCostingId: string;
  dateMillis: number;
  day: string;
  mon: string;
}

export interface IActivityCostingValue extends IAbstractCostingValue {
  costingById: { [index: string]: IActivityCosting };
}

export interface ITransferCosting extends IAbstractCosting {
  vehicle: string;
  type: string;
  pickup: string;
  drop: string;
  text: string;
  dateMillis: number;
  departureTime: string;
  arrivalTime: string;
}

export interface ITransferCostingValue extends IAbstractCostingValue {
  costingById: { [index: string]: ITransferCosting };
}

export interface ITrainCosting extends IAbstractCosting {
  dateMillis: number;
  text: string;
  day: string;
  mon: string;
}

export interface ITrainCostingValue extends IAbstractCostingValue {
  costingById: { [index: string]: ITrainCosting };
}

export interface IFerryCosting extends IAbstractCosting {
  dateMillis: number;
  day: string;
  mon: string;
  text: string;
}

export interface IFerryCostingValue extends IAbstractCostingValue {
  costingById: { [index: string]: IFerryCosting };
}

export interface IRentalCarCosting extends IAbstractCosting {
  rcCostingId: string;
  dbRef: string;
  drop: string;
  pDateMillis: number;
  day: string;
  mon: string;
  vehicle: string;
  type: string;
  pickup: string;
}

export interface IRentalCarCostingValue extends IAbstractCostingValue {
  costingById: { [index: string]: IRentalCarCosting };
}

export interface IRoomMealOptions {
  selected: boolean;
  mealCodeDisplayText: string;
}

export interface IRoomsInHotel {
  name: string;
  roomImages: string[];
  freeBreakfast: boolean;
  freeWireless: boolean;
  roomConfiguration: IHotelGuestRoomConfiguration;
  roomTypeId: string;
  mealOptions: IRoomMealOptions[];
}

export interface IAmenityDisplayList {
  iconUrl: string;
  amenityName: string;
}

export interface IHotelCosting extends IAbstractCosting {
  // TODO: Add detailed type definitions
  checkInTs: number;
  checkInDate: string;
  checkOutDate: string;
  name: string;
  roomsInHotel: IRoomsInHotel[];
  amenityDisplayList: IAmenityDisplayList[];
  imageURL: string;
  mobile: string;
  lat: number;
  lon: number;
}

export interface IHotelCostingValue extends IAbstractCostingValue {
  costingById: { [index: string]: IHotelCosting };
}

export interface IVisaCosting extends IAbstractCosting {}

export interface IVisaCostingValue extends IAbstractCostingValue {
  costingById: { [index: string]: IVisaCosting };
}

export interface IInsuranceCosting extends IAbstractCosting {
  plan: string;
}

export interface IInsuranceCostingValue extends IAbstractCostingValue {
  costingById: { [index: string]: IInsuranceCosting };
}

export interface IPassCosting extends IAbstractCosting {}

export interface IPassCostingValue extends IAbstractCostingValue {
  costingById: { [index: string]: IPassCosting };
}

export enum ICommuteMode {
  CAR = "Car",
  FLIGHT = "Flight",
  TRAIN = "Train",
  FERRY = "Ferry",
  BUS = "Bus",
  RENTALCAR = "Rental Car",
  SHUTTLE = "Shuttle",
  MINIVAN = "Mini van",
  MINIBUS = "Mini bus",
  SELF = "Self",
  UNKNOWN = "Unknown",
  BOAT = "Boat"
}

export interface ICityValue {
  nights: number;
  cityId: number;
  transferSlot: string;
  hotelRefKey: string[];
  allDayKeys: string[];
  showRcTag: boolean;
  rcText: string;
  passId: number;
  mode: ICommuteMode;
  travelTime: number;
}

export enum ITimeOfDay {
  MORNING = 1,
  NOON = 2,
  EVENING = 3,
  NIGHT = 4
}

export enum ISlotActionType {
  ACTIVITY = "ACTIVITY",
  ACTIVITY_WITH_TRANSFER = "ACTIVITY_WITH_TRANSFER",
  LEISURE = "LEISURE",
  INTERCITY_TRANSFER = "INTERCITY_TRANSFER",
  INTERNATIONAL_ARRIVE = "INTERNATIONAL_ARRIVE",
  INTERNATIONAL_DEPART = "INTERNATIONAL_DEPART"
}

export interface IActivitySlotDetail {
  activityId: number;

  intercityTransferIncluded: boolean;

  activityCostingIdentifier: string;
}

export interface IItinerarySlot {
  slotIdentifier: string;

  slotName: ITimeOfDay;

  slotSpan: number;

  slotNameDisplay: string;

  slotType: ISlotActionType;

  slotText: string;

  rcPickup: boolean;

  rcDrop: boolean;

  activitySlotDetail: IActivitySlotDetail;

  happensInPreviousCity: boolean;
}

export interface IActivitySlotDetail {
  activityId: number;
  intercityTransferIncluded: boolean;
}

export interface IIterSlotByKey {
  // TODO: Requires detailed type definition
  name: string;
  type: string;
  activitySlotDetail: IActivitySlotDetail;
  intercityTransferSlotDetailVO: {
    directTransferDetail: {
      transferMode: string;
      transferCostingIdenfier: string;
      transferIndicatorText: string;
      slotText: string;
    };
    fromCity: number;
    toCity: number;
    transferType: string;
    transitTransferDetail: {
      arriveTransit: {
        transitMode: string;
        transferCostingIdenfier: string;
      };
      transferIndicatorText: string;
    };
  };
  arrivalSlotDetail: {
    transferIndicatorText: string;
    flightCostingKey: string;
    slotText: string;
  };
  leisureSlotDetail: {
    text: string;
  };
  departureSlotDetail: {
    slotText: string;
  };
}

export interface IItineraryDay {
  dayIdentifer: string;

  dayNum: number;

  date: string;

  hasRC: boolean;

  slots: IItinerarySlot[];

  // TODO: Verify the type definition for items below
  allSlotKeys: string[];
  dayTs: number;
  day: string;
  mon: string;
}

export interface ICity {
  cityId: number;

  cityName: string;

  airportCode: string;

  numberOfNights: number;

  alternateCitiesString: string;

  image: string;

  internationalAirportRank: number;

  europeAirportRank: number;

  latitude: number;

  longitude: number;

  cityImages: string[];
}

export interface ISelectedTourGrade {
  inclusion: string;
  exclusion: string;
  departureTime: string;
  transferType: string;
}

export interface IStartingPointDetails {
  image: string;
}

export interface IActivityDetail {
  mainPhoto: string;
  title: string;
  longDesc: string;
  latitude: number;
  longitude: number;
  free: boolean;
  selectedTourGrade: ISelectedTourGrade;
  startingPointDetails: IStartingPointDetails;
  planningToolId: number;
}

export interface IMiscellaneousCosting {
  type: string; // TODO: Replace with proper enum
  cost: string;
  description: string;
}

export interface IMiscellaneousCostingValue {
  totalMiscellaneousCost: string;
  miscellaneousCostings: IMiscellaneousCosting[];
}

export interface ISummary {
  inclusions: string[];
  exclusions: string[];
  complimentaryServices: string[];
  discounts: string;
  agentDiscounts: string;
  savings: string;
  totalCost: string;
  recommendedPayment: any; // TODO: Add Proper Interface
}

export enum ICouponPartner {
  CRED = "CRED"
}

export interface ICoupon {
  couponPartner: ICouponPartner;
  couponCode: string;
  isCouponApplied: boolean;
  validationMessage: string;
}

export enum ITripType {
  Honeymoon = "Honeymoon",
  Family = "Family",
  Friends = "Friends",
  Solo = "Solo",
  Couple = "Couple",
  Group = "Group",
  Unknown = "Unknown",
  ANNIVERSARY = "ANNIVERSARY",
  HONEYMOON = "HONEYMOON",
  BIRTHDAY = "BIRTHDAY",
  SUMMER_VACATION = "SUMMER_VACATION",
  SOLO = "SOLO",
  FRIENDS = "FRIENDS",
  CO_WORKERS = "CO_WORKERS",
  FAMILY = "FAMILY",
  COUPLE = "COUPLE"
}

export interface IHotelGuestRoomConfiguration {
  adultCount: number;
  childAges: number[];
}

export interface ITravellerInfo {
  type: string;
  travelPurpose: string;
  details: string;
}

export interface ICostingConfiguration {
  departureAirport: string;

  arrivalAirport: string;

  departureDate: string;

  departureDateMillis: number;

  returnDateMillis: number;

  hotelGuestRoomConfigurations: IHotelGuestRoomConfiguration[];

  preferredMonth: IMonth;

  tripType: ITripType;
}

export interface ITotalDiff {
  changeType: IDiffChangeType;

  totalDiff: number;
}

export interface IMiscellaneousText {
  transitVisaText: string;
}

export interface IPaymentOption {
  paymentCode: any; // TODO: Replace with proper enum
  fee: number;
}

export interface IPaymentScheduleDetail {
  paymentOptions: IPaymentOption[];
  itineraryId: string;
  itineraryTotalCost: string;
  totalPaid: string;
  totalPending: string;
  paymentEnvironmentType: string;
}

export interface IItinerary {
  version: IItineraryVersion;
  itinerary: IItineraryDetails;

  iterCityByKey: { [index: string]: ICityValue };
  iterDayByKey: { [index: string]: IItineraryDay };
  iterSlotByKey: { [index: string]: IIterSlotByKey }; // TODO: Add Proper Interface
  cityById: { [index: number]: ICity };
  activityById: { [index: number]: IActivityDetail };

  flightCostings: IFlightCostingValue;
  activityCostings: IActivityCostingValue;
  transferCostings: ITransferCostingValue;
  trainCostings: ITrainCostingValue;
  ferryCostings: IFerryCostingValue;
  rentalCarCostings: IRentalCarCostingValue;
  hotelCostings: IHotelCostingValue;
  visaCostings: IVisaCostingValue;
  insuranceCosting: IInsuranceCostingValue;
  passCostings: IPassCostingValue;
  miscellaneousCostings: IMiscellaneousCostingValue;
  summary: ISummary;
  couponVO: ICoupon;
  allFlightCostingRefs: string[];
  allHotelCostingRefs: string[];
  allTransferCostingRefs: string[];
  allTrainCostingRefs: string[];
  allFerryCostingRefs: string[];
  allVisaCostingRefs: string[];
  allInsuranceCostingRefs: string[];
  allActivityCostingRefs: string[];
  allPassCostingRefs: string[];
  allRentalCostingRefs: string[];
  costingConfiguration: ICostingConfiguration;
  totalDiff: ITotalDiff;
  otherTexts: IMiscellaneousText;
  allAlerts: any; // TODO: Add Proper Interface
  paymentSchedule: IPaymentScheduleDetail;
  currency: string[];
  travellerInfo: ITravellerInfo;
  itineraryInclusions: string[];
  festivals: { [index: string]: string }[];
  customCostings: ICustomCostings[];
}
