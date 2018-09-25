import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import HomeStack from "./HomeStack";
import Notifications from "../Screens/NotificationsScreen/Notifications";
import Home from "../Screens/HomeScreen/Home";
import Drawer from "../Screens/Drawer/Drawer";

const AppNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack
    },
    Notifications: {
      screen: createStackNavigator({
        NotificationsStack: { screen: Notifications }
      })
    },
    Payments: {
      screen: createStackNavigator({ HomeStack1: { screen: Home } })
    },
    SavedItineraries: {
      screen: createStackNavigator({ HomeStack2: { screen: Home } })
    },
    YourBookings: {
      screen: createStackNavigator({ HomeStack3: { screen: Home } })
    },
    Account: {
      screen: createStackNavigator({ HomeStack4: { screen: Home } })
    },
    AppSupport: {
      screen: createStackNavigator({ HomeStack5: { screen: Home } })
    },
    About: {
      screen: createStackNavigator({ HomeStack6: { screen: Home } })
    }
  },
  {
    contentComponent: Drawer
  }
);

export default AppNavigator;
