import React from "react";
// import { StyleSheet } from "react-native";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import AgentInfo from "./AgentInfo";
import AgentStarRating from "./AgentStarRating";

// const styles = StyleSheet.create({});

const AgentScreenTestCases: ITestCase[] = [
  {
    title: "Agent Info Section",
    Component: <AgentInfo />
  },
  {
    title: "Agent Star Rating",
    Component: <AgentStarRating rating={5} />
  }
];

export default AgentScreenTestCases;
