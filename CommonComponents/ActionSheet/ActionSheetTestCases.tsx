import React, { useRef, useState, Fragment } from "react";
import { View, Text } from "react-native";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import ActionSheet from "./ActionSheet";
import { StyleSheet } from "react-native";
import { CONSTANT_white1 } from "../../constants/colorPallete";
import Interactable from "react-native-interactable";
// @ts-ignore
import { responsiveHeight } from "react-native-responsive-dimensions";
import SimpleButton from "../SimpleButton/SimpleButton";

const ActionSheetHandler = () => {
  const actionSheetRef = useRef(null);
  const actionSheetStartingPosition = responsiveHeight(75);
  const [snappedIndex, setSnappedIndex] = useState(1);

  const openActionSheet = () => {
    // @ts-ignore
    actionSheetRef.current && actionSheetRef.current.snapTo({ index: 1 });
    return null;
  };

  const sheetSnapped = (snappedInfo: Interactable.ISnapEvent) => {
    setSnappedIndex(snappedInfo.nativeEvent.index);
  };

  return (
    <Fragment>
      <View style={styles.actionSheetHandler}>
        <SimpleButton
          text={"Open Panel"}
          textColor={"white"}
          action={openActionSheet}
        />
        <Text style={styles.infoText}>{`Action sheet is
  ${
    snappedIndex === 2
      ? "Hidden"
      : snappedIndex === 1
      ? "Visible"
      : "Full Screen"
  }`}</Text>
      </View>
      <ActionSheet
        onSnap={sheetSnapped}
        interactableRef={actionSheetRef}
        panelStartingPosition={actionSheetStartingPosition}
      >
        <Text style={styles.infoText}>This is the Action sheet!</Text>
      </ActionSheet>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  actionSheetHandler: {
    flex: 1,
    backgroundColor: CONSTANT_white1,
    alignItems: "center",
    justifyContent: "center"
  },
  infoText: {
    textAlign: "center",
    margin: 16,
    fontWeight: "bold"
  }
});

const ActionSheetTestCases: ITestCase[] = [
  {
    title: "Action Sheet",
    Component: <ActionSheet />
  },
  {
    title: "Action Sheet Props",
    Component: <ActionSheetHandler />
  }
];

export default ActionSheetTestCases;
