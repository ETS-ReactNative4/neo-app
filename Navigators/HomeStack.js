import { createStackNavigator } from "react-navigation";
import Splash from "../Screens/SplashScreen/Splash";
import Starter from "../Screens/StartingScreen/Starter";
import BookedTabs from "./BookedTabs";
import YourBookings from "../Screens/YourBookingsScreen/YourBookings";
import MobileNumber from "../Screens/MobileNumberScreen/MobileNumber";
import Otp from "../Screens/OtpScreen/Otp";
import NewAccount from "../Screens/NewAccountScreen/NewAccount";
import Itineraries from "../Screens/ItinerariesScreen/Itineraries";
import TransferVoucher from "../Screens/VoucherScreens/TransferVoucherScreen/TransferVoucher";
import ActivityVoucher from "../Screens/VoucherScreens/ActivityVoucherScreen/ActivityVoucher";
import HotelVoucher from "../Screens/VoucherScreens/HotelVoucherScreen/HotelVoucher";
import FlightVoucher from "../Screens/VoucherScreens/FlightVoucherScreen/FlightVoucher";
import PassVoucher from "../Screens/VoucherScreens/PassVoucherScreen/PassVoucher";
import FlightStatus from "../Screens/FlightStatusScreen/FlightStatus";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";
import HomeTabs from "./HomeTabs";

const HomeStack = createStackNavigator(
  {
    Splash: {
      screen: Splash
    },
    Starter: {
      screen: Starter
    },
    AppHome: {
      screen: HomeTabs,
      navigationOptions: {
        header: null
      }
    },
    YourBookings: {
      screen: YourBookings
    },
    MobileNumber: {
      screen: MobileNumber
    },
    Otp: {
      screen: Otp
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
    ActivityVoucher: {
      screen: ActivityVoucher
    },
    HotelVoucher: {
      screen: HotelVoucher
    },
    FlightVoucher: {
      screen: FlightVoucher
    },
    PassVoucher: {
      screen: PassVoucher
    },
    FlightStatus: {
      screen: FlightStatus
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

HomeStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = "unlocked";

  const route = navigation.state.routes[navigation.state.routes.length - 1];
  const routeName = route.routeName;
  if (
    routeName === "Splash" ||
    routeName === "Starter" ||
    routeName === "YourBookings" ||
    routeName === "MobileNumber" ||
    routeName === "Otp"
  ) {
    drawerLockMode = "locked-closed";
  }

  return {
    drawerLockMode
  };
};

export default HomeStack;
