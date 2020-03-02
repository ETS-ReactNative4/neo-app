import { storiesOf } from "@storybook/react-native";
import SavedItineraryTestCases from "../../Screens/SavedItineraryScreen/Components/SavedItineraryTestCases";

const SavedItineraryScreenStory = storiesOf("Saved Itinerary Screen", module);

const renderTestCase = testCase =>
  SavedItineraryScreenStory.add(testCase.title, () => testCase.Component);

SavedItineraryTestCases.forEach(renderTestCase);
