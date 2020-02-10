import React, { useState } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import AgentInfoText from "./Components/AgentInfoText";
import AgentFeedbackOption from "./Components/AgentFeedbackOption/AgentFeedbackOption";
import Animated, { Easing } from "react-native-reanimated";
import {
  responsiveHeight,
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
import { observer, inject } from "mobx-react";
import SOFeedback from "../../mobx/SOFeedback";
import { NavigationStackProp } from "react-navigation-stack";
import _ from "lodash";
import MessageInput from "../SupportCenterScreen/Components/MessageInput";
import DismissKeyboardView from "../../CommonComponents/DismissKeyboardView/DismissKeyboardView";
import useKeyboard from "../../CommonComponents/useKeyboard/useKeyboard";
import { CONSTANT_platformIos } from "../../constants/stringConstants";
import Itineraries from "../../mobx/Itineraries";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import UserFlowTransition from "../../mobx/UserFlowTransition";

const { createAnimatedComponent, Value, interpolate, Extrapolate } = Animated;

const AnimatedView = createAnimatedComponent(View);

/* GUTTER SPACER */
const GUTTER_SPACING = 32;

const BOTTOM_SPACING = GUTTER_SPACING - 8;
const LEFT_SPACING = GUTTER_SPACING;
const RIGHT_SPACING = GUTTER_SPACING;

export interface AgentFeedbackComponentProps {
  soFeedbackStore: SOFeedback;
  navigation: NavigationStackProp;
  itineraries: Itineraries;
  userFlowTransitionStore: UserFlowTransition;
}

const AgentFeedbackComponent = ({
  soFeedbackStore,
  // navigation,
  itineraries
}: // userFlowTransitionStore
AgentFeedbackComponentProps) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [qualities, setQualities] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { keyboardHeight } = useKeyboard();

  const {
    ownerId,
    ownerName,
    ownerImage,
    ownerQualities,
    ownerDescription
  } = soFeedbackStore;

  const onRating = (selectedRating: number) => {
    /**
     * If user changes rating, just reset the qualities
     * as every rating has different qualities
     */
    if (rating !== selectedRating) {
      setQualities([]);
    }

    setRating(selectedRating);
    userRated();
    if (selectedRating > 3) {
      userRatedWell();
    } else {
      userRatingReversed();
    }
  };

  const selectQuality = (selectedQuality: string) => {
    setQualities(_.uniq([...qualities, selectedQuality]));
  };

  const unselectQuality = (unselectedQuality: string) => {
    setQualities(
      qualities.filter(selectedQuality => selectedQuality !== unselectedQuality)
    );
  };

  /**
   * Value used to track animation when user gives good rating
   */
  const [goodRatingAnimationState] = useState(new Value(0));

  /**
   * Value used to track animation when user gives any rating
   */
  const [animationState] = useState(new Value(0));

  // SET ANIMATION STYLES PROPERTY STARTS
  const rateInfoTextOpacity = interpolate(goodRatingAnimationState, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const rateInfoTextMargin = interpolate(goodRatingAnimationState, {
    inputRange: [0, 1],
    outputRange: [140, -10],
    extrapolate: Extrapolate.CLAMP
  });

  const scaleTransform = interpolate(goodRatingAnimationState, {
    inputRange: [0, 1],
    outputRange: [1, 0.69],
    extrapolate: Extrapolate.CLAMP
  });

  const agentStarRatingMargin = interpolate(goodRatingAnimationState, {
    inputRange: [0, 1],
    outputRange: [0, -48],
    extrapolate: Extrapolate.CLAMP
  });

  const agentOptionWrapperMargin = interpolate(goodRatingAnimationState, {
    inputRange: [0, 1],
    outputRange: [160, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const agentOptionWrapperOpacity = interpolate(goodRatingAnimationState, {
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

  const textInputWrapperBottom = interpolate(animationState, {
    inputRange: [0, 1],
    outputRange: [-160, responsiveHeight(10)],
    extrapolate: Extrapolate.CLAMP
  });

  const textInputWrapperOpacity = interpolate(animationState, {
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  // SET ANIMATION STYLES PROPERTY ENDS

  const userRatedWell = () => {
    Animated.timing(goodRatingAnimationState, {
      duration: 800,
      toValue: 1,
      easing: Easing.inOut(Easing.ease)
    }).start();
  };

  const userRatingReversed = () => {
    Animated.timing(goodRatingAnimationState, {
      duration: 800,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }).start();
  };

  const userRated = () => {
    Animated.timing(animationState, {
      duration: 300,
      toValue: 1,
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

  const textInputStyle = {
    bottom: textInputWrapperBottom,
    opacity: textInputWrapperOpacity
  };

  const evadeKeyboard: { bottom: number } | {} = {};

  if (keyboardHeight && Platform.OS === CONSTANT_platformIos) {
    // @ts-ignore
    evadeKeyboard.bottom = keyboardHeight;
  }

  let selectedQualities = [];
  if (ownerQualities) {
    // @ts-ignore
    selectedQualities = ownerQualities[`${rating}star`];
  }

  const onFeedbackSubmit = () => {
    setIsSubmitting(true);
    SOFeedback.saveSODetail(itineraries.selectedItineraryId, {
      ownerId,
      ownerNotes: comment,
      ownerQuality: qualities,
      ownerRating: rating,
      ownerType: "SALES_OWNER"
    })
      .then(result => {
        if (result) {
        } else {
          setIsSubmitting(false);
          DebouncedAlert("Error", "Unable to submit feedback!");
        }
      })
      .catch(() => {
        setIsSubmitting(false);
        DebouncedAlert("Error", "Unable to submit feedback!");
      });
  };

  return (
    <DismissKeyboardView style={styles.agentContainer}>
      {/**
       * TODO: Add actual image to asset
       */}
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
          agentImage={ownerImage}
          agentName={ownerName}
          agentDescription={ownerDescription}
        />
      </AnimatedView>

      <AnimatedView style={starRatingWrapperStyle}>
        <RatingIcon
          containerStyle={styles.ratingIconContainer}
          numOfStars={5}
          rating={rating}
          clickAction={onRating}
        />
      </AnimatedView>

      <AnimatedView style={agentOptionWrapperStyle}>
        <AgentFeedbackOption
          selectedQualities={qualities}
          agentOptionData={selectedQualities}
          selectQuality={selectQuality}
          unselectQuality={unselectQuality}
        />
      </AnimatedView>

      <AnimatedView
        style={[styles.textInputWrapperStyle, textInputStyle, evadeKeyboard]}
      >
        <MessageInput
          containerStyle={styles.commentInput}
          label={""}
          textPlaceholder={
            rating > 3 ? "Write a thank you note..." : "What went wrong?"
          }
          text={comment}
          onChangeText={setComment}
          isSelectionMode={false}
        />
      </AnimatedView>
      <AnimatedView
        style={[styles.buttonWrapperStyle, buttonWrapperAnimationStyle]}
      >
        <PrimaryButton
          text={"Submit"}
          clickAction={isSubmitting ? () => null : onFeedbackSubmit}
        />
      </AnimatedView>
    </DismissKeyboardView>
  );
};

AgentFeedbackComponent.navigationOptions = {
  header: null
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
  },

  textInputWrapperStyle: {
    position: "absolute",
    width: responsiveWidth(100),
    paddingHorizontal: 24,
    backgroundColor: "white"
  },

  commentInput: {
    maxHeight: 160
  }
});

const AgentFeedback = inject("userFlowTransitionStore")(
  inject("itineraries")(
    inject("soFeedbackStore")(observer(AgentFeedbackComponent))
  )
);

export default AgentFeedback;
