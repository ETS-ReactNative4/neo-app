import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
  TabBarBottom,
} from 'react-navigation';
import {
  UIManager,
} from 'react-native';
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

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const ToolStack = StackNavigator({
  ToolHome: {
    screen: Tools,
  },
  CurrencyConverter: {
    screen: CurrencyConverter,
  },
  PhraseBook: {
    screen: PhraseBook,
  },
}, {
  initialRouteName: 'ToolHome',
});

const HomeTabs = TabNavigator({
  TripFeed: {
    screen: Home,
  },
  Bookings: {
    screen: Home,
  },
  Chat: {
    screen: Home,
  },
  Tools: {
    screen: ToolStack,
  },
  Journal: {
    screen: Home,
  },
}, {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  initialRouteName: 'Tools',
});

const HomeStack = StackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: ({navigation}) => ({
      drawerLockMode: 'locked-closed'
    })
  },
  Starter: {
    screen: Starter,
    navigationOptions: ({navigation}) => ({
      drawerLockMode: 'locked-closed'
    })
  },
  AppHome: {
    screen: HomeTabs,
  },
  Otp: {
    screen: Otp,
  },
  NewAccount: {
    screen: NewAccount,
  },
}, {
  initialRouteName: 'AppHome',
  navigationOptions: {
    gesturesEnabled: false,
    header: null,
  },
});

const App = DrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  Notifications: {
    screen: Home,
  },
  Payments: {
    screen: Home,
  },
  SavedItineraries: {
    screen: Home,
  },
  YourBookings: {
    screen: Home,
  },
  Account: {
    screen: Home,
  },
  Support: {
    screen: Home,
  },
  About: {
    screen: Home,
  },
}, {
  contentComponent: Drawer,
});

export default App;
