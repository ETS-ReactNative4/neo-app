import { storiesOf } from "@storybook/react-native";
import ItineraryTestCases from "../../Screens/ItineraryScreen/Components/ItineraryTestCases";

const ItineraryScreenStory = storiesOf("Itinerary Screen", module);

const renderTestCase = testCase =>
  ItineraryScreenStory.add(testCase.title, () => testCase.Component);

ItineraryTestCases.forEach(renderTestCase);
