import { CommonActions } from "@react-navigation/native";
import { SCREEN_POST_BOOKING_HOME } from "../../NavigatorsV2/ScreenNames";

const launchPostBookingV2 = () => {
  return CommonActions.reset({
    index: 0,
    routes: [
      {
        name: SCREEN_POST_BOOKING_HOME
      }
    ]
  });
};

export default launchPostBookingV2;
