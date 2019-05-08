import React, { Component, Fragment } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
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
      updateUserFeedback
    } = this.props;

    return (
      <SlidingUpPanel
        backdropOpacity={0.4}
        draggableRange={{ top: responsiveHeight(50) + 44, bottom: 0 }}
        height={responsiveHeight(50) + 44}
        ref={panelRef}
        onClose={onClose}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={styles.slidingContainer}
        >
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
                return (
                  <FeedbackOption
                    key={optionIndex}
                    option={option}
                    userFeedback={userFeedback}
                    updateUserFeedback={updateUserFeedback}
                  />
                );
              })}
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    marginTop: 16
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
