import { createStackNavigator } from "react-navigation";
import Tools from "../Screens/ToolsScreen/Tools";
import CurrencyConverter from "../Screens/CurrencyConverterScreen/CurrencyConverter";
import PhraseBook from "../Screens/PhraseBookScreen/PhraseBook";
import PackingChecklist from "../Screens/PackingChecklistScreen/PackingChecklist";
import PassportDetails from "../Screens/PassportDetailsScreen/PassportDetails";
import EmergencyContacts from "../Screens/EmergencyContactsScreen/EmergencyContacts";
import Weather from "../Screens/WeatherScreen/Weather";
import Places from "../Screens/PlacesScreen/Places";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";

const ToolStack = createStackNavigator(
  {
    ToolHome: {
      screen: Tools
    },
    CurrencyConverter: {
      screen: CurrencyConverter
    },
    PhraseBook: {
      screen: PhraseBook
    },
    PackingChecklist: {
      screen: PackingChecklist
    },
    PassportDetails: {
      screen: PassportDetails
    },
    EmergencyContacts: {
      screen: EmergencyContacts
    },
    Weather: {
      screen: Weather
    },
    Places: {
      screen: Places
    }
  },
  {
    initialRouteName: "ToolHome",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig
  }
);

ToolStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default ToolStack;
