import React from "react";
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
import TabBarIcon from "./CommonComponents/TabBarIcon/TabBarIcon";
import constants from "./constants/constants";
import TransferVoucher from "./Screens/VoucherScreens/TransferVoucherScreen/TransferVoucher";
import HotelVoucher from "./Screens/VoucherScreens/HotelVoucherScreen/HotelVoucher";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const BookingStack = createStackNavigator(
  {
    BookingsHome: {
      screen: BookingsHome
    },
    BookedItinerary: {
      screen: BookedItinerary
    }
  },
  {
    initialRouteName: "BookingsHome",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig
  }
);

const ToolStack = createStackNavigator(
  {
    ToolHome: {
      screen: Tools
    },
    CurrencyConverter: {
      screen: CurrencyConverter
    },
    PhraseBook: {
      screen: PhraseBook
    },
    PackingChecklist: {
      screen: PackingChecklist
    },
    Weather: {
      screen: Weather
    }
  },
  {
    initialRouteName: "ToolHome",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig
  }
);

const HomeTabs = createBottomTabNavigator(
  {
    TripFeed: {
      screen: Home
    },
    Bookings: {
      screen: BookingStack
    },
    Support: {
      screen: Home
    },
    Tools: {
      screen: ToolStack
    },
    Journal: {
      screen: Home
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let icon;

        switch (routeName) {
          case "TripFeed":
            icon = { text: "TRIP FEED", icon: constants.notificationIcon };
            break;

          case "Bookings":
            icon = { text: "BOOKINGS", icon: constants.notificationIcon };
            break;

          case "Support":
            icon = { text: "SUPPORT", icon: constants.notificationIcon };
            break;

          case "Tools":
            icon = { text: "TOOLS", icon: constants.notificationIcon };
            break;

          case "Journal":
            icon = { text: "JOURNAL", icon: constants.notificationIcon };
            break;
        }

        return <TabBarIcon {...icon} />;
      }
    }),
    tabBarOptions: {
      showLabel: false
    },
    initialRouteName: "Bookings",
    swipeEnabled: false
  }
);

const HomeStack = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed"
      })
    },
    Starter: {
      screen: Starter,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed"
      })
    },
    AppHome: {
      screen: HomeTabs,
      navigationOptions: {
        header: null
      }
    },
    YourBookings: {
      screen: YourBookings,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed"
      })
    },
    MobileNumber: {
      screen: MobileNumber,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed"
      })
    },
    Otp: {
      screen: Otp,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: "locked-closed"
      })
    },
    NewAccount: {
      screen: NewAccount
    },
    Itineraries: {
      screen: Itineraries
    },
    TransferVoucher: {
      screen: TransferVoucher
    },
    HotelVoucher: {
      screen: HotelVoucher
    }
  },
  {
    initialRouteName: "HotelVoucher",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack
    },
    Notifications: {
      screen: Notifications
    },
    Payments: {
      screen: Home
    },
    SavedItineraries: {
      screen: Home
    },
    YourBookings: {
      screen: Home
    },
    Account: {
      screen: Home
    },
    Support: {
      screen: Home
    },
    About: {
      screen: Home
    }
  },
  {
    contentComponent: Drawer
  }
);

const App = () => {
  return (
    <Provider {...store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
