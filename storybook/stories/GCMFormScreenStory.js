import { storiesOf } from "@storybook/react-native";
import GCMFormTestCases from "../../Screens/GCMFormScreen/Components/GCMFormTestCases";

const GCMFormScreenStory = storiesOf("GCM Form Screen", module);

const renderTestCase = testCase =>
  GCMFormScreenStory.add(testCase.title, () => testCase.Component);

GCMFormTestCases.forEach(renderTestCase);
