import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  responsiveHeight
  // @ts-ignore
} from "react-native-responsive-dimensions";

import SectionTitle from "../../../CommonComponents/SectionTitle/SectionTitle";
import PrimaryButton from "../../../CommonComponents/PrimaryButton/PrimaryButton";
import { CONSTANT_fifteenthColor } from "../../../constants/colorPallete";
import ActionSheet from "../../../CommonComponents/ActionSheet/ActionSheet";

const TravelProfileActionSheet = () => {
  return (
    <ActionSheet panelStartingPosition={responsiveHeight(50)}>
      <View style={styles.actionSheetContainer}>
        <SectionTitle
          smallTitle={"BEFORE WE START"}
          title={"Is this your first time travelling out of India?"}
          titleNumberOfLines={2}
          containerStyle={styles.sectionTitleContainerStyle}
        />

        <View style={styles.buttonWrapperContainer}>
          <PrimaryButton
            text={"No"}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.buttonStyle}
            clickAction={() => Alert.alert("Click No Button")}
          />
          <PrimaryButton
            text={"Yes :)"}
            containerStyle={styles.buttonContainerStyle}
            clickAction={() => Alert.alert("Click Yes Button")}
          />
        </View>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  actionSheetContainer: {
    padding: 56
  },
  buttonWrapperContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  buttonContainerStyle: {
    width: 116
  },

  buttonStyle: {
    backgroundColor: CONSTANT_fifteenthColor
  },

  sectionTitleContainerStyle: {
    marginBottom: 32
  }
});

export default TravelProfileActionSheet;
