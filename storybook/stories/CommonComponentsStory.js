import { storiesOf } from "@storybook/react-native";
import SimpleButtonTestCases from "../../CommonComponents/SimpleButton/SimpleButtonTestCases";
import RatingIconTestCases from "../../CommonComponents/RatingIcon/RatingIconTestCases";
import PrimaryButtonTestCases from "../../CommonComponents/PrimaryButton/PrimaryButtonTestCases";
import SectionTitleTestCases from "../../CommonComponents/SectionTitle/SectionTitleTestCases";

const CommonComponentStories = storiesOf("Common Components", module);

const renderTestCase = testCase =>
  CommonComponentStories.add(testCase.title, () => testCase.Component);

SimpleButtonTestCases.forEach(renderTestCase);
RatingIconTestCases.forEach(renderTestCase);
PrimaryButtonTestCases.forEach(renderTestCase);
SectionTitleTestCases.forEach(renderTestCase);
