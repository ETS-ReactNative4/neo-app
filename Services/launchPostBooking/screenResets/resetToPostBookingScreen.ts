import { SCREEN_POST_BOOKING_HOME } from "../../../NavigatorsV2/ScreenNames";
import { CommonActions } from "@react-navigation/native";
import { navigationDispatcher } from "../../navigationService/navigationServiceV2";

/**
 * Resets the navigation stack to the post booking homepage
 *
 * This will take the user to the tripfeed.
 */
const resetToPostBookingScreen = () => {
  navigationDispatcher(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: SCREEN_POST_BOOKING_HOME
        }
      ]
    })
  );
};

export default resetToPostBookingScreen;
