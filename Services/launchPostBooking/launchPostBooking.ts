import storeService from "../storeService/storeService";
import { NavigationStackProp } from "react-navigation-stack";
import { NavigationActions } from "react-navigation";

enum routeNameType {
  YourBookings = "YourBookings",
  YourBookingsUniversal = "YourBookingsUniversal",
  MobileNumber = "MobileNumber"
}

const resetAction = NavigationActions.navigate({
  routeName: "AppHome",
  action: NavigationActions.navigate({ routeName: "BookedItineraryTabs" })
});

const launchPostBooking = (
  routeName: routeNameType,
  navigation: NavigationStackProp<any>
): void => {
  if (["YourBookings", "MobileNumber"].indexOf(routeName) > -1) {
    storeService.appState.setTripMode(true);
    navigation.dispatch(resetAction);
  } else if (routeName === "YourBookingsUniversal") {
    storeService.appState.setTripMode(true);
    navigation.navigate("BookedItineraryTabs");
  } else {
    throw Error("Unexpected route to launch Post Booking flow");
  }
};

export default launchPostBooking;
