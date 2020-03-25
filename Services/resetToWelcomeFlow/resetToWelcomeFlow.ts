import { CommonActions } from "@react-navigation/native";
import { SCREEN_TRAVEL_PROFILE_WELCOME } from "../../NavigatorsV2/ScreenNames";

const resetToWelcomeFlow = () => {
  return CommonActions.reset({
    index: 0,
    routes: [
      {
        name: SCREEN_TRAVEL_PROFILE_WELCOME
      }
    ]
  });
};

export default resetToWelcomeFlow;
