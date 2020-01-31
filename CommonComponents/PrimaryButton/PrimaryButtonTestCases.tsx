import React from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";

import PrimaryButton from "./PrimaryButton";
import { Alert, StyleSheet } from "react-native";
import { CONSTANT_fifteenthColor } from "../../constants/colorPallete";

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: CONSTANT_fifteenthColor
  }
});

const PrimaryButtonTestCases: ITestCase[] = [
  {
    title: "Primary button renders correctly",
    Component: <PrimaryButton text={"View my trip details"} />
  },
  {
    title: "Primary button with click action",
    Component: (
      <PrimaryButton
        text={"View my trip details"}
        clickAction={() => Alert.alert("Click Button")}
      />
    )
  },
  {
    title: "Primary button with different bg color",
    Component: (
      <PrimaryButton
        text={"Button"}
        clickAction={() => Alert.alert("Click Button")}
        buttonStyle={styles.buttonStyle}
      />
    )
  }
];

export default PrimaryButtonTestCases;
