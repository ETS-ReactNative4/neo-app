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

const ExploreStack = StackNavigator({
  Itineraries: {
    screen: Itineraries,
  },
});

const ExploreDrawer = DrawerNavigator({
  Explore: {
    screen: ExploreStack,
  },
});

ExploreDrawer.navigationOptions = {
  header: null,
};

const App = StackNavigator({
  Splash: {
    screen: SplashScreen,
  },
  Starter: {
    screen: StartingScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  Otp: {
    screen: OtpScreen,
  },
  NewAccount: {
    screen: NewAccountScreen,
  },
  Explore: {
    screen: ExploreDrawer,
  },
});

export default App;
