import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import Splash from "../Screens/SplashScreen/Splash";
import YourBookings from "../Screens/YourBookingsScreen/YourBookings";
import UniversalStack from "./UniversalStack";
import getActiveRouteName from "../Services/getActiveRouteName/getActiveRouteName";

const HomeSwitch = createSwitchNavigator(
  {
    Splash: {
      screen: Splash
    },
    UniversalStack,
    YourBookings: {
      screen: YourBookings
    }
  },
  {
    initialRouteName: "Splash"
  }
);

HomeSwitch.navigationOptions = ({ navigation }) => {
  let drawerLockMode = "locked-closed";
  const routeName = getActiveRouteName(navigation.state);
  /**
   * Enable drawer swipe only on the tab screens
   * The keyboard input of the webview causes problems when the drawer opens hence
   * drawer swipe is disabled for the `Support` screen
   */
  if (
    routeName === "TripFeed" ||
    routeName === "Bookings" ||
    routeName === "Tools" ||
    routeName === "Journal"
  ) {
    drawerLockMode = "unlocked";
  }

  return {
    drawerLockMode
  };
};

export default HomeSwitch;
