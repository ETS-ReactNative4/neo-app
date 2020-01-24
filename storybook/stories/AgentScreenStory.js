import { storiesOf } from "@storybook/react-native";
import AgentScreenTestCases from "../../Screens/AgentFeedbackScreen/Components/AgentScreenTestCases";

const AgentScreenStory = storiesOf("Agent Screen Components", module);

const renderTestCase = testCase =>
  AgentScreenStory.add(testCase.title, () => testCase.Component);

AgentScreenTestCases.forEach(renderTestCase);
