import React, { Component } from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { UIManager } from "react-native";
import Home from "./Screens/HomeScreen/Home";
import Starter from "./Screens/StartingScreen/Starter";
import Splash from "./Screens/SplashScreen/Splash";
import Otp from "./Screens/OtpScreen/Otp";
import NewAccount from "./Screens/NewAccountScreen/NewAccount";
import Itineraries from "./Screens/ItinerariesScreen/Itineraries";
import Drawer from "./Screens/Drawer/Drawer";
import Tools from "./Screens/ToolsScreen/Tools";
import CurrencyConverter from "./Screens/CurrencyConverterScreen/CurrencyConverter";
import PhraseBook from "./Screens/PhraseBookScreen/PhraseBook";
import PackingChecklist from "./Screens/PackingChecklistScreen/PackingChecklist";
import Weather from "./Screens/WeatherScreen/Weather";
import MobileNumber from "./Screens/MobileNumberScreen/MobileNumber";
import YourBookings from "./Screens/YourBookingsScreen/YourBookings";
import transitionConfig from "./Services/navigationAnimations/transitionConfig";
import { Provider } from "mobx-react";
import store from "./mobx/Store";
import BookingsHome from "./Screens/BookingsHomeScreen/BookingsHome";
import Notifications from "./Screens/NotificationsScreen/Notifications";
import BookedItinerary from "./Screens/BookedItineraryScreen/BookedItinerary";
import TransferVoucher from "./Screens/VoucherScreens/TransferVoucherScreen/TransferVoucher";
import HotelVoucher from "./Screens/VoucherScreens/HotelVoucherScreen/HotelVoucher";
import HomeTabBar from "./CommonComponents/HomeTabBar/HomeTabBar";
import ActivityVoucher from "./Screens/VoucherScreens/ActivityVoucherScreen/ActivityVoucher";
import FlightVoucher from "./Screens/VoucherScreens/FlightVoucherScreen/FlightVoucher";
import EmergencyContacts from "./Screens/EmergencyContactsScreen/EmergencyContacts";
import PassportDetails from "./Screens/PassportDetailsScreen/PassportDetails";
import { logBreadCrumb } from "./Services/errorLogger/errorLogger";
import ChatScreen from "./Screens/ChatScreen/ChatScreen";
import { setNavigationService } from "./Services/navigationService/navigationService";
import FlightStatus from "./Screens/FlightStatusScreen/FlightStatus";
import { updateStoreService } from "./Services/storeService/storeService";
import PassVoucher from "./Screens/VoucherScreens/PassVoucherScreen/PassVoucher";
import Places from "./Screens/PlacesScreen/Places";
import BookingTabs from "./Navigators/BookingTabs";
import HomeStack from "./Navigators/HomeStack";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

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

const getActiveRouteName = navigationState => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};

const screenTracker = (prevState, currentState) => {
  const currentScreen = getActiveRouteName(currentState);
  const prevScreen = getActiveRouteName(prevState);

  /**
   * TODO: Check if any data can be added here...
   */
  if (prevScreen !== currentScreen) {
    logBreadCrumb({
      message: `${prevScreen} to ${currentScreen}`,
      category: `navigation`,
      data: {}
    });
  }
};

const App = () => {
  updateStoreService(store);
  return (
    <Provider {...store}>
      <AppNavigator
        ref={setNavigationService}
        onNavigationStateChange={screenTracker}
      />
    </Provider>
  );
};

export default App;
