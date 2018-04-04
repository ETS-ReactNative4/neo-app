import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
  TabBarBottom,
} from 'react-navigation';
import Home from "./Screens/HomeScreen/Home";
import Starter from "./Screens/StartingScreen/Starter";
import Splash from "./Screens/SplashScreen/Splash";
import Otp from "./Screens/OtpScreen/Otp";
import NewAccount from "./Screens/NewAccountScreen/NewAccount";
import Itineraries from "./Screens/ItinerariesScreen/Itineraries";
import Drawer from "./Screens/Drawer/Drawer";
import Tools from "./Screens/ToolsScreen/Tools";

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
    screen: Tools,
  },
  Journal: {
    screen: Home,
  },
}, {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
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
