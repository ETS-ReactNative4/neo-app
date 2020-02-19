import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREEN_APP_LOGIN, SCREEN_STARTER } from "./ScreenNames";
import AppLogin from "../Screens/AppLoginScreen/AppLogin";
import Starter from "../Screens/StartingScreen/Starter";

export type AppNavigatorParamsType = {
  [SCREEN_APP_LOGIN]: undefined;
  [SCREEN_STARTER]: undefined;
};

const Stack = createStackNavigator<AppNavigatorParamsType>();

const { Navigator, Screen } = Stack;

const AppNavigator = () => {
  return (
    <Navigator headerMode="float">
      <Screen
        options={{
          headerShown: false
        }}
        name={SCREEN_STARTER}
        component={Starter}
      />
      <Screen
        options={{
          headerShown: false
        }}
        name={SCREEN_APP_LOGIN}
        component={AppLogin}
      />
    </Navigator>
  );
};

export default AppNavigator;
