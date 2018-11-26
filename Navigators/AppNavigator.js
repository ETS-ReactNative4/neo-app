import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import HomeSwitch from "./HomeSwitch";
import Notifications from "../Screens/NotificationsScreen/Notifications";
import Home from "../Screens/HomeScreen/Home";
import Drawer from "../Screens/Drawer/Drawer";
import PaymentStack from "./PaymentStack";

const AppNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeSwitch
    },
    // Notifications: {
    //   screen: createStackNavigator({
    //     NotificationsStack: { screen: Notifications }
    //   })
    // },
    Payments: {
      screen: PaymentStack
    },
    // SavedItineraries: {
    //   screen: createStackNavigator({ HomeStack2: { screen: Home } })
    // },
    // YourBookings: {
    //   screen: createStackNavigator({ HomeStack3: { screen: Home } })
    // },
    // Account: {
    //   screen: createStackNavigator({ HomeStack4: { screen: Home } })
    // },
    // AppSupport: {
    //   screen: createStackNavigator({ HomeStack5: { screen: Home } })
    // },
    About: {
      screen: createStackNavigator({ HomeStack6: { screen: Home } })
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: Drawer
  }
);

export default AppNavigator;
