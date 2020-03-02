import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SCREEN_APP_LOGIN,
  SCREEN_STARTER,
  SCREEN_TRAVEL_PROFILE_WELCOME,
  SCREEN_TRAVEL_COUNTRY_PICKER,
  SCREEN_TRAVEL_MARITAL_STATUS,
  SCREEN_STORY_BOOK,
  SCREEN_PRETRIP_HOME_TABS
} from "./ScreenNames";
import AppLogin from "../Screens/AppLoginScreen/AppLogin";
import Starter from "../Screens/StartingScreen/Starter";
import TravelProfileWelcome from "../Screens/TravelProfileWelcomeScreen/TravelProfileWelcome";
import TravelProfileCity from "../Screens/TravelProfileCityScreen/TravelProfileCity";
import MaritalStatus from "../Screens/MaritalStatusScreen/MaritalStatus";
import StorybookUIRoot from "../storybook/Storybook";
import PreTripHomeTabs from "./PreTripHomeTabs";

export type AppNavigatorParamsType = {
  [SCREEN_PRETRIP_HOME_TABS]: undefined;
  [SCREEN_APP_LOGIN]: undefined;
  [SCREEN_STARTER]: undefined;
  [SCREEN_TRAVEL_PROFILE_WELCOME]: undefined;
  [SCREEN_TRAVEL_COUNTRY_PICKER]: {
    isPositive: boolean;
  };
  [SCREEN_TRAVEL_MARITAL_STATUS]: {
    isPositive: boolean;
  };
  [SCREEN_STORY_BOOK]: undefined;
};

const Stack = createStackNavigator<AppNavigatorParamsType>();

const { Navigator, Screen } = Stack;

const AppNavigator = () => {
  return (
    <Navigator headerMode="screen">
      <Screen
        options={{
          headerShown: false
        }}
        name={SCREEN_STARTER}
        component={Starter}
      />
      <Screen name={SCREEN_STORY_BOOK} component={StorybookUIRoot} />
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
        name={SCREEN_PRETRIP_HOME_TABS}
        options={{ headerShown: false }}
        component={PreTripHomeTabs}
      />
    </Navigator>
  );
};

export default AppNavigator;
