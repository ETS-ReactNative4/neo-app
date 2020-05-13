import { CommonActions } from "@react-navigation/native";
import { SCREEN_STARTER } from "../../../NavigatorsV2/ScreenNames";

/**
 * Returns a navigation config that can be dispatched by react navigation.
 * Resets entire navigation stack & Opens PreTrip Home page
 */
const logOutAction = () => {
  return CommonActions.reset({
    index: 0,
    routes: [
      {
        name: SCREEN_STARTER
      }
    ]
  });
};

export default logOutAction;
