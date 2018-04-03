import {
  StackNavigator,
  DrawerNavigator,
} from 'react-navigation';
import HomeScreen from "./Screens/HomeScreen/Home";
import StartingScreen from "./Screens/StartingScreen/Starter";
import SplashScreen from "./Screens/SplashScreen/Splash";
import OtpScreen from "./Screens/OtpScreen/Otp";
import NewAccountScreen from "./Screens/NewAccountScreen/NewAccount";
import Itineraries from "./Screens/ItinerariesScreen/Itineraries";
import Drawer from "./Screens/Drawer/Drawer";

const HomeStack = StackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: ({navigation}) => ({
      drawerLockMode: 'locked-closed'
    })
  },
  Starter: {
    screen: StartingScreen,
    navigationOptions: ({navigation}) => ({
      drawerLockMode: 'locked-closed'
    })
  },
  AppHome: {
    screen: HomeScreen,
  },
  Otp: {
    screen: OtpScreen,
  },
  NewAccount: {
    screen: NewAccountScreen,
  },
});

const App = DrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  Notifications: {
    screen: HomeScreen,
  },
  Payments: {
    screen: HomeScreen,
  },
  SavedItineraries: {
    screen: HomeScreen,
  },
  Bookings: {
    screen: HomeScreen,
  },
  Account: {
    screen: HomeScreen,
  },
  Support: {
    screen: HomeScreen,
  },
  About: {
    screen: HomeScreen,
  },
}, {
  contentComponent: Drawer,
});

export default App;
