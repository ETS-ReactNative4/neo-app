import { createStackNavigator } from "react-navigation";
import Starter from "../Screens/StartingScreen/Starter";
import HomeTabs from "./HomeTabs";
import MobileNumber from "../Screens/MobileNumberScreen/MobileNumber";
import BookedItinerary from "../Screens/BookedItineraryScreen/BookedItinerary";
import Places from "../Screens/PlacesScreen/Places";
import NearBy from "../Screens/NearByScreen/NearBy";
import Visa from "../Screens/VisaScreen/Visa";
import CurrencyConverter from "../Screens/CurrencyConverterScreen/CurrencyConverter";
import PhraseBook from "../Screens/PhraseBookScreen/PhraseBook";
import PackingChecklist from "../Screens/PackingChecklistScreen/PackingChecklist";
import PassportDetails from "../Screens/PassportDetailsScreen/PassportDetails";
import EmergencyContacts from "../Screens/EmergencyContactsScreen/EmergencyContacts";
import Weather from "../Screens/WeatherScreen/Weather";
import VisaChecklist from "../Screens/VisaChecklistScreen/VisaChecklist";
import SupportCenter from "../Screens/SupportCenterScreen/SupportCenter";
import FAQ from "../Screens/FAQScreens/FAQScreen/FAQ";
import FAQAnswers from "../Screens/FAQScreens/FAQAnswersScreen/FAQAnswers";
import ContactUs from "../Screens/ContactUsScreen/ContactUs";
import YourTickets from "../Screens/YourTicketsScreen/YourTickets";
import TicketsConversation from "../Screens/TicketsConversationScreen/TicketsConversation";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";
import PDFViewerAndroid from "../Screens/PDFViewerScreen/PDFViewerAndroid";

const MainStack = createStackNavigator(
  {
    Starter: {
      screen: Starter
    },
    AppHome: {
      screen: HomeTabs,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    MobileNumber: {
      screen: MobileNumber
    },
    BookedItinerary: {
      screen: BookedItinerary
    },
    BookedPlaces: {
      screen: Places
    },
    BookedNearBy: {
      screen: NearBy
    },
    VisaBooked: {
      screen: Visa
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
    },
    TicketsConversation: {
      screen: TicketsConversation
    },
    PDFViewerScreen: {
      screen: PDFViewerAndroid
    }
  },
  {
    transitionConfig
  }
);

MainStack.navigationOptions = () => {
  let drawerLockMode = "locked-closed";

  return {
    drawerLockMode
  };
};

export default MainStack;
