import { CommonActions } from "@react-navigation/native";
import {
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_EXPLORE_TAB
} from "../../NavigatorsV2/ScreenNames";

/**
 * Returns a navigation config that can be dispatched by react navigation.
 * Lets users skip the user profile builder and land directly in the explore screen
 */
const skipUserProfileBuilder = () => {
  return CommonActions.reset({
    index: 0,
    routes: [
      {
        name: SCREEN_PRETRIP_HOME_TABS,
        state: {
          routes: [
            {
              name: SCREEN_EXPLORE_TAB,
              params: {}
            }
          ]
        }
      }
    ]
  });
};

export default skipUserProfileBuilder;
