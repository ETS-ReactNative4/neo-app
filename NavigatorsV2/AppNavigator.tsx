import React, { Fragment } from "react";
import {
  createStackNavigator,
  StackNavigationProp
} from "@react-navigation/stack";
import { StatusBar } from "react-native";
import {
  SCREEN_APP_LOGIN,
  SCREEN_STARTER,
  SCREEN_TRAVEL_PROFILE_WELCOME,
  SCREEN_TRAVEL_COUNTRY_PICKER,
  SCREEN_TRAVEL_MARITAL_STATUS,
  SCREEN_STORY_BOOK,
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_EXPLORE_PAGE,
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
  SCREEN_ABOUT_SCREEN
} from "./ScreenNames";
import AppLogin from "../Screens/AppLoginScreen/AppLogin";
import Starter from "../Screens/StartingScreen/Starter";
import TravelProfileWelcome from "../Screens/TravelProfileWelcomeScreen/TravelProfileWelcome";
import TravelProfileCity from "../Screens/TravelProfileCityScreen/TravelProfileCity";
import MaritalStatus from "../Screens/MaritalStatusScreen/MaritalStatus";
import StorybookUIRoot from "../storybook/Storybook";
import PreTripHomeTabs, { PreTripHomeTabsType } from "./PreTripHomeTabs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import ModalStack, { ModalNavigatorParamsType } from "./ModalStack";
import { CONSTANT_white } from "../constants/colorPallete";
import { RouteProp } from "@react-navigation/native";
import { IItineraryNotification } from "../Screens/NotificationsScreen/Notifications";
import NotificationDetails from "../Screens/NotificationDetailsScreen/NotificationDetails";
import NotificationsFaq from "../Screens/NotificationsFaqScreen/NotificationsFaq";
import PostBookingHomeTabs, {
  PostBookingHomeTabsType
} from "./PostBookingHomeTabs";
import YourBookings from "../Screens/YourBookingsScreen/YourBookings";
import PostBookingIntro, {
  IPostBookingIntroData
} from "../Screens/PostBookingIntroScreen/PostBookingIntro";
import AgentInfo from "../Screens/AgentInfoScreen/AgentInfo";
import { IPocCardPropsData } from "../Screens/AgentInfoScreen/Components/AgentPocCard";
import AgentFeedback from "../Screens/AgentFeedbackScreen/AgentFeedback";
import PromoLanding from "../Screens/PromoLandingScreen/PromoLanding";
import UltimateMenu from "../Screens/UltimateMenuScreen/UltimateMenu";
import TravellerProfileDetails from "../Screens/TravellerProfileDetailsScreen/TravellerProfileDetails";
import EditTravellerProfileDetails from "../Screens/TravellerProfileDetailsScreen/Components/EditTravellerProfileDetails";
import About from "../Screens/AboutScreen/About";

export type AppNavigatorParamsType = {
  [SCREEN_MODAL_STACK]: StackNavigationProp<ModalNavigatorParamsType>;
  [SCREEN_PRETRIP_HOME_TABS]: BottomTabNavigationProp<PreTripHomeTabsType>;
  [SCREEN_POST_BOOKING_HOME]: BottomTabNavigationProp<PostBookingHomeTabsType>;
  [SCREEN_APP_LOGIN]: {
    // PT TODO: create an enum from list of screens that are allowed transition from loginScreen
    resetTarget?: typeof SCREEN_EXPLORE_PAGE;
  };
  [SCREEN_STARTER]: undefined;
  [SCREEN_TRAVEL_PROFILE_WELCOME]: undefined;
  [SCREEN_TRAVEL_COUNTRY_PICKER]: {
    isPositive: boolean;
  };
  [SCREEN_TRAVEL_MARITAL_STATUS]: {
    isPositive: boolean;
  };
  [SCREEN_STORY_BOOK]: undefined;
  [SCREEN_NOTIFICATION_DETAILS]: {
    notification: IItineraryNotification;
  };
  [SCREEN_NOTIFICATION_FAQ]: {
    itineraryId: string;
  };
  [SCREEN_YOUR_BOOKINGS]: undefined;
  [SCREEN_POST_BOOKING_INTRO]: { introData: IPostBookingIntroData[] };
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
};

const Stack = createStackNavigator<AppNavigatorParamsType>();

export type AppNavigatorProps<T extends keyof AppNavigatorParamsType> = {
  navigation: StackNavigationProp<AppNavigatorParamsType, T>;
  route: RouteProp<AppNavigatorParamsType, T>;
};

const { Navigator, Screen } = Stack;

const AppNavigator = () => {
  return (
    <Fragment>
      <StatusBar
        translucent={false}
        barStyle={"dark-content"}
        backgroundColor={CONSTANT_white}
      />
      <Navigator initialRouteName={SCREEN_STARTER} headerMode="screen">
        <Screen
          name={SCREEN_PRETRIP_HOME_TABS}
          options={{ headerShown: false }}
          component={PreTripHomeTabs}
        />
        <Screen
          name={SCREEN_POST_BOOKING_HOME}
          options={{ headerShown: false }}
          component={PostBookingHomeTabs}
        />
        <Screen
          name={SCREEN_PROMO_PAGE}
          options={{ headerShown: false }}
          component={PromoLanding}
        />
        <Screen
          options={{
            headerShown: false
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
            headerShown: false
          }}
          component={ModalStack}
        />
        <Screen
          name={SCREEN_NOTIFICATION_DETAILS}
          options={{
            headerShown: false
          }}
          component={NotificationDetails}
        />
        <Screen name={SCREEN_NOTIFICATION_FAQ} component={NotificationsFaq} />
        <Screen
          options={{
            headerShown: false
          }}
          name={SCREEN_STORY_BOOK}
          component={StorybookUIRoot}
        />
        <Screen
          name={SCREEN_YOUR_BOOKINGS}
          options={{
            headerShown: false
          }}
          component={YourBookings}
        />
        <Screen
          options={{
            headerShown: false
          }}
          name={SCREEN_POST_BOOKING_INTRO}
          component={PostBookingIntro}
        />
        <Screen
          options={{
            headerShown: false
          }}
          name={SCREEN_AGENT_INFO}
          component={AgentInfo}
        />
        <Screen
          options={{
            headerShown: false
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
            headerShown: false
          }}
          name={SCREEN_ULTIMATE_MENU}
          component={UltimateMenu}
        />
        <Screen name={SCREEN_ABOUT_SCREEN} component={About} />
      </Navigator>
    </Fragment>
  );
};

export default AppNavigator;
