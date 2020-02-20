import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import TravelProfileIntro from "./Components/TravelProfileIntro";
import {
  SCREEN_TRAVEL_PROFILE_WELCOME,
  SCREEN_TRAVEL_COUNTRY_PICKER
} from "../../NavigatorsV2/ScreenNames";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParamsType } from "../../NavigatorsV2/AppNavigator";
import WelcomeHeader from "../../NavigatorsV2/Components/WelcomeHeader";
import TravelProfileActionSheet from "../TravelProfileCityScreen/Components/TravelProfileActionSheet";
import { IInteractable } from "react-native-interactable";

type screenName = typeof SCREEN_TRAVEL_PROFILE_WELCOME;

export type StarterScreenNavigationProp = StackNavigationProp<
  AppNavigatorParamsType,
  screenName
>;

export interface TravelProfileWelcomeProps {
  navigation: StarterScreenNavigationProp;
}

const TravelProfileWelcome = ({ navigation }: TravelProfileWelcomeProps) => {
  const actionSheetRef = useRef<IInteractable>();

  const skipScreen = () => {};

  const continueFlow = () => {
    // @ts-ignore - Lack of typescript support in actionsheet's ref
    actionSheetRef?.current?.snapTo({ index: 1 });
  };

  const flowPositive = () => {
    navigation.navigate(SCREEN_TRAVEL_COUNTRY_PICKER, {
      isPositive: true
    });
  };

  const flowNegative = () => {
    navigation.navigate(SCREEN_TRAVEL_COUNTRY_PICKER, {
      isPositive: false
    });
  };

  useEffect(() => {
    navigation.setOptions({
      header: options =>
        WelcomeHeader(options, {
          rightLinkText: "Do this later",
          onRightLinkClick: skipScreen
        })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.travelProfileWelcomeContainer}>
        <TravelProfileIntro onClickContinue={continueFlow} />
      </View>
      <TravelProfileActionSheet
        positiveAction={flowPositive}
        negativeAction={flowNegative}
        actionSheetRef={actionSheetRef}
      />
    </>
  );
};

const styles = StyleSheet.create({
  travelProfileWelcomeContainer: {
    flex: 1
  }
});

export default TravelProfileWelcome;
