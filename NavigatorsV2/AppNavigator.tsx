import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREEN_APP_LOGIN } from "./ScreenNames";
import AppLogin from "../Screens/AppLoginScreen/AppLogin";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREEN_APP_LOGIN} component={AppLogin} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
