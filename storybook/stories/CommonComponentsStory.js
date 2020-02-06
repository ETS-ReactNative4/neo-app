import { storiesOf } from "@storybook/react-native";
import SimpleButtonTestCases from "../../CommonComponents/SimpleButton/SimpleButtonTestCases";
import RatingIconTestCases from "../../CommonComponents/RatingIcon/RatingIconTestCases";
import PrimaryButtonTestCases from "../../CommonComponents/PrimaryButton/PrimaryButtonTestCases";
import SectionTitleTestCases from "../../CommonComponents/SectionTitle/SectionTitleTestCases";
import PortraitImageTestCases from "../../CommonComponents/PortraitImage/PortraitImageTestCases";
import SelectablePortraitImageTestCases from "../../CommonComponents/SelectablePortraitImage/SelectablePortraitImageTestCases";
import MasonryViewTestCases from "../../CommonComponents/MasonryView/MasonryViewTestCases";
import ActionSheetTestCases from "../../CommonComponents/ActionSheet/ActionSheetTestCases";
import DismissKeyboardViewTestCases from "../../CommonComponents/DismissKeyboardView/DismissKeyboardViewTestCases";

const CommonComponentStories = storiesOf("Common Components", module);

const renderTestCase = testCase =>
  CommonComponentStories.add(testCase.title, () => testCase.Component);

SimpleButtonTestCases.forEach(renderTestCase);
RatingIconTestCases.forEach(renderTestCase);
PrimaryButtonTestCases.forEach(renderTestCase);
SectionTitleTestCases.forEach(renderTestCase);
PortraitImageTestCases.forEach(renderTestCase);
SelectablePortraitImageTestCases.forEach(renderTestCase);
MasonryViewTestCases.forEach(renderTestCase);
ActionSheetTestCases.forEach(renderTestCase);
DismissKeyboardViewTestCases.forEach(renderTestCase);
