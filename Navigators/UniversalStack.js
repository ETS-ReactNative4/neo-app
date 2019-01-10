import { createStackNavigator } from "react-navigation";
import Starter from "../Screens/StartingScreen/Starter";
import HomeTabs from "./HomeTabs";
import MobileNumber from "../Screens/MobileNumberScreen/MobileNumber";
import TransferVoucher from "../Screens/VoucherScreens/TransferVoucherScreen/TransferVoucher";
import ActivityVoucher from "../Screens/VoucherScreens/ActivityVoucherScreen/ActivityVoucher";
import HotelVoucher from "../Screens/VoucherScreens/HotelVoucherScreen/HotelVoucher";
import FlightVoucher from "../Screens/VoucherScreens/FlightVoucherScreen/FlightVoucher";
import PassVoucher from "../Screens/VoucherScreens/PassVoucherScreen/PassVoucher";
import FlightStatus from "../Screens/FlightStatusScreen/FlightStatus";
import YourBookings from "../Screens/YourBookingsScreen/YourBookings";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";

const MainStack = createStackNavigator(
  {
    Starter: {
      screen: Starter
    },
    AppHome: {
      screen: HomeTabs,
      navigationOptions: {
        header: null
      }
    },
    MobileNumber: {
      screen: MobileNumber,
      navigationOptions: {
        gesturesEnabled: true
      }
    }
  },
  {
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig
  }
);

MainStack.navigationOptions = () => {
  let drawerLockMode = "locked-closed";

  return {
    drawerLockMode
  };
};

const UniversalStack = createStackNavigator(
  {
    MainStack,
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
    },
    YourBookingsUniversal: {
      screen: YourBookings
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: true,
      drawerLockMode: "locked-closed"
    },
    mode: "modal",
    transitionConfig
  }
);

export default UniversalStack;
