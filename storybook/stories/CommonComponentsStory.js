import { storiesOf } from "@storybook/react-native";
import SimpleButtonTestCases from "../../CommonComponents/SimpleButton/SimpleButtonTestCases";
import RatingIconTestCases from "../../CommonComponents/RatingIcon/RatingIconTestCases";
import PrimaryButtonTestCases from "../../CommonComponents/PrimaryButton/PrimaryButtonTestCases";
import SectionTitleTestCases from "../../CommonComponents/SectionTitle/SectionTitleTestCases";
import PortraitImageTestCases from "../../CommonComponents/PortraitImage/PortraitImageTestCases";
import SelectablePortraitImageTestCases from "../../CommonComponents/SelectablePortraitImage/SelectablePortraitImageTestCases";
import MasonryViewTestCases from "../../CommonComponents/MasonryView/MasonryViewTestCases";
import CustomCheckBoxTestCases from "../../CommonComponents/CustomCheckBox/CustomCheckBoxTestCases";
import ActionSheetTestCases from "../../CommonComponents/ActionSheet/ActionSheetTestCases";
import BlogCardTestCases from "../../CommonComponents/BlogCard/BlogCardTestCases";
import TestimonialCardTestCases from "../../CommonComponents/TestimonialCard/TestimonialCardTestCases";
import PromoCardTestCases from "../../CommonComponents/PromoCard/PromoCardTestCases";
import PartnersSectionTestCases from "../../CommonComponents/PartnersSection/PartnersSectionTestCases";
import SecurePartnerTestCases from "../../CommonComponents/SecurePartner/SecurePartnerTestCases";

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
CustomCheckBoxTestCases.forEach(renderTestCase);
ActionSheetTestCases.forEach(renderTestCase);
BlogCardTestCases.forEach(renderTestCase);
TestimonialCardTestCases.forEach(renderTestCase);
PromoCardTestCases.forEach(renderTestCase);
PartnersSectionTestCases.forEach(renderTestCase);
SecurePartnerTestCases.forEach(renderTestCase);
