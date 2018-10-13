import { createStackNavigator } from "react-navigation";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";
import PaymentHome from "../Screens/PaymentHomeScreen/PaymentHome";
import PaymentSummary from "../Screens/PaymentSummaryScreen/PaymentSummary";

const PaymentStack = createStackNavigator(
  {
    PaymentHome: {
      screen: PaymentHome
    },
    PaymentSummary: {
      screen: PaymentSummary
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
