import { storiesOf } from "@storybook/react-native";
import PostBookingIntroComponentTestCases from "../../Screens/PostBookingIntroScreen/Components/PostBookingIntroComponentTestCases";

const AppIntroStory = storiesOf("Post Booking Intro Components", module);

const renderTestCase = testCase =>
  AppIntroStory.add(testCase.title, () => testCase.Component);

PostBookingIntroComponentTestCases.forEach(renderTestCase);
