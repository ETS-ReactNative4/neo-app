import storeService from "../storeService/storeService";
import { NavigationStackProp } from "react-navigation-stack";
import { NavigationActions, StackActions } from "react-navigation";
import { logError } from "../errorLogger/errorLogger";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import { CONSTANT_postBookingLoadFailureText } from "../../constants/appText";
import { IPostBookingIntroData } from "../../Screens/PostBookingIntroScreen/PostBookingIntro";

enum routeNameType {
  YourBookings = "YourBookings",
  YourBookingsUniversal = "YourBookingsUniversal",
  MobileNumber = "MobileNumber"
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

const resetToBookedItineraryTabs = NavigationActions.navigate({
  routeName: "AppHome",
  action: NavigationActions.navigate({ routeName: "BookedItineraryTabs" })
});

const resetToPostBookingIntro = StackActions.reset({
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
});

const resetToAgentInfo = NavigationActions.navigate({
  routeName: "AgentInfo"
});

const resetToAgentFeedback = NavigationActions.navigate({
  routeName: "AgentFeedback"
});

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
          navigation.dispatch(resetToPostBookingIntro);
        } else if (!transitionStatus.seenOPSIntro) {
          navigation.dispatch(resetToAgentInfo);
        } else if (!transitionStatus.completedSOFeedback) {
          navigation.dispatch(resetToAgentFeedback);
        } else {
          if (["YourBookings", "MobileNumber"].indexOf(routeName) > -1) {
            navigation.dispatch(resetToBookedItineraryTabs);
          } else if (routeName === "YourBookingsUniversal") {
            navigation.navigate("BookedItineraryTabs");
          } else {
            logError("Unexpected route to launch Post Booking flow");
            DebouncedAlert(
              CONSTANT_postBookingLoadFailureText.header,
              CONSTANT_postBookingLoadFailureText.invalidRoute
            );
          }
        }
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

export default launchPostBooking;
