import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import Animated from "react-native-reanimated";

import AgentPocCard, { IPocCardPropsData } from "./Components/AgentPocCard";

import {
  CONSTANT_passIcon,
  CONSTANT_visaRelatedFaqIcon,
  CONSTANT_paymentIcon
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

const { createAnimatedComponent } = Animated;

const AnimatedView = createAnimatedComponent(View);

/* GUTTER SPACER */
const GUTTER_SPACING = 32;

const BOTTOM_SPACING = GUTTER_SPACING - 8;
const LEFT_SPACING = GUTTER_SPACING;
const RIGHT_SPACING = GUTTER_SPACING;

const AgentInfo = () => {
  return (
    <View style={styles.agentInfoContainer}>
      <SmartImageV2
        source={{ uri: "https://i.imgur.com/zW6Eip0.png" }}
        fallbackSource={{ uri: "https://i.imgur.com/zW6Eip0.png" }}
        style={styles.imageStyle}
      />

      <AnimatedView>
        <AgentInfoText
          agentImage={"https://i.imgur.com/yfA9V3g.png"}
          agentName={"Sunil Sathyaraj"}
          agentDescription={"Your onboarding expert"}
        />
      </AnimatedView>

      <AnimatedView>
        <Text style={styles.agentHelloText}>
          Hello, I’ll be helping you with all of these
        </Text>
      </AnimatedView>

      <AnimatedView style={styles.agentPocCardStyle}>
        <AgentPocCard pocCardData={pocCardData} />
      </AnimatedView>

      <AnimatedView style={styles.buttonWrapperStyle}>
        <PrimaryButton
          text={"Submit"}
          clickAction={() => Alert.alert("Click Submit Button")}
        />
      </AnimatedView>
    </View>
  );
};

const styles = StyleSheet.create({
  agentInfoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },

  imageStyle: {
    width: 240,
    height: 240,
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
    bottom: BOTTOM_SPACING,
    width: responsiveWidth(100) - LEFT_SPACING - RIGHT_SPACING
  }
});

export default AgentInfo;
