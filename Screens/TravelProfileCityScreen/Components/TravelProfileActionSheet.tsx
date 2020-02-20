import React from "react";
import { View, StyleSheet } from "react-native";
import {
  responsiveHeight
  // @ts-ignore
} from "react-native-responsive-dimensions";

import SectionTitle from "../../../CommonComponents/SectionTitle/SectionTitle";
import PrimaryButton from "../../../CommonComponents/PrimaryButton/PrimaryButton";
import { CONSTANT_fifteenthColor } from "../../../constants/colorPallete";
import ActionSheet from "../../../CommonComponents/ActionSheet/ActionSheet";
import { IInteractable } from "react-native-interactable";

export interface ITravelProfileActionSheet {
  actionSheetRef: React.MutableRefObject<IInteractable | undefined>;
  positiveAction: () => any;
  negativeAction: () => any;
}

const TravelProfileActionSheet = ({
  actionSheetRef,
  positiveAction,
  negativeAction
}: ITravelProfileActionSheet) => {
  return (
    <ActionSheet
      interactableRef={actionSheetRef}
      panelViewablePosition={responsiveHeight(50)}
    >
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
            clickAction={negativeAction}
          />
          <PrimaryButton
            text={"Yes :)"}
            containerStyle={styles.buttonContainerStyle}
            clickAction={positiveAction}
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
