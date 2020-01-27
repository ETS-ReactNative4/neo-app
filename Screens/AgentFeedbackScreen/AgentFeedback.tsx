import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import AgentInfoText from "./Components/AgentInfoText";
import AgentFeedbackOption, {
  IAgentOptionData
} from "./Components/AgentFeedbackOption/AgentFeedbackOption";
import Animated, { Easing } from "react-native-reanimated";

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
import RatingIcon from "../../CommonComponents/RatingIcon/RatingIcon";

const { createAnimatedComponent, Value, interpolate, Extrapolate } = Animated;

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

/* GUTTER SPACER */
const GUTTER_SPACING = 32;

const BOTTOM_SPACING = GUTTER_SPACING - 8;
const LEFT_SPACING = GUTTER_SPACING;
const RIGHT_SPACING = GUTTER_SPACING;

const AgentFeedback = () => {
  const [isRatedWell, setIsRatedWell] = useState<boolean>(false);

  const [animationState] = useState(new Value(0));

  // SET ANIMATION STYLES PROPERTY STARTS
  const rateInfoTextOpacity = interpolate(animationState, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const rateInfoTextMargin = interpolate(animationState, {
    inputRange: [0, 1],
    outputRange: [140, -10],
    extrapolate: Extrapolate.CLAMP
  });

  const scaleTransform = interpolate(animationState, {
    inputRange: [0, 1],
    outputRange: [1, 0.69],
    extrapolate: Extrapolate.CLAMP
  });

  const agentStarRatingMargin = interpolate(animationState, {
    inputRange: [0, 1],
    outputRange: [0, -48],
    extrapolate: Extrapolate.CLAMP
  });

  const agentOptionWrapperMargin = interpolate(animationState, {
    inputRange: [0, 1],
    outputRange: [160, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const agentOptionWrapperOpacity = interpolate(animationState, {
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  const buttonWrapperBottom = interpolate(animationState, {
    inputRange: [0, 1],
    outputRange: [-160, BOTTOM_SPACING],
    extrapolate: Extrapolate.CLAMP
  });
  const buttonWrapperOpacity = interpolate(animationState, {
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });
  // SET ANIMATION STYLES PROPERTY ENDS

  const userRatedWell = () => {
    setIsRatedWell(true);
    Animated.timing(animationState, {
      duration: 800,
      toValue: 1,
      easing: Easing.inOut(Easing.ease)
    }).start();
  };

  const userRatingReversed = () => {
    setIsRatedWell(false);
    Animated.timing(animationState, {
      duration: 800,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }).start();
  };

  const rateTextWrapperStyle = {
    marginTop: rateInfoTextMargin,
    opacity: rateInfoTextOpacity
  };

  const agentInfoWrapperStyle = {
    transform: [{ scale: scaleTransform }]
  };

  const starRatingWrapperStyle = {
    marginTop: agentStarRatingMargin,
    transform: [{ scale: scaleTransform }]
  };

  const agentOptionWrapperStyle = {
    marginTop: agentOptionWrapperMargin,
    opacity: agentOptionWrapperOpacity
  };

  const buttonWrapperAnimationStyle = {
    opacity: buttonWrapperOpacity,
    bottom: buttonWrapperBottom
  };

  return (
    <View style={styles.agentContainer}>
      <SmartImageV2
        source={{ uri: "https://i.imgur.com/zW6Eip0.png" }}
        fallbackSource={{ uri: "https://i.imgur.com/zW6Eip0.png" }}
        style={styles.imageStyle}
      />

      <AnimatedView style={rateTextWrapperStyle}>
        <Text style={styles.rateText}>Rate your experience with</Text>
      </AnimatedView>

      <AnimatedView style={agentInfoWrapperStyle}>
        <AgentInfoText
          agentImage={"https://i.imgur.com/Uq2zUZA.png"}
          agentName={"Mahesh Raja"}
          agentDescription={"Your travel consultant"}
        />
      </AnimatedView>

      <AnimatedView style={starRatingWrapperStyle}>
        <RatingIcon
          containerStyle={styles.ratingIconContainer}
          rating={5}
          clickAction={() => {
            if (isRatedWell) {
              userRatingReversed();
            } else {
              userRatedWell();
            }
          }}
        />
      </AnimatedView>

      <AnimatedView style={agentOptionWrapperStyle}>
        <AgentFeedbackOption agentOptionData={agentOptionData} />
      </AnimatedView>

      <AnimatedView
        style={[styles.buttonWrapperStyle, buttonWrapperAnimationStyle]}
      >
        <PrimaryButton
          text={"Submit"}
          clickAction={() => Alert.alert("Click Submit Button")}
        />
      </AnimatedView>
    </View>
  );
};

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

  rateText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 15),
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 32
  },

  ratingIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    width: responsiveWidth(100)
  },

  buttonWrapperStyle: {
    position: "absolute",
    left: LEFT_SPACING,
    right: RIGHT_SPACING,
    width: responsiveWidth(100) - LEFT_SPACING - RIGHT_SPACING
  }
});

export default AgentFeedback;
