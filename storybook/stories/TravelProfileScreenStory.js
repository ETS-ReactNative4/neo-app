import { storiesOf } from "@storybook/react-native";
import TravelProfileWelcomeComponentTestCases from "../../Screens/TravelProfileWelcomeScreen/Components/TravelProfileComponentTestCases";

const TravelProfileScreenStory = storiesOf(
  "Travel Profile Screen Components",
  module
);

const renderTestCase = testCase =>
  TravelProfileScreenStory.add(testCase.title, () => testCase.Component);

TravelProfileWelcomeComponentTestCases.forEach(renderTestCase);
