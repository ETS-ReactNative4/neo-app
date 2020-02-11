import storeService from "../storeService/storeService";
import { NavigationStackProp } from "react-navigation-stack";
import { NavigationActions, StackActions } from "react-navigation";
import { logError } from "../errorLogger/errorLogger";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import {
  CONSTANT_postBookingLoadFailureText,
  CONSTANT_openSOFeedbackLoadFailureText,
  CONSTANT_openOPSIntroLoadFailureText
} from "../../constants/appText";
import { IPostBookingIntroData } from "../../Screens/PostBookingIntroScreen/PostBookingIntro";
import apiCall from "../networkRequests/apiCall";
import { CONSTANT_feedbackInfo } from "../../constants/apiUrls";
import { CONSTANT_responseSuccessStatus } from "../../constants/stringConstants";
import { IMobileServerResponse } from "../../TypeInterfaces/INetworkResponse";
import {
  CONSTANT_passIcon,
  CONSTANT_visaRelatedFaqIcon,
  CONSTANT_paymentIcon
} from "../../constants/imageAssets";
import { IPocCardPropsData } from "../../Screens/AgentInfoScreen/Components/AgentPocCard";

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

const pocCardData: IPocCardPropsData[] = [
  {
    title: "Superstar support",
    description: "The travel vouchers you need for your trip",
    iconName: CONSTANT_passIcon
  },
  {
    title: "Visa assistance",
    description: "The travel vouchers you need for your trip",
    iconName: CONSTANT_visaRelatedFaqIcon
  },
  {
    title: "Payments",
    description: "The travel vouchers you need for your trip",
    iconName: CONSTANT_paymentIcon
  }
];

export interface ISOInfoResponse extends IMobileServerResponse {
  data: ISOInfo;
}

const appIntroData: IPostBookingIntroData[] = [
  {
    title: "Hello Prabu,",
    description:
      "We’ll use your preference info to make better and more relevant recommendations.",
    image: "https://i.imgur.com/YtdsUbs.png"
  },
  {
    title: "Live on-trip support",
    description:
      "We’ll use your preference info to make better and more relevant recommendations.",
    image: "https://i.imgur.com/sYzOl65.png"
  },
  {
    title: "Visa assistance",
    description:
      "We’ll use your preference info to make better and more relevant recommendations.",
    image: "https://i.imgur.com/hm0u6k6.png"
  },
  {
    title: "Access to travel vouchers",
    description:
      "We’ll use your preference info to make better and more relevant recommendations.",
    image: "https://i.imgur.com/cd7irIa.png"
  }
];

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

const resetToPostBookingIntro = (navigation: NavigationStackProp<any>) => {
  /**
   * TODO: Load Post Booking Intro here from API before
   * transitioning screen.
   */
  navigation.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "MainStack",
          action: NavigationActions.navigate({
            routeName: "PostBookingIntro",
            params: {
              introData: appIntroData
            }
          })
        })
      ]
    })
  );
};

const resetToAgentInfo = (
  navigation: NavigationStackProp<any>,
  itineraryId: string
) => {
  apiCall(
    `${CONSTANT_feedbackInfo}?itineraryId=${itineraryId}&type=ACCOUNT_OWNER`,
    {},
    "GET"
  )
    .then((response: ISOInfoResponse) => {
      if (response.status === CONSTANT_responseSuccessStatus) {
        const { ownerName, imageUrl } = response.data;
        navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: "MainStack",
                action: NavigationActions.navigate({
                  routeName: "AgentInfo",
                  params: {
                    itineraryId,
                    ownerName,
                    ownerImage: imageUrl,
                    pocCardData
                  }
                })
              })
            ]
          })
        );
      } else {
        DebouncedAlert("Error!", "Unable to load data from the server");
      }
    })
    .catch(() => {
      DebouncedAlert("Error!", "Unable to load data from the server");
    });
};

const resetToAgentFeedback = (navigation: NavigationStackProp<any>) => {
  navigation.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "MainStack",
          action: NavigationActions.navigate({
            routeName: "AgentFeedback"
          })
        })
      ]
    })
  );
};

const resetToPostBookingScreen = (navigation: NavigationStackProp<any>) => {
  navigation.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "MainStack",
          action: NavigationActions.navigate({
            routeName: "AppHome",
            action: NavigationActions.navigate({
              routeName: "BookedItineraryTabs"
            })
          })
        })
      ]
    })
  );
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
        } else if (!transitionStatus.seenOPSIntro) {
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
