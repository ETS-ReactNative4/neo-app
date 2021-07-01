import { CommonActions } from "@react-navigation/native";
import {
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_EXPLORE_TAB,
  SCREEN_SAVED_ITINERARIES
} from "../../NavigatorsV2/ScreenNames";

const launchSavedItineraries = () => {
  return CommonActions.reset({
    index: 0,
    routes: [
      {
        name: SCREEN_PRETRIP_HOME_TABS,
        state: {
          routes: [
            {
              name: SCREEN_EXPLORE_TAB
            }
          ]
        }
      },

      {
        name: SCREEN_SAVED_ITINERARIES
      }
    ]
  });
};

export default launchSavedItineraries;
