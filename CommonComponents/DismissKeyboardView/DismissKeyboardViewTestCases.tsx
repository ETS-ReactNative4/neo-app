import React from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import { TextInput, StyleSheet } from "react-native";
import DismissKeyboardView from "./DismissKeyboardView";

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1
  },
  inputField: {
    color: "black"
  }
});

const DismissKeyboardViewTestCases: ITestCase[] = [
  {
    title: "Dismiss Keyboard View",
    Component: (
      <DismissKeyboardView style={styles.viewContainer}>
        <TextInput
          style={styles.inputField}
          placeholder={"Tap anywhere on screen to hide keyboard..."}
          placeholderTextColor={"black"}
        />
      </DismissKeyboardView>
    )
  }
];

export default DismissKeyboardViewTestCases;
