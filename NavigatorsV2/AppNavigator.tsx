import React, {Fragment} from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import {
  SCREEN_APP_LOGIN,
  SCREEN_STARTER,
  SCREEN_TRAVEL_PROFILE_WELCOME,
  SCREEN_TRAVEL_COUNTRY_PICKER,
  SCREEN_TRAVEL_MARITAL_STATUS,
  SCREEN_STORY_BOOK,
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_MODAL_STACK,
  SCREEN_NOTIFICATION_DETAILS,
  SCREEN_NOTIFICATION_FAQ,
  SCREEN_POST_BOOKING_HOME,
  SCREEN_YOUR_BOOKINGS,
  SCREEN_POST_BOOKING_INTRO,
  SCREEN_AGENT_FEEDBACK,
  SCREEN_AGENT_INFO,
  SCREEN_PROMO_PAGE,
  SCREEN_ULTIMATE_MENU,
  SCREEN_TRAVELLER_PROFILE,
  SCREEN_EDIT_TRAVELLER_PROFILE,
  SCREEN_ABOUT_SCREEN,
  SCREEN_SAVED_ITINERARIES,
  SCREEN_TRIP_INTENSITY,
  SCREEN_ITINERARY,
  SCREEN_REQUEST_CALLBACK,
  SCREEN_GCM,
  SCREEN_GCM_CITY_PICKER,
  SCREEN_GCM_ROOM_CONFIG,
  SCREEN_BOOKED_ITINERARY,
  SCREEN_FAQ,
  SCREEN_CONTACT_US,
  SCREEN_TICKETS_CONVERSATION,
  SCREEN_YOUR_TICKETS,
  SCREEN_CURRENCY_CONVERTER,
  SCREEN_PHRASE_BOOK,
  SCREEN_PACKING_CHECKLIST,
  SCREEN_PASSPORT_DETAILS,
  SCREEN_EMERGENCY_CONTACTS,
  SCREEN_WEATHER,
  SCREEN_PLACES,
  SCREEN_NEAR_BY,
  SCREEN_VISA,
  SCREEN_VISA_CHECKLIST,
  SCREEN_VISA_DOCS_CHECKLIST,
  SCREEN_VISA_STATUS,
  SCREEN_VISA_HELP,
  SCREEN_SUPPORT_CENTER,
  SCREEN_FOREX,
  SCREEN_VISA_SELECTOR,
  SCREEN_JOURNAL_START,
  SCREEN_JOURNAL_SETUP,
  SCREEN_JOURNAL_DAY_SELECTOR,
  SCREEN_JOURNAL_IMAGE_PICKER,
  SCREEN_JOURNAL_TEXT_EDITOR,
  SCREEN_JOURNAL_PUBLISH,
  SCREEN_JOURNAL_SHARE,
  SCREEN_PAYMENT_HOME,
  SCREEN_PAYMENT_SUMMARY,
  SCREEN_PAYMENT_SCREEN,
  SCREEN_PAYMENT_SUCCESS,
  SCREEN_PAYMENT_FAILURE,
  SCREEN_BUDGET_PREFERENCES,
  SCREEN_VISA_DOCUMENT_ACTION_SHEET,
  SCREEN_NOTIFICATION_ANSWER,
  SCREEN_GCM_NATIONALITY_PICKER,
  SCREEN_SEARCH_LISTING_CARDS_PAGE,
  SCREEN_LISTING_PAGE,
  SCREEN_PRE_TRIP_INTRO,
  SCREEN_NOTIFICATION_TAB,
  SCREEN_STAY_SEARCH,
  SCREEN_STAY_HOTEL_DETAIL,
  SCREEN_STAY_HOTEL_REVIEW,
  SCREEN_STAY_HOTEL_LIST,
} from './ScreenNames';
import AppLogin from '../Screens/AppLoginScreen/AppLogin';
import Starter from '../Screens/StartingScreen/Starter';
import TravelProfileWelcome from '../Screens/TravelProfileWelcomeScreen/TravelProfileWelcome';
import TravelProfileCity from '../Screens/TravelProfileCityScreen/TravelProfileCity';
import MaritalStatus from '../Screens/MaritalStatusScreen/MaritalStatus';
import StorybookUIRoot from '../storybook/Storybook';
import PreTripHomeTabs from './PreTripHomeTabs';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import ModalStack, {ModalNavigatorParamsType} from './ModalStack';
import {CONSTANT_white} from '../constants/colorPallete';
import {RouteProp} from '@react-navigation/native';
import Notifications, {
  IItineraryNotification,
} from '../Screens/NotificationsScreen/Notifications';
import NotificationDetails from '../Screens/NotificationDetailsScreen/NotificationDetails';
import NotificationsFaq from '../Screens/NotificationsFaqScreen/NotificationsFaq';
import PostBookingHomeTabs, {
  PostBookingHomeTabsType,
} from './PostBookingHomeTabs';
import YourBookings from '../Screens/YourBookingsScreen/YourBookings';
import PostBookingIntro from '../Screens/PostBookingIntroScreen/PostBookingIntro';
import AgentInfo from '../Screens/AgentInfoScreen/AgentInfo';
import {IPocCardPropsData} from '../Screens/AgentInfoScreen/Components/AgentPocCard';
import AgentFeedback from '../Screens/AgentFeedbackScreen/AgentFeedback';
import PromoLanding from '../Screens/PromoLandingScreen/PromoLanding';
import UltimateMenu from '../Screens/UltimateMenuScreen/UltimateMenu';
import TravellerProfileDetails from '../Screens/TravellerProfileDetailsScreen/TravellerProfileDetails';
import EditTravellerProfileDetails from '../Screens/TravellerProfileDetailsScreen/Components/EditTravellerProfileDetails';
import About from '../Screens/AboutScreen/About';
import SavedItinerary from '../Screens/SavedItineraryScreen/SavedItinerary';
import TripIntensity from '../Screens/TripIntensityScreen/TripIntensity';
import Itinerary, {
  itinerarySourceType,
} from '../Screens/ItineraryScreen/Itinerary';
import RequestCallback from '../Screens/RequestCallback/RequestCallback';
import GCM from '../Screens/GCMScreen/GCM';
import GCMCityPicker from '../Screens/GCMCityPickerScreen/GCMCityPicker';
import {
  IIndianCity,
  IHotelGuestRoomConfig,
  ICostingConfig,
} from '../Screens/GCMScreen/hooks/useGCMForm';
import GCMRoomConfig from '../Screens/GCMRoomConfig/GCMRoomConfig';
import BookedItinerary from '../Screens/BookedItineraryScreen/BookedItinerary';
import FAQ from '../Screens/FAQScreens/FAQScreen/FAQ';
import ContactUs from '../Screens/ContactUsScreen/ContactUs';
import TicketsConversation from '../Screens/TicketsConversationScreen/TicketsConversation';
import YourTickets from '../Screens/YourTicketsScreen/YourTickets';
import CurrencyConverter from '../Screens/CurrencyConverterScreen/CurrencyConverter';
import PhraseBook from '../Screens/PhraseBookScreen/PhraseBook';
import PackingChecklist from '../Screens/PackingChecklistScreen/PackingChecklist';
import PassportDetails from '../Screens/PassportDetailsScreen/PassportDetails';
import EmergencyContacts from '../Screens/EmergencyContactsScreen/EmergencyContacts';
import Weather from '../Screens/WeatherScreen/Weather';
import Places from '../Screens/PlacesScreen/Places';
import NearBy from '../Screens/NearByScreen/NearBy';
import Visa from '../Screens/VisaScreen/Visa';
import VisaSelector from '../Screens/VisaSelectorScreen/VisaSelector';
import VisaChecklist from '../Screens/VisaChecklistScreen/VisaChecklist';
import VisaDocsChecklist from '../Screens/VisaDocsChecklistScreen/VisaDocsChecklist';
import VisaStatus from '../Screens/VisaStatusScreen/VisaStatus';
import VisaHelp from '../Screens/VisaHelpScreen/VisaHelp';
import SupportCenter from '../Screens/SupportCenterScreen/SupportCenter';
import Forex from '../Screens/ForexScreen/Forex';
import JournalStart from '../Screens/JournalStartScreen/JournalStart';
import JournalSetup from '../Screens/JournalSetupScreen/JournalSetup';
import JournalDaySelector from '../Screens/JournalDaySelectorScreen/JournalDaySelector';
import JournalImagePicker from '../Screens/JournalImagePickerScreen/JournalImagePicker';
import JournalTextEditor from '../Screens/JournalTextEditorScreen/JournalTextEditor';
import JournalPublish from '../Screens/JournalPublishScreen/JournalPublish';
import JournalShare from '../Screens/JournalShareScreen/JournalShare';
import PaymentHome from '../Screens/PaymentHomeScreen/PaymentHome';
import PaymentSummary from '../Screens/PaymentSummaryScreen/PaymentSummary';
import PaymentSuccess from '../Screens/PaymentScreens/PaymentSuccess';
import PaymentFailure from '../Screens/PaymentScreens/PaymentFailure';
import PaymentScreen from '../Screens/PaymentScreens/PaymentScreen';
import BudgetPreferences from '../Screens/BudgetPreferencesScreen/BudgetPreferences';
import VisaDocumentsActionSheet from '../Screens/VisaDocumentsActionSheet/VisaDocumentsActionSheet';
import {leadSourceProdType} from '../Screens/RequestCallback/hooks/useRequestCallbackApi';
import NotificationsAnswer from '../Screens/NotificationsAnswerScreen/NotificationsAnswer';
import GCMNationalityPicker, {
  INationalityOption,
} from '../Screens/GCMNationalityPicker/GCMNationalityPicker';
import SearchListingCardsPage from '../Screens/SearchListingCardsPage/SearchListingCardsPage';
import ListingPage from '../Screens/ListingPageScreen/ListingPage';
import PreTripIntroScreen from '../Screens/PreTripIntroScreen/PreTripIntroScreen';
import {IIntroData} from '../Screens/IntroScreen/IntroScreen';
import StayHotelSearchScreen from '../Screens/StayHotelSearchScreen/StayHotelSearchScreen';
import StayHotelDetailScreen from '../Screens/StayHotelDetailScreen/StayHotelDetailScreen';
import StayHotelReviewScreen from '../Screens/StayHotelReviewScreen/StayHotelReviewScreen';
import StayHotelListScreen from '../Screens/StayHotelListScreen/StayHotelListScreen';

