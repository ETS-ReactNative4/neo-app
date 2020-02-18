import { storiesOf } from "@storybook/react-native";
import ListingPageTestCases from "../../Screens/ListingPageScreen/Components/ListingPageTestCases";

const ListingPageScreenStory = storiesOf("Promo Landing Screen", module);

const renderTestCase = testCase =>
  ListingPageScreenStory.add(testCase.title, () => testCase.Component);

ListingPageTestCases.forEach(renderTestCase);
