import { CommonActions } from "@react-navigation/native";
import { SCREEN_YOUR_BOOKINGS } from "../../NavigatorsV2/ScreenNames";

const launchItinerarySelector = () => {
  return CommonActions.reset({
    index: 0,
    routes: [
      {
        name: SCREEN_YOUR_BOOKINGS
      }
    ]
  });
};

export default launchItinerarySelector;
