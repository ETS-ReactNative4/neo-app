import { storiesOf } from "@storybook/react-native";
import TravellerProfileDetailsTestCases from "../../Screens/TravellerProfileDetailsScreen/Components/TravellerProfileDetailsTestCases";

const TravellerProfileDetailsScreenStory = storiesOf(
  "Traveller Profile Details",
  module
);

const renderTestCase = testCase =>
  TravellerProfileDetailsScreenStory.add(
    testCase.title,
    () => testCase.Component
  );

TravellerProfileDetailsTestCases.forEach(renderTestCase);
