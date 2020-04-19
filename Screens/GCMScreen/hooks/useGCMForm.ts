import { useState } from "react";
import { IPickerOption } from "../../../CommonComponents/Picker/Picker";

export interface IIndianCity {
  cityName: string;
  airportCode: string;
  popular: boolean;
  distance: number;
  countryCode: string | null;
}

export type HotelGuestRoomChildAgesType = "1 year" | "5 year";

export interface IHotelGuestRoomConfig {
  adultCount: number;
  childAges: HotelGuestRoomChildAgesType[];
}

export interface ICostingConfig {
  hotelGuestRoomConfigurations: IHotelGuestRoomConfig[];
  departureAirport: string; //"MAA";
  arrivalAirport: string; //"MAA";
  departureDate: string; //"12/Jan/2021";
  travelType: "SOLO"; // need enum
}

export interface ILeadSource {
  url: string;
  deviceType: "Mobile"; // need enum
  keyword: string;
  campaign: string;
  cpid: string | null;
  landingPage: string;
  lastRoute: string;
  prodType: "PACKAGES"; // need enum
}

export interface IGCMRequestBody {
  costingConfig: ICostingConfig;
  flightsBookedByUserAlready: boolean;
  itineraryId: string;
  costingType: "RECOST"; // need enum
  name: string;
  leadSource: ILeadSource;
}

export interface IGCMFormFields {
  departingFrom: IIndianCity | undefined;
  departingOn: Date;
  travellingAs: IPickerOption | undefined;
  roomDetails: IHotelGuestRoomConfig[];
}

export interface IGCMUpdateMethods {
  updateDepartingFrom: (option: IIndianCity) => void;
  updateDepartingOn: (date: Date) => void;
  updateTravellingAs: (option: IPickerOption) => void;
  updateRoomDetails: (room: IHotelGuestRoomConfig[]) => void;
}

export const travellingAsOptions: IPickerOption[] = [
  {
    text: "❤️ Couple",
    value: "Couple"
  },
  {
    text: "👪 Family",
    value: "Family"
  },
  {
    text: "🎉 Friends",
    value: "Friends"
  },
  {
    text: "😎 Solo",
    value: "Solo"
  }
];

const useGCMForm = (): [IGCMFormFields, IGCMUpdateMethods] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [departingFrom, setDepartingFrom] = useState<IIndianCity | undefined>(
    undefined
  );
  const [departingOn, setDepartingOn] = useState<Date>(tomorrow);
  const [travellingAs, setTravellingAs] = useState<IPickerOption | undefined>(
    undefined
  );
  const [roomDetails, setRoomDetails] = useState<IHotelGuestRoomConfig[]>([]);

  const updateDepartingFrom = (option: IIndianCity) => setDepartingFrom(option);
  const updateDepartingOn = (date: Date) => setDepartingOn(date);
  const updateTravellingAs = (option: IPickerOption) => setTravellingAs(option);
  const updateRoomDetails = (roomConfig: IHotelGuestRoomConfig[]) =>
    setRoomDetails(roomConfig);

  return [
    {
      departingFrom,
      departingOn,
      travellingAs,
      roomDetails
    },
    {
      updateDepartingFrom,
      updateDepartingOn,
      updateTravellingAs,
      updateRoomDetails
    }
  ];
};

export default useGCMForm;
