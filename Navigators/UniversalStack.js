import { createStackNavigator } from "react-navigation";
import TransferVoucher from "../Screens/VoucherScreens/TransferVoucherScreen/TransferVoucher";
import ActivityVoucher from "../Screens/VoucherScreens/ActivityVoucherScreen/ActivityVoucher";
import HotelVoucher from "../Screens/VoucherScreens/HotelVoucherScreen/HotelVoucher";
import FlightVoucher from "../Screens/VoucherScreens/FlightVoucherScreen/FlightVoucher";
import PassVoucher from "../Screens/VoucherScreens/PassVoucherScreen/PassVoucher";
import FlightStatus from "../Screens/FlightStatusScreen/FlightStatus";
import LeisureScreen from "../Screens/VoucherScreens/LeisureScreen/LeisureScreen";
import YourBookings from "../Screens/YourBookingsScreen/YourBookings";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";
import MainStack from "./MainStack";
import RentalCarVoucher from "../Screens/VoucherScreens/RentalCarVoucherScreen/RentalCarVoucher";
import PDFViewerAndroid from "../Screens/PDFViewerScreen/PDFViewerAndroid";
import FeedbackPrompt from "../Screens/FeedbackPromptScreen/FeedbackPrompt";
import ActionSheet from "../Screens/ActionSheetScreen/ActionSheet";
import VisaDocumentsActionSheet from "../Screens/VisaDocumentsActionSheet/VisaDocumentsActionSheet";

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
    RentalCarVoucher: {
      screen: RentalCarVoucher
    },
    LeisureScreen: {
      screen: LeisureScreen
    },
    YourBookingsUniversal: {
      screen: YourBookings
    },
    PDFViewerScreen: {
      screen: PDFViewerAndroid
    },
    FeedbackPrompt: {
      screen: FeedbackPrompt
    },
    VisaDocumentActionSheet: {
      screen: VisaDocumentsActionSheet
    },
    ActionSheet: {
      screen: ActionSheet
    }
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      opacity: 1
    },
    defaultNavigationOptions: {
      gesturesEnabled: true,
      drawerLockMode: "locked-closed"
    },
    mode: "modal",
    transitionConfig,
    transparentCard: true
  }
);

export default UniversalStack;
