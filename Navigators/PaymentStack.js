import { createStackNavigator } from "react-navigation";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";
import PaymentHome from "../Screens/PaymentHomeScreen/PaymentHome";
import PaymentSummary from "../Screens/PaymentSummaryScreen/PaymentSummary";
import PaymentScreen from "../Screens/PaymentScreen/PaymentScreen";

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
