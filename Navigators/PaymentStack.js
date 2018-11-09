import { createStackNavigator } from "react-navigation";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";
import PaymentHome from "../Screens/PaymentHomeScreen/PaymentHome";
import PaymentSummary from "../Screens/PaymentSummaryScreen/PaymentSummary";
import PaymentScreen from "../Screens/PaymentScreens/PaymentScreen";
import PaymentSuccess from "../Screens/PaymentScreens/PaymentSuccess";
import PaymentFailure from "../Screens/PaymentScreens/PaymentFailure";

const PaymentStack = createStackNavigator(
  {
    PaymentHome: {
      screen: PaymentHome
    },
    PaymentSummary: {
      screen: PaymentSummary
    },
    PaymentScreen: {
      screen: PaymentScreen
    },
    PaymentSuccess: {
      screen: PaymentSuccess
    },
    PaymentFailure: {
      screen: PaymentFailure
    }
  },
  {
    initialRouteName: "PaymentHome",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig
  }
);

export default PaymentStack;
