import { storiesOf } from "@storybook/react-native";
import SearchScreenTestCases from "../../Screens/SearchScreen/Components/SearchScreenTestCases";

const SearchScreenStory = storiesOf("Saved Itinerary Screen", module);

const renderTestCase = testCase =>
  SearchScreenStory.add(testCase.title, () => testCase.Component);

SearchScreenTestCases.forEach(renderTestCase);
