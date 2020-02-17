import React from "react";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import AgentInfoText from "./AgentInfoText";
import AgentFeedbackOption from "./AgentFeedbackOption/AgentFeedbackOption";

import { IQuality } from "../../../mobx/SOFeedback";
import AgentOption from "./AgentFeedbackOption/Components/AgentOption";

const agentOptionData: IQuality[] = [
  {
    qualityText: "Superstar support",
    qualityImage: "https://i.imgur.com/YtdsUbs.png"
  },
  {
    qualityText: "Timely response",
    qualityImage: "https://i.imgur.com/sYzOl65.png"
  },
  {
    qualityText: "Empathy",
    qualityImage: "https://i.imgur.com/hm0u6k6.png"
  },
  {
    qualityText: "Destination knowledge",
    qualityImage: "https://i.imgur.com/cd7irIa.png"
  }
];

const AgentFeedbackComponentTestCases: ITestCase[] = [
  {
    title: "Agent Info Text Section",
    Component: (
      <AgentInfoText
        agentImage={"https://i.imgur.com/Uq2zUZA.png"}
        agentName={"Mahesh Raja"}
        agentDescription={"Your travel consultant"}
      />
    )
  },
  {
    title: "Agent Feedback Quality Section",
    Component: (
      <AgentFeedbackOption
        selectedQualities={["Empathy"]}
        agentOptionData={agentOptionData}
        selectQuality={() => null}
        unselectQuality={() => null}
      />
    )
  },
  {
    title: "Feedback quality selected",
    Component: (
      <AgentOption
        onPress={() => null}
        agentQuality={agentOptionData[0]}
        isSelected={true}
      />
    )
  },
  {
    title: "Feedback quality unselected",
    Component: (
      <AgentOption
        onPress={() => null}
        agentQuality={agentOptionData[0]}
        isSelected={false}
      />
    )
  }
];

export default AgentFeedbackComponentTestCases;
