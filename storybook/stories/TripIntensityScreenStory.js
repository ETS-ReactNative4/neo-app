import { storiesOf } from "@storybook/react-native";
import TripIntensityTestCases from "../../Screens/TripIntensityScreen/Components/TripIntensityTestCases";

const TripIntensityScreenStory = storiesOf("Trip Intensity Screen", module);

const renderTestCase = testCase =>
  TripIntensityScreenStory.add(testCase.title, () => testCase.Component);

TripIntensityTestCases.forEach(renderTestCase);
