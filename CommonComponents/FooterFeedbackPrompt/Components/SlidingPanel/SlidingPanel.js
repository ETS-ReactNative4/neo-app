import React, { Component, Fragment } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Keyboard,
  LayoutAnimation
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import constants from "../../../../constants/constants";
import SlidingUpPanel from "rn-sliding-up-panel";
import PanelLogoContainer from "./Components/PanelLogoContainer";
import FeedbackOption from "../FeedbackOption/FeedbackOption";

class SlidingPanel extends Component {
  render() {
    const {
      panelRef,
      onClose,
      titleIllustrationRef,
      isFeedbackPositive,
      items,
      userFeedback,
      updateUserFeedback,
      keyboardHeight,
      isKeyboardVisible,
      focusOption,
      blurOption,
      focusedOption,
      unselectOption
    } = this.props;

    const panelHeight = 320;
    const optionsHeight = 64;

    const maxSlidingPanelHeight =
      panelHeight + optionsHeight * items.options.length;
    const titleImageExtendedHeight = 44;

    return (
      <SlidingUpPanel
        backdropOpacity={0.4}
        draggableRange={{
          top: Math.min(
            maxSlidingPanelHeight,
            responsiveHeight(100) - titleImageExtendedHeight
          ),
          bottom: 0
        }}
        height={Math.min(
          maxSlidingPanelHeight,
          responsiveHeight(100) - titleImageExtendedHeight
        )}
        ref={panelRef}
        onClose={onClose}
      >
        <View style={styles.slidingContainer}>
          <View style={styles.slidingContainer}>
            <PanelLogoContainer
              isFeedbackPositive={isFeedbackPositive}
              titleIllustrationRef={titleIllustrationRef}
            />
            <View style={styles.slidingContainerContentSection}>
              <Text style={styles.slidingContainerTitle}>{items.title}</Text>
              <Text style={styles.slidingContainerInfo}>
                {isFeedbackPositive
                  ? "Pick your favourite moments of the day"
                  : "Where did we go wrong?"}
              </Text>
              {items.options.map((option, optionIndex) => {
                if (!focusedOption || focusedOption === option.identifier) {
                  return (
                    <FeedbackOption
                      key={optionIndex}
                      option={option}
                      userFeedback={userFeedback}
                      updateUserFeedback={updateUserFeedback}
                      isFocusedOption={focusedOption === option.identifier}
                      focusOption={focusOption}
                      blurOption={blurOption}
                      keyboardHeight={keyboardHeight}
                      isKeyboardVisible={isKeyboardVisible}
                      unselectOption={unselectOption}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </View>
          </View>
        </View>
      </SlidingUpPanel>
    );
  }
}

const styles = StyleSheet.create({
  slidingContainer: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center"
  },
  slidingContainerTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 50),
    marginTop: 16,
    color: constants.black1
  },
  slidingContainerInfo: {
    ...constants.fontCustom(constants.primaryRegular, 15),
    marginTop: 16,
    color: constants.shade1,
    marginBottom: 8
  },
  slidingContainerContentSection: {
    flex: 1,
    backgroundColor: "white",
    width: responsiveWidth(100),
    alignItems: "center"
  }
});

export default SlidingPanel;
