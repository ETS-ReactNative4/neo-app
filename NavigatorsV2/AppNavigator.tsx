import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SCREEN_APP_LOGIN,
  SCREEN_STARTER,
  SCREEN_TRAVEL_PROFILE_WELCOME,
  SCREEN_TRAVEL_COUNTRY_PICKER
} from "./ScreenNames";
import AppLogin from "../Screens/AppLoginScreen/AppLogin";
import Starter from "../Screens/StartingScreen/Starter";
import TravelProfileWelcome from "../Screens/TravelProfileWelcomeScreen/TravelProfileWelcome";
import TravelProfileCity from "../Screens/TravelProfileCityScreen/TravelProfileCity";

export type AppNavigatorParamsType = {
  [SCREEN_APP_LOGIN]: undefined;
  [SCREEN_STARTER]: undefined;
  [SCREEN_TRAVEL_PROFILE_WELCOME]: undefined;
  [SCREEN_TRAVEL_COUNTRY_PICKER]: {
    isPositive: boolean;
  };
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
      <Screen name={SCREEN_APP_LOGIN} component={AppLogin} />
      <Screen
        name={SCREEN_TRAVEL_PROFILE_WELCOME}
        component={TravelProfileWelcome}
      />
      <Screen
        name={SCREEN_TRAVEL_COUNTRY_PICKER}
        component={TravelProfileCity}
      />
    </Navigator>
  );
};

export default AppNavigator;
