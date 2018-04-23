import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
  TabBarBottom
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

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const ToolStack = StackNavigator(
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
    }
  }
);

const HomeTabs = TabNavigator(
  {
    TripFeed: {
      screen: Home
    },
    Bookings: {
      screen: Home
    },
    Chat: {
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
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    initialRouteName: "Tools",
    swipeEnabled: false
  }
);

const HomeStack = StackNavigator(
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
      screen: HomeTabs
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
    }
  },
  {
    initialRouteName: "Splash",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig
  }
);

const App = DrawerNavigator(
  {
    Home: {
      screen: HomeStack
    },
    Notifications: {
      screen: Home
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

export default App;
