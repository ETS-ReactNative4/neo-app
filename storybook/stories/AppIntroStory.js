import { storiesOf } from "@storybook/react-native";
import AppIntroComponentTestCases from "../../Screens/AppIntroScreen/Components/AppIntroComponentTestCases";

const AppIntroStory = storiesOf("App Intro Components", module);

const renderTestCase = testCase =>
  AppIntroStory.add(testCase.title, () => testCase.Component);

AppIntroComponentTestCases.forEach(renderTestCase);
