import React, { Component } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
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
    const { panelRef, onClose, titleIllustrationRef } = this.props;

    return (
      <SlidingUpPanel
        backdropOpacity={0.4}
        draggableRange={{ top: responsiveHeight(50) + 44, bottom: 0 }}
        height={responsiveHeight(50) + 44}
        ref={panelRef}
        onClose={onClose}
      >
        <View style={styles.slidingContainer}>
          <PanelLogoContainer titleIllustrationRef={titleIllustrationRef} />
          <View style={styles.slidingContainerContentSection}>
            <Text style={styles.slidingContainerTitle}>{"Yey!"}</Text>
            <Text style={styles.slidingContainerInfo}>
              {"Pick your favourite moments of the day"}
            </Text>
            <FeedbackOption />
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
