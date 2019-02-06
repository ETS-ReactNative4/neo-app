import * as Keychain from "react-native-keychain";
import { logError } from "../errorLogger/errorLogger";
import storeService from "../storeService/storeService";

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
      Keychain.getGenericPassword()
        .then(credentials => {
          if (credentials && credentials.password) {
            navigation.navigate("YourBookingsUniversal");
          } else {
            navigation.push("MobileNumber");
          }
        })
        .catch(e => {
          logError(e);
        });
    }
  }
};

export default toggleHomeScreen;
