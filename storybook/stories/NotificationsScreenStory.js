import { storiesOf } from "@storybook/react-native";
import NotificationsTestCases from "../../Screens/NotificationsScreen/Components/NotificationsTestCases";

const NotificationsScreenStory = storiesOf(
  "Notifications Screen Components",
  module
);

const renderTestCase = testCase =>
  NotificationsScreenStory.add(testCase.title, () => testCase.Component);

NotificationsTestCases.forEach(renderTestCase);
