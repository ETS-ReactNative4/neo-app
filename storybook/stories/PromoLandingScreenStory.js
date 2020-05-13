import { storiesOf } from "@storybook/react-native";
import PromoLandingTestCases from "../../Screens/PromoLandingScreen/Components/PromoLandingTestCases";

const PromoLandingScreenStory = storiesOf("Saved Itinerary Screen", module);

const renderTestCase = testCase =>
  PromoLandingScreenStory.add(testCase.title, () => testCase.Component);

PromoLandingTestCases.forEach(renderTestCase);
