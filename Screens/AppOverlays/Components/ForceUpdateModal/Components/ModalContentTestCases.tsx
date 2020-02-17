import React from "react";
import { ITestCase } from "../../../../../TypeInterfaces/TestCases/ITestCases";
import { StyleSheet, Alert } from "react-native";

import { CONSTANT_shade4 } from "../../../../../constants/colorPallete";
import ModalContent from "./ModalContent";

const styles = StyleSheet.create({
  modalContainerStyle: {
    backgroundColor: CONSTANT_shade4
  }
});

const ModalContentTestCases: ITestCase[] = [
  {
    title: "Force update modal content",
    Component: (
      <ModalContent
        containerStyle={styles.modalContainerStyle}
        title={"Your app is outdated"}
        description={
          "You are using an old version of the app. We have added new features to enhance the app experience."
        }
        buttonText={"Update now"}
        buttonClickAction={() => Alert.alert("Click Button")}
        bottomText={"Having probelm in updating the app?"}
        linkText={"Message us"}
        linkClickAction={() => Alert.alert("Click Link")}
      />
    )
  }
];

export default ModalContentTestCases;
