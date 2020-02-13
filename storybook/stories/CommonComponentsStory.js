import { storiesOf } from "@storybook/react-native";
import SimpleButtonTestCases from "../../CommonComponents/SimpleButton/SimpleButtonTestCases";
import RatingIconTestCases from "../../CommonComponents/RatingIcon/RatingIconTestCases";
import PrimaryButtonTestCases from "../../CommonComponents/PrimaryButton/PrimaryButtonTestCases";
import ModalContentTestCases from "../../Screens/AppOverlays/Components/ForceUpdateModal/Components/ModalContentTestCases";

const CommonComponentStories = storiesOf("Common Components", module);

const renderTestCase = testCase =>
  CommonComponentStories.add(testCase.title, () => testCase.Component);

SimpleButtonTestCases.forEach(renderTestCase);
RatingIconTestCases.forEach(renderTestCase);
PrimaryButtonTestCases.forEach(renderTestCase);
ModalContentTestCases.forEach(renderTestCase);
