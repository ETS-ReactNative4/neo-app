import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import HomeSwitch from "./HomeSwitch";
import Notifications from "../Screens/NotificationsScreen/Notifications";
import Home from "../Screens/HomeScreen/Home";
import Drawer from "../Screens/Drawer/Drawer";
import PaymentStack from "./PaymentStack";
import About from "../Screens/AboutScreen/About";
import { shouldIncludeStoryBook } from "../storybook/Storybook";

const navigators = {
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
    screen: createStackNavigator({ AboutUs: { screen: About } })
  }
};

if (shouldIncludeStoryBook()) {
  const StorybookUIRoot = require("../storybook/Storybook").default;
  navigators.StoryBook = {
    screen: StorybookUIRoot
  };
}

const AppNavigator = createDrawerNavigator(navigators, {
  initialRouteName: "Home",
  contentComponent: Drawer
});

export default AppNavigator;
