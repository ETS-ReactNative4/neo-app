import { storiesOf } from "@storybook/react-native";
import TravelProfileWelcomeComponentTestCases from "../../Screens/TravelProfileWelcomeScreen/Components/TravelProfileComponentTestCases";
import TravelProfileCityComponentTestCases from "../../Screens/TravelProfileCityScreen/Components/TravelProfileCityComponentTestCases";

const TravelProfileScreenStory = storiesOf(
  "Travel Profile Screen Components",
  module
);

const renderTestCase = testCase =>
  TravelProfileScreenStory.add(testCase.title, () => testCase.Component);

TravelProfileWelcomeComponentTestCases.forEach(renderTestCase);
TravelProfileCityComponentTestCases.forEach(renderTestCase);