export type loginResetTargetTypes = typeof SCREEN_SAVED_ITINERARIES;

export type loginLaunchSourceTypes = 'PRETRIP_WELCOME_FLOW';

export type AppNavigatorParamsType = {
  [SCREEN_MODAL_STACK]: StackNavigationProp<ModalNavigatorParamsType>;
  [SCREEN_PRETRIP_HOME_TABS]: {screen?: string};
  [SCREEN_POST_BOOKING_HOME]: BottomTabNavigationProp<PostBookingHomeTabsType>;
  [SCREEN_APP_LOGIN]: {
    resetTarget?: loginResetTargetTypes;
    launchSource?: loginLaunchSourceTypes;
    passThrough?: {
      screenName: string;
      params?: object;
    };
    deeplink?: boolean;
  };
  [SCREEN_SEARCH_LISTING_CARDS_PAGE]: {
    searchString: string;
  };
  [SCREEN_LISTING_PAGE]: {
    slug?: string;
    apiUrl?: string;
  };
  [SCREEN_STARTER]: undefined;
  [SCREEN_TRAVEL_PROFILE_WELCOME]: undefined;
  [SCREEN_TRAVEL_COUNTRY_PICKER]:
    | undefined
    | {
        isPositive: boolean;
      };
  [SCREEN_TRAVEL_MARITAL_STATUS]:
    | undefined
    | {
        isPositive: boolean;
      };
  [SCREEN_TRIP_INTENSITY]: undefined;
  [SCREEN_BUDGET_PREFERENCES]: undefined;
  [SCREEN_STORY_BOOK]: undefined;
  [SCREEN_NOTIFICATION_DETAILS]: {
    notification: IItineraryNotification;
  };
  [SCREEN_NOTIFICATION_FAQ]: {
    itineraryId: string;
    isDomestic: boolean;
  };
  [SCREEN_NOTIFICATION_ANSWER]: {
    title: string;
    disableMessaging: boolean;
    getFaqByType: (type: string) => any;
  };
  [SCREEN_YOUR_BOOKINGS]: undefined;
  [SCREEN_POST_BOOKING_INTRO]: {introData: IIntroData[]};
  [SCREEN_AGENT_INFO]: {
    itineraryId: string;
    ownerName: string;
    ownerImage: string;
    pocCardData: IPocCardPropsData[];
  };
  [SCREEN_AGENT_FEEDBACK]: undefined;
  [SCREEN_PROMO_PAGE]: {
    slug: string;
    promoData: string;
  };
  [SCREEN_ULTIMATE_MENU]: undefined;
  [SCREEN_TRAVELLER_PROFILE]: undefined;
  [SCREEN_EDIT_TRAVELLER_PROFILE]: undefined;
  [SCREEN_ABOUT_SCREEN]: undefined;
  [SCREEN_SAVED_ITINERARIES]: undefined;
  [SCREEN_ITINERARY]: {
    slug?: string;
    itineraryId?: string;
    itinerarySource: itinerarySourceType;
  };
  [SCREEN_REQUEST_CALLBACK]: {
    campaignItineraryId?: string;
    itineraryId?: string;
    slug?: string;
    prodType: leadSourceProdType;
  };
  [SCREEN_GCM]: {
    title: string;
    bannerImage: string;
    costingConfig: ICostingConfig | null;
    campaignItineraryId?: string;
    itineraryId?: string;
    onSubmit: (config: ICostingConfig) => any;
  };
  [SCREEN_GCM_CITY_PICKER]: {
    title: string;
    onSelect: (selectedCity: IIndianCity) => any;
    bannerImage: string;
  };
  [SCREEN_GCM_NATIONALITY_PICKER]: {
    title: string;
    onSelect: (selectedOption: INationalityOption) => any;
    bannerImage: string;
  };
  [SCREEN_GCM_ROOM_CONFIG]: {
    title: string;
    onSelect: (selectedConfig: IHotelGuestRoomConfig[]) => any;
    bannerImage: string;
    roomConfig: IHotelGuestRoomConfig[];
  };
  [SCREEN_BOOKED_ITINERARY]: {
    selectedDate: string;
  };
  [SCREEN_FAQ]: {
    title: string;
    disableMessaging?: boolean;
  };
  [SCREEN_CONTACT_US]: {
    title: string;
  };
  [SCREEN_TICKETS_CONVERSATION]: {
    title: string;
    status: 'Closed' | 'Open';
    ticketId: string;
  };
  [SCREEN_YOUR_TICKETS]: undefined;
  [SCREEN_CURRENCY_CONVERTER]: undefined;
  [SCREEN_PHRASE_BOOK]: undefined;
  [SCREEN_PACKING_CHECKLIST]: undefined;
  [SCREEN_PASSPORT_DETAILS]: undefined;
  [SCREEN_EMERGENCY_CONTACTS]: undefined;
  [SCREEN_WEATHER]: undefined;
  [SCREEN_PLACES]: {
    city: string;
  };
  [SCREEN_NEAR_BY]: {
    searchQuery: string;
    city: object;
    title: string;
  };
  [SCREEN_VISA]: {
    country?: string;
  };
  [SCREEN_VISA_SELECTOR]: undefined;
  [SCREEN_VISA_CHECKLIST]: undefined;
  [SCREEN_VISA_DOCS_CHECKLIST]: {
    visaId: string;
    screenTitle: string;
  };
  [SCREEN_VISA_STATUS]: {
    screenTitle: string;
    enableRightButton: boolean;
    rightButtonAction: () => any;
    visaId: string;
  };
  [SCREEN_VISA_HELP]: {
    visaId: string;
  };
  [SCREEN_SUPPORT_CENTER]: undefined;
  [SCREEN_FOREX]: undefined;
  [SCREEN_JOURNAL_START]: {
    isEditing: boolean;
  };
  [SCREEN_JOURNAL_SETUP]: undefined;
  [SCREEN_JOURNAL_DAY_SELECTOR]: {
    activeStory: string;
    activePage: string;
    title: string;
    info: string;
  };
  [SCREEN_JOURNAL_IMAGE_PICKER]: {
    activeStory: string;
    activePage: string;
  };
  [SCREEN_JOURNAL_TEXT_EDITOR]: {
    activeStory: string;
    activePage: string;
    isEditMode: boolean;
    selectedImagesList: object[];
  };
  [SCREEN_JOURNAL_PUBLISH]: {
    activeStory: string;
    activePage: string;
    isStoryMode: boolean;
  };
  [SCREEN_JOURNAL_SHARE]: undefined;
  [SCREEN_PAYMENT_HOME]: undefined;
  [SCREEN_PAYMENT_SUMMARY]: {
    itineraryId: string;
    itineraryName: string;
  };
  [SCREEN_PAYMENT_SCREEN]: {
    transactionId: string;
    paymentScript: string;
  };
  [SCREEN_PAYMENT_SUCCESS]: {
    transactionId: string;
  };
  [SCREEN_PAYMENT_FAILURE]: undefined;
  [SCREEN_VISA_DOCUMENT_ACTION_SHEET]: {
    visaId: string;
    toggleOverlay: () => any;
  };
  [SCREEN_PRE_TRIP_INTRO]: undefined;
  [SCREEN_NOTIFICATION_TAB]: undefined;
  [SCREEN_STAY_HOTEL_DETAIL]: undefined;
  [SCREEN_STAY_HOTEL_REVIEW]: undefined;
  [SCREEN_STAY_HOTEL_LIST]: undefined;
};

