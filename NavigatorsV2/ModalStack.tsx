import React from "react";
import {
  createStackNavigator,
  StackNavigationProp
} from "@react-navigation/stack";
import ListingPage from "../Screens/ListingPageScreen/ListingPage";
import {
  SCREEN_LISTING_PAGE,
  SCREEN_FLIGHT_VOUCHER,
  SCREEN_TRANSFER_VOUCHER,
  SCREEN_ACTIVITY_VOUCHER,
  SCREEN_HOTEL_VOUCHER,
  SCREEN_PASS_VOUCHER,
  SCREEN_CUSTOM_BLOCK_CARD_VOUCHER,
  SCREEN_RENTAL_CAR_VOUCHER,
  SCREEN_LEISURE,
  SCREEN_PDF_VIEWER,
  SCREEN_FEEDBACK_PROMPT,
  SCREEN_VISA_DOCUMENT_ACTION_SHEET,
  SCREEN_ACTION_SHEET
} from "./ScreenNames";
import { RouteProp } from "@react-navigation/native";
import FlightVoucher from "../Screens/VoucherScreens/FlightVoucherScreen/FlightVoucher";
import {
  IFlightCosting,
  ITransferCosting,
  IHotelCosting,
  IRentalCarCosting
} from "../TypeInterfaces/IItinerary";
import { IActivityCombinedInfo } from "../mobx/Itineraries";
import ActivityVoucher from "../Screens/VoucherScreens/ActivityVoucherScreen/ActivityVoucher";
import HotelVoucher from "../Screens/VoucherScreens/HotelVoucherScreen/HotelVoucher";
import TransferVoucher from "../Screens/VoucherScreens/TransferVoucherScreen/TransferVoucher";

export type ListingPageType = {
  slug?: string;
};

export type ModalNavigatorParamsType = {
  [SCREEN_LISTING_PAGE]: ListingPageType;
  [SCREEN_FLIGHT_VOUCHER]: {
    flight: IFlightCosting | {};
  };
  [SCREEN_TRANSFER_VOUCHER]: {
    transfer: ITransferCosting | {};
  };
  [SCREEN_ACTIVITY_VOUCHER]: {
    activity: IActivityCombinedInfo | {};
  };
  [SCREEN_HOTEL_VOUCHER]: {
    hotel: IHotelCosting | {};
  };
  [SCREEN_PASS_VOUCHER]: {};
  [SCREEN_CUSTOM_BLOCK_CARD_VOUCHER]: {};
  [SCREEN_RENTAL_CAR_VOUCHER]: {
    rentalCar: IRentalCarCosting | {};
  };
  [SCREEN_LEISURE]: {};
  [SCREEN_PDF_VIEWER]: {
    pdfUri: string;
  };
  [SCREEN_FEEDBACK_PROMPT]: {};
  [SCREEN_VISA_DOCUMENT_ACTION_SHEET]: {};
  [SCREEN_ACTION_SHEET]: {};
};

export type ModalStackNavigatorProps<
  T extends keyof ModalNavigatorParamsType
> = {
  navigation: StackNavigationProp<ModalNavigatorParamsType, T>;
  route: RouteProp<ModalNavigatorParamsType, T>;
};

/**
 * Data created to check if the screen is part of modal in the
 * resolveLinks function
 */
export const modalStackData: ModalNavigatorParamsType = {
  [SCREEN_LISTING_PAGE]: {},
  [SCREEN_FLIGHT_VOUCHER]: { flight: {} },
  [SCREEN_TRANSFER_VOUCHER]: {
    transfer: {}
  },
  [SCREEN_ACTIVITY_VOUCHER]: {
    activity: {}
  },
  [SCREEN_HOTEL_VOUCHER]: {
    hotel: {}
  },
  [SCREEN_PASS_VOUCHER]: {},
  [SCREEN_CUSTOM_BLOCK_CARD_VOUCHER]: {},
  [SCREEN_RENTAL_CAR_VOUCHER]: {
    rentalCar: {}
  },
  [SCREEN_LEISURE]: {},
  [SCREEN_PDF_VIEWER]: {
    pdfUri: ""
  },
  [SCREEN_FEEDBACK_PROMPT]: {},
  [SCREEN_VISA_DOCUMENT_ACTION_SHEET]: {},
  [SCREEN_ACTION_SHEET]: {}
};

const Stack = createStackNavigator<ModalNavigatorParamsType>();

const { Navigator, Screen } = Stack;

const ModalStack = () => {
  return (
    <Navigator headerMode="none">
      <Screen name={SCREEN_LISTING_PAGE} component={ListingPage} />
      <Screen name={SCREEN_FLIGHT_VOUCHER} component={FlightVoucher} />
      <Screen name={SCREEN_ACTIVITY_VOUCHER} component={ActivityVoucher} />
      <Screen name={SCREEN_HOTEL_VOUCHER} component={HotelVoucher} />
      <Screen name={SCREEN_TRANSFER_VOUCHER} component={TransferVoucher} />
    </Navigator>
  );
};

export default ModalStack;
