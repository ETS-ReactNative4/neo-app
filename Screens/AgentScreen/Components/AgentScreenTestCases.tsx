import React from "react";
// import { StyleSheet } from "react-native";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import AgentInfo from "./AgentInfo";
import AgentStarRating from "./AgentStarRating";
import AgentFeedback, { IAgentOptionData } from "./AgentFeedback/AgentFeedback";
import AgentPocCard, { IPocCardPropsData } from "./AgentPocCard";
import {
  CONSTANT_passIcon,
  CONSTANT_visaRelatedFaqIcon,
  CONSTANT_paymentIcon
} from "../../../constants/imageAssets";
import Agent from "../Agent";

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

const pocCardData: IPocCardPropsData[] = [
  {
    title: "Superstar support",
    description: "The travel vouchers you need for your trip",
    iconName: `${CONSTANT_passIcon}`
  },
  {
    title: "Visa assistance",
    description: "The travel vouchers you need for your trip",
    iconName: `${CONSTANT_visaRelatedFaqIcon}`
  },
  {
    title: "Payments",
    description: "The travel vouchers you need for your trip",
    iconName: `${CONSTANT_paymentIcon}`
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
    Component: <AgentStarRating count={5} />
  },
  {
    title: "Agent Feedback",
    Component: <AgentFeedback agentOptionData={agentOptionData} />
  },
  {
    title: "Agent Poc Card",
    Component: <AgentPocCard pocCardData={pocCardData} />
  },
  {
    title: "Agent Screen",
    Component: <Agent />
  }
];

export default AgentScreenTestCases;
