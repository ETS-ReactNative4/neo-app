import React from "react";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import AgentPocCard, { IPocCardPropsData } from "./AgentPocCard";
import AgentInfoText from "../../AgentFeedbackScreen/Components/AgentInfoText";
import {
  CONSTANT_passIcon,
  CONSTANT_visaRelatedFaqIcon,
  CONSTANT_paymentIcon
} from "../../../constants/imageAssets";

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

const AgentInfoComponentTestCases: ITestCase[] = [
  {
    title: "Agent Info Text Section",
    Component: (
      <AgentInfoText
        agentImage={"https://i.imgur.com/yfA9V3g.png"}
        agentName={"Sunil Sathyaraj"}
        agentDescription={"Your onboarding expert"}
      />
    )
  },
  {
    title: "Agent Poc Card",
    Component: (
      <AgentPocCard
        animation="fadeInRight"
        pocCardData={pocCardData}
        delay={1000}
        duration={400}
        successiveDelay={200}
      />
    )
  }
];

export default AgentInfoComponentTestCases;
