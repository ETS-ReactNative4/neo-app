import React from "react";
// import { StyleSheet } from "react-native";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import AgentInfo from "./AgentInfo";
import AgentStarRating from "./AgentStarRating";
import AgentFeedback, { IAgentOptionData } from "./AgentFeedback/AgentFeedback";

const agentOptionData: IAgentOptionData[] = [
  {
    text: "Superstar support",
    image: "https://i.imgur.com/YtdsUbs.png"
  },
  {
    text: "Timely response",
    image: "https://i.imgur.com/sYzOl65.png"
  },
  {
    text: "Empathy",
    image: "https://i.imgur.com/hm0u6k6.png"
  },
  {
    text: "Destination knowledge",
    image: "https://i.imgur.com/cd7irIa.png"
  }
];

// const styles = StyleSheet.create({});

const AgentScreenTestCases: ITestCase[] = [
  {
    title: "Agent Info Section",
    Component: <AgentInfo />
  },
  {
    title: "Agent Star Rating",
    Component: <AgentStarRating rating={5} />
  },
  {
    title: "Agent Feedback",
    Component: <AgentFeedback agentOptionData={agentOptionData} />
  }
];

export default AgentScreenTestCases;
