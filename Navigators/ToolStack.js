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
import Visa from "../Screens/VisaScreen/Visa";
import NearBy from "../Screens/NearByScreen/NearBy";
import SupportCenter from "../Screens/SupportCenterScreen/SupportCenter";
import FAQ from "../Screens/FAQScreens/FAQScreen/FAQ";
import FAQAnswers from "../Screens/FAQScreens/FAQAnswersScreen/FAQAnswers";
import ContactUs from "../Screens/ContactUsScreen/ContactUs";
import YourTickets from "../Screens/YourTickets/YourTickets";
import VisaChecklist from "../Screens/VisaChecklistScreen/VisaChecklist";

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
    ToolPlaces: {
      screen: Places
    },
    ToolNearBy: {
      screen: NearBy
    },
    Visa: {
      screen: Visa
    },
    VisaChecklist: {
      screen: VisaChecklist
    },
    SupportCenter: {
      screen: SupportCenter
    },
    FAQ: {
      screen: FAQ
    },
    FAQAnswers: {
      screen: FAQAnswers
    },
    ContactUs: {
      screen: ContactUs
    },
    YourTickets: {
      screen: YourTickets
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
