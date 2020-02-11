import React from "react";
import { StyleSheet, View, Text } from "react-native";

import AgentPocCard, { IPocCardPropsData } from "./Components/AgentPocCard";

import { CONSTANT_agentIntroBgPattern } from "../../constants/imageAssets";

import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import { CONSTANT_black1 } from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import PrimaryButton from "../../CommonComponents/PrimaryButton/PrimaryButton";
import SmartImageV2 from "../../CommonComponents/SmartImage/SmartImageV2";
import AgentInfoText from "../AgentFeedbackScreen/Components/AgentInfoText";
import { isIphoneX } from "react-native-iphone-x-helper";
import { CONSTANT_xSensorAreaHeight } from "../../constants/styles";
import * as Animatable from "react-native-animatable";
import { observer, inject } from "mobx-react";
import UserFlowTransition from "../../mobx/UserFlowTransition";
import Itineraries from "../../mobx/Itineraries";
import { NavigationStackProp } from "react-navigation-stack";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import { openPostBookingHome } from "../../Services/launchPostBooking/launchPostBooking";

const { createAnimatableComponent } = Animatable;

const AnimatableView = createAnimatableComponent(View);

/* GUTTER SPACER */
const GUTTER_SPACING = 32;

const BOTTOM_SPACING = GUTTER_SPACING - 8;
const LEFT_SPACING = GUTTER_SPACING;
const RIGHT_SPACING = GUTTER_SPACING;

export interface AgentInfoProps {
  userFlowTransitionStore: UserFlowTransition;
  itineraries: Itineraries;
  navigation: NavigationStackProp<{
    itineraryId: string;
    ownerName: string;
    ownerImage: string;
    pocCardData: IPocCardPropsData[];
  }>;
}

const AgentInfo = ({
  userFlowTransitionStore,
  itineraries,
  navigation
}: AgentInfoProps) => {
  const ownerName: string = navigation.getParam("ownerName", "");
  const ownerImage: string = navigation.getParam("ownerImage", "");
  const pocCardData: IPocCardPropsData[] = navigation.getParam(
    "pocCardData",
    []
  );

  const onSubmit = () => {
    userFlowTransitionStore
      .userSeenOPSIntro(itineraries.selectedItineraryId)
      .then(result => {
        if (result) {
          openPostBookingHome(navigation);
        } else {
          DebouncedAlert("Error!", "Unable to load data from our server");
        }
      })
      .catch(() => {
        DebouncedAlert("Error!", "Unable to load data from our server");
      });
  };

  const FIRST_ANIMATION_DELAY = 50;
  const FIRST_ANIMATION_DURATION = 400;
  const SECOND_ANIMATION_DELAY =
    1000 + FIRST_ANIMATION_DELAY + FIRST_ANIMATION_DURATION;
  const SECOND_ANIMATION_DURATION = 400;
  const THIRD_ANIMATION_DELAY =
    50 + SECOND_ANIMATION_DELAY + SECOND_ANIMATION_DURATION;
  const THIRD_ANIMATION_DURATION = 400;
  const FOURTH_ANIMATION_DELAY =
    THIRD_ANIMATION_DELAY + pocCardData.length * THIRD_ANIMATION_DURATION;
  const FOURTH_ANIMATION_DURATION = 400;

  return (
    <View style={styles.agentInfoContainer}>
      <SmartImageV2
        source={CONSTANT_agentIntroBgPattern()}
        fallbackSource={CONSTANT_agentIntroBgPattern()}
        style={styles.imageStyle}
        resizeMode={"contain"}
      />

      <AnimatableView
        animation="fadeInUp"
        delay={FIRST_ANIMATION_DELAY}
        duration={FIRST_ANIMATION_DURATION}
      >
        <AgentInfoText
          agentImage={ownerImage}
          agentName={ownerName}
          agentDescription={"Your onboarding expert"}
        />
      </AnimatableView>

      <AnimatableView
        animation="fadeInUp"
        delay={SECOND_ANIMATION_DELAY}
        duration={SECOND_ANIMATION_DURATION}
      >
        <Text style={styles.agentHelloText}>
          Hello, I’ll be helping you with all of these
        </Text>
      </AnimatableView>

      <AgentPocCard
        containerStyle={styles.agentPocCardStyle}
        animation="fadeInRight"
        pocCardData={pocCardData}
        delay={THIRD_ANIMATION_DELAY}
        duration={THIRD_ANIMATION_DURATION}
        successiveDelay={THIRD_ANIMATION_DURATION}
      />

      <AnimatableView
        animation="fadeInUp"
        delay={FOURTH_ANIMATION_DELAY}
        duration={FOURTH_ANIMATION_DURATION}
        style={styles.buttonWrapperStyle}
      >
        <PrimaryButton text={"View your trip details"} clickAction={onSubmit} />
      </AnimatableView>
    </View>
  );
};

AgentInfo.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  agentInfoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },

  imageStyle: {
    width: 205,
    height: 108,
    position: "absolute",
    top: 0,
    left: 0
  },

  agentHelloText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 13),
    textAlign: "center",
    marginBottom: 24
  },

  agentPocCardStyle: {
    paddingHorizontal: GUTTER_SPACING
  },

  buttonWrapperStyle: {
    position: "absolute",
    left: LEFT_SPACING,
    right: RIGHT_SPACING,
    bottom: BOTTOM_SPACING + (isIphoneX() ? CONSTANT_xSensorAreaHeight : 0),
    width: responsiveWidth(100) - LEFT_SPACING - RIGHT_SPACING
  }
});

export default inject("itineraries")(
  inject("userFlowTransitionStore")(observer(AgentInfo))
);
