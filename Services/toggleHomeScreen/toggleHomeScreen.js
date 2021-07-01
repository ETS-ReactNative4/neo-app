import storeService from "../storeService/storeService";
import isUserLoggedInCallback from "../isUserLoggedInCallback/isUserLoggedInCallback";

/**
 * Used to toggle between home screen and booking screen. Handles:
 * - Login screen, if user hasn't logged in
 * - Your bookings screen, if user hasn't selected a booking yet
 */
const toggleHomeScreen = navigation => {
  const { isTripModeOn, setTripMode } = storeService.appState;
  const { selectedItineraryId } = storeService.itineraries;
  if (isTripModeOn) {
    setTripMode(!isTripModeOn);
    navigation.navigate("NewItineraryStack");
  } else {
    if (selectedItineraryId) {
      setTripMode(!isTripModeOn);
      navigation.navigate("BookedItineraryTabs");
    } else {
      isUserLoggedInCallback(
        () => {
          navigation.navigate("YourBookingsUniversal");
        },
        () => {
          navigation.push("MobileNumber");
        }
      );
    }
  }
};

export default toggleHomeScreen;
