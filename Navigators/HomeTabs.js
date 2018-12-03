import { createBottomTabNavigator } from "react-navigation";
import Home from "../Screens/HomeScreen/Home";
import BookedTabs from "./BookedTabs";
import NewItineraryStack from "./NewItineraryStack";
import storeService from "../Services/storeService/storeService";

const HomeTabs = createBottomTabNavigator(
  {
    NewItineraryStack: {
      screen: NewItineraryStack
    },
    BookedItineraryTabs: {
      screen: BookedTabs
    }
  },
  {
    initialRouteName: "NewItineraryStack",
    swipeEnabled: false,
    lazy: false
  }
);

export default HomeTabs;
