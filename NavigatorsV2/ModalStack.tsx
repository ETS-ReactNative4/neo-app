import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingPage from "../Screens/ListingPageScreen/ListingPage";
import { SCREEN_LISTING_PAGE } from "./ScreenNames";

export type ModalNavigatorParamsType = {
  [SCREEN_LISTING_PAGE]: undefined;
};

const Stack = createStackNavigator<ModalNavigatorParamsType>();

const { Navigator, Screen } = Stack;

const ModalStack = () => {
  return (
    <Navigator mode="modal" headerMode="none">
      <Screen name={SCREEN_LISTING_PAGE} component={ListingPage} />
    </Navigator>
  );
};

export default ModalStack;
