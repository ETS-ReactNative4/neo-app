import { storiesOf } from "@storybook/react-native";
import UltimateMenuTestCases from "../../Screens/UltimateMenuScreen/Components/UltimateMenuTestCases";

const UltimateMenuScreenStory = storiesOf("Ultimate Menu Screen", module);

const renderTestCase = testCase =>
  UltimateMenuScreenStory.add(testCase.title, () => testCase.Component);

UltimateMenuTestCases.forEach(renderTestCase);
