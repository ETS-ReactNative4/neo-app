import { storiesOf } from "@storybook/react-native";
import AppLoginTestCases from "../../Screens/AppLoginScreen/Components/AppLoginTestCases";

const AppLoginScreenStory = storiesOf("App Login Screen Components", module);

const renderTestCase = testCase =>
  AppLoginScreenStory.add(testCase.title, () => testCase.Component);

AppLoginTestCases.forEach(renderTestCase);
