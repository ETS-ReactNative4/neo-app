import React from "react";
import {
  createStackNavigator,
  StackNavigationProp
} from "@react-navigation/stack";
import ListingPage from "../Screens/ListingPageScreen/ListingPage";
import { SCREEN_LISTING_PAGE } from "./ScreenNames";
import { RouteProp } from "@react-navigation/native";

export type ListingPageType = {
  slug?: string;
};

export type ModalNavigatorParamsType = {
  [SCREEN_LISTING_PAGE]: ListingPageType;
};

export type ModalStackNavigatorProps<
  T extends keyof ModalNavigatorParamsType
> = {
  navigation: StackNavigationProp<ModalNavigatorParamsType, T>;
  route: RouteProp<ModalNavigatorParamsType, T>;
};

/**
 * Data created to check if the screen is part of modal in the
 * resolveLinks function
 */
export const modalStackData: ModalNavigatorParamsType = {
  [SCREEN_LISTING_PAGE]: {}
};

const Stack = createStackNavigator<ModalNavigatorParamsType>();

const { Navigator, Screen } = Stack;

const ModalStack = () => {
  return (
    <Navigator headerMode="none">
      <Screen name={SCREEN_LISTING_PAGE} component={ListingPage} />
    </Navigator>
  );
};

export default ModalStack;
