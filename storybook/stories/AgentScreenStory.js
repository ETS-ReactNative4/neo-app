import { storiesOf } from "@storybook/react-native";
import AgentFeedbackComponentTestCases from "../../Screens/AgentFeedbackScreen/Components/AgentFeedbackComponentTestCases";

const AgentScreenStory = storiesOf("Agent Feedback Screen Components", module);

const renderTestCase = testCase =>
  AgentScreenStory.add(testCase.title, () => testCase.Component);

AgentFeedbackComponentTestCases.forEach(renderTestCase);
