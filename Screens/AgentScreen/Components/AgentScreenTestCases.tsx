import React from "react";
// import { StyleSheet } from "react-native";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import AgentInfo from "./AgentInfo";

// const styles = StyleSheet.create({});

const AgentScreenTestCases: ITestCase[] = [
  {
    title: "Agent Info Section",
    Component: <AgentInfo />
  }
];

export default AgentScreenTestCases;
