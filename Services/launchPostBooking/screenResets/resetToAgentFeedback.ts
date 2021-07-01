import { navigationDispatcher } from "../../navigationService/navigationServiceV2";
import { CommonActions } from "@react-navigation/native";
import { SCREEN_AGENT_FEEDBACK } from "../../../NavigatorsV2/ScreenNames";

/**
 * Resets the application stack in such a way that
 * agent feedback is the first screen.
 */
const resetToAgentFeedback = () => {
  navigationDispatcher(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: SCREEN_AGENT_FEEDBACK
        }
      ]
    })
  );
};

export default resetToAgentFeedback;
