import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SCREEN_APP_LOGIN,
  SCREEN_STARTER,
  SCREEN_TRAVEL_PROFILE_WELCOME
} from "./ScreenNames";
import AppLogin from "../Screens/AppLoginScreen/AppLogin";
import Starter from "../Screens/StartingScreen/Starter";
import TravelProfileWelcome from "../Screens/TravelProfileWelcomeScreen/TravelProfileWelcome";

export type AppNavigatorParamsType = {
  [SCREEN_APP_LOGIN]: undefined;
  [SCREEN_STARTER]: undefined;
  [SCREEN_TRAVEL_PROFILE_WELCOME]: undefined;
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
    </Navigator>
  );
};

export default AppNavigator;
