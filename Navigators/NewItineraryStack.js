import { createStackNavigator } from "react-navigation-stack";
import Home from "../Screens/HomeScreen/Home";

const NewItineraryStack = createStackNavigator(
  {
    NewItineraryHome: {
      screen: Home
    }
  },
  {
    navigationOptions: () => {
      const tabBarVisible = false;

      return {
        tabBarVisible
      };
    }
  }
);

export default NewItineraryStack;
