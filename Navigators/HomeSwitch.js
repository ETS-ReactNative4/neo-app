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
  if (
    routeName === "BookingsHome" ||
    routeName === "Support" ||
    routeName === "ToolHome" ||
    routeName === "Journal"
  ) {
    drawerLockMode = "unlocked";
  }

  return {
    drawerLockMode
  };
};

export default HomeSwitch;
