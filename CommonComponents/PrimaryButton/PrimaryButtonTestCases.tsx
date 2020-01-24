import React from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";

import PrimaryButton from "./PrimaryButton";
import { Alert } from "react-native";

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
  }
];

export default PrimaryButtonTestCases;
