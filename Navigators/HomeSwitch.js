import {createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Splash from '../Screens/SplashScreen/Splash';
import YourBookings from '../Screens/YourBookingsScreen/YourBookings';
import UniversalStack from './UniversalStack';
import getActiveRouteName from '../Services/getActiveRouteName/getActiveRouteName';

const HomeSwitch = createSwitchNavigator(
  {
    Splash: {
      screen: Splash,
    },
    UniversalStack,
    YourBookings: {
      screen: YourBookings,
    },
  },
  {
    initialRouteName: 'Splash',
    navigationOptions: ({navigation}) => {
      let drawerLockMode = 'locked-closed';
      const routeName = getActiveRouteName(navigation.state);
      console.log('tets', routeName);
      /**
       * TODO: drawerLockMode has issues which prevents it from opening completely
       * when it is set to locked-closed.
       *
       * Drawer cannot be opened from chat screen and new itinerary home due to this issue.
       * Currently being tracked at - https://github.com/react-navigation/react-navigation/issues/6429
       */
      /**
       * Enable drawer swipe only on the tab screens
       * The keyboard input of the webview causes problems when the drawer opens hence
       * drawer swipe is disabled for the `Support` screen
       */
      if (
        routeName === 'TripFeedHome' ||
        routeName === 'Bookings' ||
        routeName === 'Tools' ||
        routeName === 'JournalHome' ||
        routeName === 'Support' ||
        routeName === 'NewItineraryHome'
      ) {
        drawerLockMode = 'unlocked';
      }

      return {
        drawerLockMode,
      };
    },
  },
);

export default HomeSwitch;
