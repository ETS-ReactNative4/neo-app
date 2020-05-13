import { useState, useEffect } from "react";
import { IPickerOption } from "../../../CommonComponents/Picker/Picker";
import moment from "moment";
import { CONSTANT_costingDateFormat } from "../../../constants/styles";
import apiCall from "../../../Services/networkRequests/apiCall";
import { CONSTANT_getIndianCities } from "../../../constants/apiUrls";
import { CONSTANT_responseSuccessStatus } from "../../../constants/stringConstants";
import { ICitiesListSuccessResponse } from "../../GCMCityPickerScreen/hooks/useGetIndianCities";
import { ILeadSource } from "../../AppLoginScreen/hooks/useRegisterUserApi";

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

export type travelType = "SOLO" | "COUPLE" | "FAMILY" | "FRIENDS";

export interface ICostingConfig {
  hotelGuestRoomConfigurations: IHotelGuestRoomConfig[];
  departureAirport: string; //"MAA";
  arrivalAirport: string; //"MAA";
  departureDate: string; //"12/Jan/2021";
  tripType: travelType;
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
  travellingAs: ITravellingAsPickerOption | undefined;
  roomDetails: IHotelGuestRoomConfig[];
}

export interface IGCMUpdateMethods {
  updateDepartingFrom: (option: IIndianCity) => void;
  updateDepartingOn: (date: Date) => void;
  updateTravellingAs: (option: IPickerOption) => void;
  updateRoomDetails: (room: IHotelGuestRoomConfig[]) => void;
}

export interface ITravellingAsPickerOption extends IPickerOption {
  value: travelType;
}

export const travellingAsOptions: ITravellingAsPickerOption[] = [
  {
    text: "❤️ Couple",
    value: "COUPLE"
  },
  {
    text: "👪 Family",
    value: "FAMILY"
  },
  {
    text: "🎉 Friends",
    value: "FRIENDS"
  },
  {
    text: "😎 Solo",
    value: "SOLO"
  }
];

export const preDefinedRoomConfig: {
  [index: string]: IHotelGuestRoomConfig[];
} = {
  COUPLE: [
    {
      adultCount: 2,
      childAges: []
    }
  ],
  SOLO: [{ adultCount: 1, childAges: [] }]
};

const useGCMForm = (
  costingConfig: ICostingConfig | null
): [IGCMFormFields, IGCMUpdateMethods] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [departingFrom, setDepartingFrom] = useState<IIndianCity | undefined>(
    undefined
  );
  const [departingOn, setDepartingOn] = useState<Date>(tomorrow);
  const [travellingAs, setTravellingAs] = useState<
    ITravellingAsPickerOption | undefined
  >(undefined);
  const [roomDetails, setRoomDetails] = useState<IHotelGuestRoomConfig[]>([]);

  const updateDepartingFrom = (option: IIndianCity) => setDepartingFrom(option);
  const updateDepartingOn = (date: Date) => setDepartingOn(date);
  const updateTravellingAs = (option: ITravellingAsPickerOption) => {
    setTravellingAs(option);
    if (preDefinedRoomConfig[option.value]) {
      setRoomDetails(preDefinedRoomConfig[option.value]);
    }
  };
  const updateRoomDetails = (roomConfig: IHotelGuestRoomConfig[]) =>
    setRoomDetails(roomConfig);

  useEffect(() => {
    if (costingConfig) {
      apiCall(CONSTANT_getIndianCities, {}, "GET")
        .then((response: ICitiesListSuccessResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            setDepartingFrom(
              response.data.find(
                item => item.airportCode === costingConfig.departureAirport
              )
            );
          }
        })
        .catch(() => null);

      setDepartingOn(
        moment(costingConfig.departureDate, CONSTANT_costingDateFormat).toDate()
      );
      const travellingAsTarget = travellingAsOptions.find(
        item => item.value === costingConfig.tripType
      );
      if (travellingAsTarget) {
        setTravellingAs(travellingAsTarget);
      }
      setRoomDetails(costingConfig.hotelGuestRoomConfigurations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
