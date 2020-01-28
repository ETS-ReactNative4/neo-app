import { storiesOf } from "@storybook/react-native";
import TravelProfileComponentTestCases from "../../Screens/TravelProfileScreen/Components/TravelProfileComponentTestCases";

const TravelProfileScreenStory = storiesOf(
  "Travel Profile Screen Components",
  module
);

const renderTestCase = testCase =>
  TravelProfileScreenStory.add(testCase.title, () => testCase.Component);

TravelProfileComponentTestCases.forEach(renderTestCase);
