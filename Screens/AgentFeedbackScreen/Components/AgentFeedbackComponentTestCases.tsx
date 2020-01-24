import React from "react";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import AgentInfoText from "./AgentInfoText";
import AgentFeedbackOption, {
  IAgentOptionData
} from "./AgentFeedbackOption/AgentFeedbackOption";

import AgentFeedback from "../AgentFeedback";

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

const AgentFeedbackComponentTestCases: ITestCase[] = [
  {
    title: "Agent Info Text Section",
    Component: <AgentInfoText />
  },
  {
    title: "Agent Feedback Section",
    Component: <AgentFeedbackOption agentOptionData={agentOptionData} />
  },
  {
    title: "Agent Feedback Screen",
    Component: <AgentFeedback />
  }
];

export default AgentFeedbackComponentTestCases;
