import React from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import { Alert } from "react-native";
import DealCard from "./DealCard";

const DealCardTestCases: ITestCase[] = [
  {
    title: "Deal Card",
    Component: <DealCard action={() => Alert.alert("Click")} />
  }
];

export default DealCardTestCases;
