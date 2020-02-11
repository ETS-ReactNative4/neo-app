import storeService from "../storeService/storeService";
import { NavigationStackProp } from "react-navigation-stack";
import { NavigationActions } from "react-navigation";
import { logError } from "../errorLogger/errorLogger";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import {
  CONSTANT_postBookingLoadFailureText,
  CONSTANT_openSOFeedbackLoadFailureText,
  CONSTANT_openOPSIntroLoadFailureText
} from "../../constants/appText";
import { IMobileServerResponse } from "../../TypeInterfaces/INetworkResponse";
import resetToPostBookingIntro from "./screenResets/resetToPostBookingIntro";
import resetToAgentInfo from "./screenResets/resetToAgentInfo";
import resetToAgentFeedback from "./screenResets/resetToAgentFeedback";
import resetToPostBookingScreen from "./screenResets/resetToPostBookingScreen";

enum routeNameType {
  YourBookings = "YourBookings",
  YourBookingsUniversal = "YourBookingsUniversal",
  MobileNumber = "MobileNumber"
}

export interface ISOInfo {
  itineraryId: string;
  ownerName: string;
  imageUrl: string;
}

export interface ISOInfoResponse extends IMobileServerResponse {
  data: ISOInfo;
}

const openPostBookingScreen = (
  routeName: routeNameType,
  navigation: NavigationStackProp<any>
) => {
  if (["YourBookings", "MobileNumber"].indexOf(routeName) > -1) {
    navigation.dispatch(
      NavigationActions.navigate({
        routeName: "AppHome",
        action: NavigationActions.navigate({ routeName: "BookedItineraryTabs" })
      })
    );
  } else if (routeName === "YourBookingsUniversal") {
    navigation.navigate("BookedItineraryTabs");
  } else {
    logError("Unexpected route to launch Post Booking flow");
    DebouncedAlert(
      CONSTANT_postBookingLoadFailureText.header,
      CONSTANT_postBookingLoadFailureText.invalidRoute
    );
  }
};

/**
 * Will Launch the post booking flow for the user
 * Should be called only after user has selected an itinerary.
 */
const launchPostBooking = (
  routeName: routeNameType,
  navigation: NavigationStackProp<any>,
  selectedItineraryId: string
) => {
  return new Promise<boolean>((resolve, reject) => {
    storeService.userFlowTransitionStore
      .loadUserTransitionStatus(selectedItineraryId)
      .then(transitionStatus => {
        storeService.appState.setTripMode(true);

        if (!transitionStatus.seenPostBookingIntro) {
          resetToPostBookingIntro(navigation);
        } else if (!transitionStatus.completedSOFeedback) {
          resetToAgentFeedback(navigation);
        } else if (!transitionStatus.seenOpsIntro) {
          resetToAgentInfo(navigation, selectedItineraryId);
        } else {
          openPostBookingScreen(routeName, navigation);
        }
        resolve(true);
      })
      .catch(err => {
        logError("Unable to load user transition status", { err });
        DebouncedAlert(
          CONSTANT_postBookingLoadFailureText.header,
          CONSTANT_postBookingLoadFailureText.message
        );
        reject();
      });
  });
};

/**
 * From the Post Booking intro screen, this will help
 * transitioning user to the SO Feedback screen.
 */
export const openSOFeedback = (
  navigation: NavigationStackProp<any>,
  selectedItineraryId: string
) => {
  return new Promise<boolean>((resolve, reject) => {
    storeService.userFlowTransitionStore
      .userSeenPostBookingIntro(selectedItineraryId)
      .then(result => {
        if (result) {
          resetToAgentFeedback(navigation);
          resolve(true);
        } else {
          DebouncedAlert(
            CONSTANT_openSOFeedbackLoadFailureText.header,
            CONSTANT_openSOFeedbackLoadFailureText.message
          );
          reject();
        }
      })
      .catch(() => {
        DebouncedAlert(
          CONSTANT_openSOFeedbackLoadFailureText.header,
          CONSTANT_openSOFeedbackLoadFailureText.message
        );
        reject();
      });
  });
};

/**
 * From feedback screen this will open the OPS intro screen
 */
export const openOPSIntro = (
  navigation: NavigationStackProp<any>,
  selectedItineraryId: string
) => {
  return new Promise<boolean>((resolve, reject) => {
    storeService.userFlowTransitionStore
      .userCompletedFeedback(selectedItineraryId)
      .then(userFlowResult => {
        if (userFlowResult) {
          resetToAgentInfo(navigation, selectedItineraryId);
          resolve(true);
        } else {
          DebouncedAlert(
            CONSTANT_openOPSIntroLoadFailureText.header,
            CONSTANT_openOPSIntroLoadFailureText.message
          );
          reject();
        }
      })
      .catch(() => {
        DebouncedAlert(
          CONSTANT_openOPSIntroLoadFailureText.header,
          CONSTANT_openOPSIntroLoadFailureText.message
        );
        reject();
      });
  });
};

export const openPostBookingHome = (navigation: NavigationStackProp<any>) => {
  resetToPostBookingScreen(navigation);
};

export default launchPostBooking;
