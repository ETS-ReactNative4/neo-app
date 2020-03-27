import storeService from "../storeService/storeService";
import { logError } from "../errorLogger/errorLogger";
import { IMobileServerResponse } from "../../TypeInterfaces/INetworkResponse";
import resetToPostBookingIntro from "./screenResets/resetToPostBookingIntro";
import resetToAgentInfo from "./screenResets/resetToAgentInfo";
import resetToAgentFeedback from "./screenResets/resetToAgentFeedback";
import resetToPostBookingScreen from "./screenResets/resetToPostBookingScreen";

export interface ISOInfo {
  itineraryId: string;
  ownerName: string;
  imageUrl: string;
}

export interface ISOInfoResponse extends IMobileServerResponse {
  data: ISOInfo;
}

const openPostBookingScreen = () => {
  openPostBookingHome();
};

/**
 * launchPostBooking is a group of functions used to display welcome screen to the user
 *
 * The user when he enters the app will be greeted with 3 screen before he can enter the
 * post booking flow. These screens are mandatory and the user should click next on each
 * of these screens before he can enter post booking.
 *
 * To track if the user has clicked next & prevent them from going back, every stage of the
 * welcome screen will do a full navigation stack reset. The resetting functions are present in
 * the `screenResets/` directory.
 *
 * This behavior can be easily achieved using SwitchNavigator (https://reactnavigation.org/docs/en/switch-navigator.html)
 * However, our app's screens are all arranged as a StackNavigator (https://reactnavigation.org/docs/en/stack-navigator.html)
 * The reason behind this arrangement is to open any screen easily using deeplinking which is used in
 * push notifications and trip feed widgets.
 *
 * In order to preserve the Stack nature of the app, the launchPostBooking takes the longer
 * route and implements screen resetting for the welcome screens.
 */
/**
 * Entry method of the Launch Post Booking service
 *
 * Will Launch the post booking flow for the user,
 * resets to required stage in the welcome screen.
 * Important - Should be called only after user has selected an itinerary!
 */
const launchPostBooking = (selectedItineraryId: string) => {
  return new Promise<boolean>((resolve, reject) => {
    storeService.userFlowTransitionStore
      .loadUserTransitionStatus(selectedItineraryId)
      .then(transitionStatus => {
        if (!transitionStatus.seenPostBookingIntro) {
          resetToPostBookingIntro();
        } else if (!transitionStatus.completedSOFeedback) {
          resetToAgentFeedback();
        } else if (!transitionStatus.seenOpsIntro) {
          resetToAgentInfo(selectedItineraryId);
        } else {
          openPostBookingScreen();
        }
        resolve(true);
      })
      .catch(err => {
        openPostBookingScreen();
        logError("Unable to load user transition status", { err });
        reject();
      });
  });
};

/**
 * From the Post Booking intro screen, this will help
 * transitioning user to the SO Feedback screen.
 */
export const openSOFeedback = (selectedItineraryId: string) => {
  return new Promise<boolean>((resolve, reject) => {
    storeService.userFlowTransitionStore
      .userSeenPostBookingIntro(selectedItineraryId)
      .then(result => {
        if (result) {
          resetToAgentFeedback();
          resolve(true);
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });
};

/**
 * From feedback screen this will open the OPS intro screen
 */
export const openOPSIntro = (selectedItineraryId: string) => {
  return new Promise<boolean>((resolve, reject) => {
    storeService.userFlowTransitionStore
      .userCompletedFeedback(selectedItineraryId)
      .then(userFlowResult => {
        if (userFlowResult) {
          resetToAgentInfo(selectedItineraryId);
          resolve(true);
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });
};

export const openPostBookingHome = () => {
  resetToPostBookingScreen();
};

export default launchPostBooking;
