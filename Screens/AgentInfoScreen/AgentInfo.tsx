import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import AgentPocCard, { IPocCardPropsData } from "./Components/AgentPocCard";

import {
  CONSTANT_passIcon,
  CONSTANT_visaRelatedFaqIcon,
  CONSTANT_paymentIcon,
  CONSTANT_defaultPlaceImage,
  CONSTANT_agentIntroBgPattern
} from "../../constants/imageAssets";

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

const pocCardData: IPocCardPropsData[] = [
  {
    title: "Superstar support",
    description: "The travel vouchers you need for your trip",
    iconName: `${CONSTANT_passIcon}`
  },
  {
    title: "Visa assistance",
    description: "The travel vouchers you need for your trip",
    iconName: `${CONSTANT_visaRelatedFaqIcon}`
  },
  {
    title: "Payments",
    description: "The travel vouchers you need for your trip",
    iconName: `${CONSTANT_paymentIcon}`
  }
];

const { createAnimatableComponent } = Animatable;

const AnimatableView = createAnimatableComponent(View);

/* GUTTER SPACER */
const GUTTER_SPACING = 32;

const BOTTOM_SPACING = GUTTER_SPACING - 8;
const LEFT_SPACING = GUTTER_SPACING;
const RIGHT_SPACING = GUTTER_SPACING;

const AgentInfo = () => {
  return (
    <View style={styles.agentInfoContainer}>
      <SmartImageV2
        source={CONSTANT_agentIntroBgPattern}
        fallbackSource={{ uri: CONSTANT_defaultPlaceImage }}
        style={styles.imageStyle}
      />

      <AnimatableView animation="fadeInUp" delay={1000} duration={2500}>
        <AgentInfoText
          agentImage={"https://i.imgur.com/yfA9V3g.png"}
          agentName={"Sunil Sathyaraj"}
          agentDescription={"Your onboarding expert"}
        />
      </AnimatableView>

      <AnimatableView animation="fadeInUp" delay={3500} duration={2000}>
        <Text style={styles.agentHelloText}>
          Hello, I’ll be helping you with all of these
        </Text>
      </AnimatableView>

      <AgentPocCard
        containerStyle={styles.agentPocCardStyle}
        animation="slideInRight"
        pocCardData={pocCardData}
        delay={5900}
        duration={2000}
        successiveDelay={2000}
      />

      <AnimatableView
        animation="fadeInUp"
        delay={7900 + 2000 * pocCardData.length}
        duration={2000}
        style={styles.buttonWrapperStyle}
      >
        <PrimaryButton
          text={"Submit"}
          clickAction={() => Alert.alert("Click Submit Button")}
        />
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
    resizeMode: "cover",
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

export default AgentInfo;
