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
import TransferVoucher from "./Screens/VoucherScreens/TransferVoucherScreen/TransferVoucher";
import HotelVoucher from "./Screens/VoucherScreens/HotelVoucherScreen/HotelVoucher";
import HomeTabBar from "./CommonComponents/HomeTabBar/HomeTabBar";

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
  HomeTabBar
);

const HomeStack = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        drawerLockMode: "locked-closed"
      }
    },
    Starter: {
      screen: Starter,
      navigationOptions: {
        drawerLockMode: "locked-closed"
      }
    },
    AppHome: {
      screen: HomeTabs,
      navigationOptions: {
        header: null
      }
    },
    YourBookings: {
      screen: YourBookings,
      navigationOptions: {
        drawerLockMode: "locked-closed"
      }
    },
    MobileNumber: {
      screen: MobileNumber,
      navigationOptions: {
        drawerLockMode: "locked-closed"
      }
    },
    Otp: {
      screen: Otp,
      navigationOptions: {
        drawerLockMode: "locked-closed"
      }
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
