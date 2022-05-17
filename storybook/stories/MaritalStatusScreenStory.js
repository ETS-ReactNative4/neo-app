import { storiesOf } from "@storybook/react-native";
// import MaritalStatusComponentTestCases from "../../Screens/MaritalStatusScreen/Components/MaritalStatusComponentTestCases";

const MaritalStatusScreenStory = storiesOf(
  "Marital Status Screen Components",
  module
);

const renderTestCase = testCase =>
  MaritalStatusScreenStory.add(testCase.title, () => testCase.Component);

// MaritalStatusComponentTestCases.forEach(renderTestCase);
