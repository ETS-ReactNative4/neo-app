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
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { observer, inject } from "mobx-react";
import TravelProfile from "../../mobx/TravelProfile";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import { CONSTANT_travelProfileFailureText } from "../../constants/appText";
import { CONSTANT_white1 } from "../../constants/colorPallete";
import skipUserProfileBuilder from "../../Services/skipUserProfileBuilder/skipUserProfileBuilder";
import WelcomeState from "../../mobx/WelcomeState";

type screenName = typeof SCREEN_TRAVEL_PROFILE_WELCOME;

export type StarterScreenNavigationProp = StackNavigationProp<
  AppNavigatorParamsType,
  screenName
>;

export interface TravelProfileWelcomeProps {
  navigation: StarterScreenNavigationProp;
  welcomeStateStore: WelcomeState;
  travelProfileStore: TravelProfile;
}

const TravelProfileWelcomeComponent = ({
  travelProfileStore,
  welcomeStateStore,
  navigation
}: TravelProfileWelcomeProps) => {
  const actionSheetRef = useRef<IInteractable>();

  const skipFlow = () => {
    welcomeStateStore.patchWelcomeState(
      "skippedAt",
      SCREEN_TRAVEL_PROFILE_WELCOME
    );
    navigation.dispatch(skipUserProfileBuilder());
  };

  const startFlow = () => {
    // @ts-ignore - Lack of typescript support in actionsheet's ref
    actionSheetRef?.current?.snapTo({ index: 1 });
  };

  const continueFlow = (isPositive: boolean) => {
    travelProfileStore.updateTravelProfileData({
      firstTimeTraveller: isPositive
    });
    welcomeStateStore.patchWelcomeState("seenWelcomeScreen", true);
    navigation.navigate(SCREEN_TRAVEL_COUNTRY_PICKER, {
      isPositive
    });
  };

  useEffect(() => {
    navigation.setOptions({
      header: options =>
        WelcomeHeader(options, {
          rightLinkText: "Skip",
          onRightLinkClick: skipFlow
        })
    });

    Promise.all([
      travelProfileStore.loadCountriesList(),
      travelProfileStore.loadMaritalStatusOptionImages(),
      travelProfileStore.loadTravelProfileOptions()
    ])
      .then(result => {
        const hasfailed = result.some(each => !each);
        if (hasfailed) {
          DebouncedAlert(
            CONSTANT_travelProfileFailureText.header,
            CONSTANT_travelProfileFailureText.message
          );
        }
      })
      .catch(() => {
        DebouncedAlert(
          CONSTANT_travelProfileFailureText.header,
          CONSTANT_travelProfileFailureText.message
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.travelProfileWelcomeContainer}>
        <TravelProfileIntro onClickContinue={startFlow} />
      </View>
      <TravelProfileActionSheet
        positiveAction={() => continueFlow(true)}
        negativeAction={() => continueFlow(false)}
        actionSheetRef={actionSheetRef}
      />
    </>
  );
};

const styles = StyleSheet.create({
  travelProfileWelcomeContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white1
  }
});

const TravelProfileWelcome = ErrorBoundary()(
  inject("welcomeStateStore")(
    inject("travelProfileStore")(observer(TravelProfileWelcomeComponent))
  )
);

export default TravelProfileWelcome;
