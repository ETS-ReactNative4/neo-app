import React from "react";
import { StyleSheet, View, Text, ViewStyle } from "react-native";
import AgentInfo from "./Components/AgentInfo";
import AgentStarRating from "./Components/AgentStarRating";
import AgentFeedback, {
  IAgentOptionData
} from "./Components/AgentFeedback/AgentFeedback";
import AgentPocCard, { IPocCardPropsData } from "./Components/AgentPocCard";
import Animated from "react-native-reanimated";
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

const { createAnimatedComponent } = Animated;

const AnimatedView = createAnimatedComponent(View);

const agentOptionData: IAgentOptionData[] = [
  {
    text: "Superstar support",
    image: "https://i.imgur.com/YtdsUbs.png"
  },
  {
    text: "Timely response",
    image: "https://i.imgur.com/sYzOl65.png"
  },
  {
    text: "Empathy",
    image: "https://i.imgur.com/hm0u6k6.png"
  },
  {
    text: "Destination knowledge",
    image: "https://i.imgur.com/cd7irIa.png"
  }
];

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

const Agent = () => {
  // const [isRatedWell, setIsRatedWell] = useState<boolean>(false);

  const rateTextWrapperStyle = {
    // marginTop: isRatedWell ? -10 : 140,
    // opacity: isRatedWell ? 0 : 1
  };

  const agentInfoWrapperStyle: ViewStyle = {
    // transform: [{scale: isRatedWell ? 0.69 : 1}]
  };

  return (
    <View style={styles.agentContainer}>
      <SmartImageV2
        source={{ uri: "https://i.imgur.com/zW6Eip0.png" }}
        fallbackSource={{ uri: "https://i.imgur.com/zW6Eip0.png" }}
        style={styles.imageStyle}
      />

      <AnimatedView style={[styles.rateTextWrapper, rateTextWrapperStyle]}>
        <Text style={styles.rateText}>Rate your experience with</Text>
      </AnimatedView>

      <AnimatedView style={agentInfoWrapperStyle}>
        <AgentInfo containerStyle={styles.agentInfoContainerStyle} />
      </AnimatedView>

      <AnimatedView>
        <AgentStarRating count={5} />
      </AnimatedView>

      <AnimatedView>
        <AgentFeedback agentOptionData={agentOptionData} />
      </AnimatedView>

      <AnimatedView>
        <AgentPocCard pocCardData={pocCardData} />
      </AnimatedView>

      <AnimatedView>
        <PrimaryButton
          containerStyle={styles.buttonContainerStyle}
          text={"Submit"}
        />
      </AnimatedView>
    </View>
  );
};

/* GUTTER SPACER */
const GUTTER_SPACING = 32;

const BOTTOM_SPACING = GUTTER_SPACING - 8;
const LEFT_SPACING = GUTTER_SPACING;
const RIGHT_SPACING = GUTTER_SPACING;

const styles = StyleSheet.create({
  agentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },

  imageStyle: {
    width: 240,
    height: 240,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0
  },

  rateTextWrapper: {
    marginBottom: 32
  },
  rateText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 15),
    textAlign: "center",
    textTransform: "uppercase"
  },

  agentInfoContainerStyle: {},

  buttonContainerStyle: {
    position: "absolute",
    left: LEFT_SPACING,
    right: RIGHT_SPACING,
    bottom: BOTTOM_SPACING,
    width: responsiveWidth(100) - LEFT_SPACING - RIGHT_SPACING
  }
});

export default Agent;
