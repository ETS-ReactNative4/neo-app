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
  SCREEN_MODAL_STACK
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

export type AppNavigatorParamsType = {
  [SCREEN_MODAL_STACK]: StackNavigationProp<ModalNavigatorParamsType>;
  [SCREEN_PRETRIP_HOME_TABS]: BottomTabNavigationProp<PreTripHomeTabsType>;
  [SCREEN_APP_LOGIN]: {
    // PT TODO: create an enum from list of screens that are allowed transition from loginScreen
    resetTarget: typeof SCREEN_EXPLORE_PAGE;
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
};

const Stack = createStackNavigator<AppNavigatorParamsType>();

const { Navigator, Screen } = Stack;

const AppNavigator = () => {
  return (
    <Fragment>
      <StatusBar
        translucent={false}
        barStyle={"dark-content"}
        backgroundColor={CONSTANT_white}
      />
      <Navigator
        initialRouteName={SCREEN_PRETRIP_HOME_TABS}
        headerMode="screen"
      >
        <Screen
          name={SCREEN_PRETRIP_HOME_TABS}
          options={{ headerShown: false }}
          component={PreTripHomeTabs}
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
        <Screen name={SCREEN_STORY_BOOK} component={StorybookUIRoot} />
      </Navigator>
    </Fragment>
  );
};

export default AppNavigator;
