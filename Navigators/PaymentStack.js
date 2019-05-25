import { createStackNavigator } from "react-navigation";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";
import PaymentHome from "../Screens/PaymentHomeScreen/PaymentHome";
import PaymentSummary from "../Screens/PaymentSummaryScreen/PaymentSummary";
import PaymentScreen from "../Screens/PaymentScreens/PaymentScreen";
import PaymentSuccess from "../Screens/PaymentScreens/PaymentSuccess";
import PaymentFailure from "../Screens/PaymentScreens/PaymentFailure";
import PDFViewerAndroid from "../Screens/PDFViewerScreen/PDFViewerAndroid";

const PaymentStack = createStackNavigator(
  {
    PaymentHome: {
      screen: PaymentHome
    },
    PaymentSummary: {
      screen: PaymentSummary
    },
    PaymentScreen: {
      screen: PaymentScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    PaymentSuccess: {
      screen: PaymentSuccess
    },
    PaymentFailure: {
      screen: PaymentFailure
    },
    PaymentPDFViewerScreen: {
      screen: PDFViewerAndroid
    }
  },
  {
    initialRouteName: "PaymentHome",
    navigationOptions: {
      gesturesEnabled: true
    },
    transitionConfig
  }
);

PaymentStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = "locked-closed";
  const route = navigation.state.routes[navigation.state.routes.length - 1];
  const routeName = route.routeName;
  if (routeName === "PaymentHome") {
    drawerLockMode = "unlocked";
  }
  return {
    drawerLockMode
  };
};

export default PaymentStack;
