import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREEN_APP_LOGIN } from "./ScreenNames";
import AppLogin from "../Screens/AppLoginScreen/AppLogin";

const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const AppNavigator = () => {
  return (
    <Navigator headerMode="float">
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
