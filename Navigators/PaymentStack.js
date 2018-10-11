import { createStackNavigator } from "react-navigation";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";
import PaymentHome from "../Screens/PaymentHomeScreen/PaymentHome";

const PaymentStack = createStackNavigator(
  {
    PaymentHome: PaymentHome
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