const Stack = createStackNavigator<AppNavigatorParamsType>();

export type AppNavigatorProps<T extends keyof AppNavigatorParamsType> = {
  navigation: StackNavigationProp<AppNavigatorParamsType, T>;
  route: RouteProp<AppNavigatorParamsType, T>;
};

const {Navigator, Screen} = Stack;

const AppNavigator = () => {
  return (
    <Fragment>
      <StatusBar
        translucent={false}
        barStyle={'dark-content'}
        backgroundColor={CONSTANT_white}
      />
      <Navigator initialRouteName={SCREEN_STARTER} headerMode="screen">
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_PRE_TRIP_INTRO}
          component={PreTripIntroScreen}
        />
        <Screen
          name={SCREEN_PRETRIP_HOME_TABS}
          options={{headerShown: false}}
          component={PreTripHomeTabs}
        />
        <Screen
          name={SCREEN_SEARCH_LISTING_CARDS_PAGE}
          options={{headerShown: false}}
          component={SearchListingCardsPage}
        />
        <Screen
          name={SCREEN_LISTING_PAGE}
          options={{headerShown: false}}
          component={ListingPage}
        />
         <Screen
          name={SCREEN_STAY_SEARCH}
          options={{headerShown: false}}
          component={StayHotelSearchScreen}
        />
         <Screen
          name={SCREEN_STAY_HOTEL_LIST}
          options={{headerShown: false}}
          component={StayHotelListScreen}
        />
         <Screen
          name={SCREEN_STAY_HOTEL_DETAIL}
          options={{headerShown: false}}
          component={StayHotelDetailScreen}
        />
                 <Screen
          name={SCREEN_STAY_HOTEL_REVIEW}
          options={{headerShown: false}}
          component={StayHotelReviewScreen}
        />
        <Screen
          name={SCREEN_NOTIFICATION_TAB}
          options={{headerShown: false}}
          component={Notifications}
        />
        <Screen
          name={SCREEN_POST_BOOKING_HOME}
          options={{headerShown: false}}
          component={PostBookingHomeTabs}
        />
        <Screen
          name={SCREEN_PROMO_PAGE}
          options={{headerShown: false}}
          component={PromoLanding}
        />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_STARTER}
          component={Starter}
        />
        <Screen name={SCREEN_APP_LOGIN} component={AppLogin} />
        <Screen
          name={SCREEN_TRAVEL_PROFILE_WELCOME}
          component={TravelProfileWelcome}
        />
        <Screen
          name={SCREEN_TRAVEL_COUNTRY_PICKER}
          component={TravelProfileCity}
        />
        <Screen name={SCREEN_TRAVEL_MARITAL_STATUS} component={MaritalStatus} />
        <Screen
          name={SCREEN_MODAL_STACK}
          options={{
            headerShown: false,
          }}
          component={ModalStack}
        />
        <Screen
          name={SCREEN_NOTIFICATION_DETAILS}
          options={{
            headerShown: false,
          }}
          component={NotificationDetails}
        />
        <Screen name={SCREEN_NOTIFICATION_FAQ} component={NotificationsFaq} />
        <Screen
          name={SCREEN_NOTIFICATION_ANSWER}
          component={NotificationsAnswer}
        />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_STORY_BOOK}
          component={StorybookUIRoot}
        />
        <Screen
          name={SCREEN_YOUR_BOOKINGS}
          options={{
            headerShown: false,
          }}
          component={YourBookings}
        />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_POST_BOOKING_INTRO}
          component={PostBookingIntro}
        />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_AGENT_INFO}
          component={AgentInfo}
        />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_AGENT_FEEDBACK}
          component={AgentFeedback}
        />
        <Screen
          name={SCREEN_TRAVELLER_PROFILE}
          component={TravellerProfileDetails}
        />
        <Screen
          name={SCREEN_EDIT_TRAVELLER_PROFILE}
          component={EditTravellerProfileDetails}
        />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_ULTIMATE_MENU}
          component={UltimateMenu}
        />
        <Screen name={SCREEN_ABOUT_SCREEN} component={About} />
        <Screen name={SCREEN_SAVED_ITINERARIES} component={SavedItinerary} />
        <Screen name={SCREEN_TRIP_INTENSITY} component={TripIntensity} />
        <Screen
          name={SCREEN_BUDGET_PREFERENCES}
          component={BudgetPreferences}
        />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_ITINERARY}
          component={Itinerary}
        />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_REQUEST_CALLBACK}
          component={RequestCallback}
        />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_GCM}
          component={GCM}
        />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_GCM_CITY_PICKER}
          component={GCMCityPicker}
        />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_GCM_NATIONALITY_PICKER}
          component={GCMNationalityPicker}
        />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_GCM_ROOM_CONFIG}
          component={GCMRoomConfig}
        />
        <Screen name={SCREEN_BOOKED_ITINERARY} component={BookedItinerary} />
        <Screen name={SCREEN_FAQ} component={FAQ} />
        <Screen name={SCREEN_CONTACT_US} component={ContactUs} />
        <Screen name={SCREEN_YOUR_TICKETS} component={YourTickets} />
        <Screen
          name={SCREEN_TICKETS_CONVERSATION}
          component={TicketsConversation}
        />
        <Screen
          name={SCREEN_CURRENCY_CONVERTER}
          component={CurrencyConverter}
        />
        <Screen name={SCREEN_PHRASE_BOOK} component={PhraseBook} />
        <Screen name={SCREEN_PACKING_CHECKLIST} component={PackingChecklist} />
        <Screen name={SCREEN_PASSPORT_DETAILS} component={PassportDetails} />
        <Screen
          name={SCREEN_EMERGENCY_CONTACTS}
          component={EmergencyContacts}
        />
        <Screen name={SCREEN_WEATHER} component={Weather} />
        <Screen name={SCREEN_PLACES} component={Places} />
        <Screen name={SCREEN_NEAR_BY} component={NearBy} />
        <Screen name={SCREEN_VISA} component={Visa} />
        <Screen name={SCREEN_VISA_SELECTOR} component={VisaSelector} />
        <Screen name={SCREEN_VISA_CHECKLIST} component={VisaChecklist} />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_VISA_DOCS_CHECKLIST}
          component={VisaDocsChecklist}
        />
        <Screen name={SCREEN_VISA_STATUS} component={VisaStatus} />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_VISA_HELP}
          component={VisaHelp}
        />
        <Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_VISA_DOCUMENT_ACTION_SHEET}
          component={VisaDocumentsActionSheet}
        />
        <Screen name={SCREEN_SUPPORT_CENTER} component={SupportCenter} />
        <Screen name={SCREEN_FOREX} component={Forex} />
        <Screen name={SCREEN_JOURNAL_START} component={JournalStart} />
        <Screen name={SCREEN_JOURNAL_SETUP} component={JournalSetup} />
        <Screen
          name={SCREEN_JOURNAL_IMAGE_PICKER}
          component={JournalImagePicker}
        />
        <Screen
          name={SCREEN_JOURNAL_TEXT_EDITOR}
          component={JournalTextEditor}
        />
        <Screen
          name={SCREEN_JOURNAL_DAY_SELECTOR}
          component={JournalDaySelector}
        />
        <Screen
          name={SCREEN_JOURNAL_PUBLISH}
          options={{headerShown: false}}
          component={JournalPublish}
        />
        <Screen name={SCREEN_JOURNAL_SHARE} component={JournalShare} />
        <Screen name={SCREEN_PAYMENT_HOME} component={PaymentHome} />
        <Screen name={SCREEN_PAYMENT_SUMMARY} component={PaymentSummary} />
        <Screen name={SCREEN_PAYMENT_SUCCESS} component={PaymentSuccess} />
        <Screen name={SCREEN_PAYMENT_FAILURE} component={PaymentFailure} />
        <Screen
          name={SCREEN_PAYMENT_SCREEN}
          options={{headerShown: false}}
          component={PaymentScreen}
        />
      </Navigator>
    </Fragment>
  );
};

export default AppNavigator;
