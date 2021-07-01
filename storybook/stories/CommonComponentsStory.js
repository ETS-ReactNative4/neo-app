import { storiesOf } from "@storybook/react-native";
import SimpleButtonTestCases from "../../CommonComponents/SimpleButton/SimpleButtonTestCases";
import RatingIconTestCases from "../../CommonComponents/RatingIcon/RatingIconTestCases";
import PrimaryButtonTestCases from "../../CommonComponents/PrimaryButton/PrimaryButtonTestCases";
import SectionTitleTestCases from "../../CommonComponents/SectionTitle/SectionTitleTestCases";
import PortraitImageTestCases from "../../CommonComponents/PortraitImage/PortraitImageTestCases";
import SelectablePortraitImageTestCases from "../../CommonComponents/SelectablePortraitImage/SelectablePortraitImageTestCases";
import CustomCheckBoxTestCases from "../../CommonComponents/CustomCheckBox/CustomCheckBoxTestCases";
import ActionSheetTestCases from "../../CommonComponents/ActionSheet/ActionSheetTestCases";
import BlogCardTestCases from "../../CommonComponents/BlogCard/BlogCardTestCases";
import TestimonialCardTestCases from "../../CommonComponents/TestimonialCard/TestimonialCardTestCases";
import PromoCarousalTestCases from "../../CommonComponents/PromoCarousal/PromoCarousalTestCases";
import PromoCardTestCases from "../../CommonComponents/PromoCard/PromoCardTestCases";
import TrustIconsTestCases from "../../CommonComponents/TrustIcons/TrustIconsTestCases";
import SecurePartnerTestCases from "../../CommonComponents/SecurePartner/SecurePartnerTestCases";
import FeaturedCardTestCases from "../../CommonComponents/FeaturedCard/FeaturedCardTestCases";
import ItineraryCardTestCases from "../../CommonComponents/ItineraryCard/ItineraryCardTestCases";
import DealCardTestCases from "../../CommonComponents/DealCard/DealCardTestCases";
import DismissKeyboardViewTestCases from "../../CommonComponents/DismissKeyboardView/DismissKeyboardViewTestCases";
import ModalContentTestCases from "../../Screens/AppOverlays/Components/ForceUpdateModal/Components/ModalContentTestCases";
import RouteListTestCases from "../../CommonComponents/RouteList/RouteListTestCases";
import AnimatedLoopToEndTestCases from "../../CommonComponents/AnimatedLoopToEnd/AnimatedLoopToEndTestCases";
import ParallaxScrollViewTestCases from "../../CommonComponents/ParallaxScrollView/ParallaxScrollViewTestCases";
import CustomRadioButtonTestCases from "../../CommonComponents/CustomRadioButton/CustomRadioButtonTestCases";
import SavedItineraryCardTestCases from "../../CommonComponents/SavedItineraryCard/SavedItineraryCardTestCases";
import ExploreSectionTitleTestCases from "../../Screens/ExploreScreen/Components/ExploreSectionTitleTestCases";
import ExploreHeaderTestCases from "../../Screens/ExploreScreen/Components/ExploreHeaderTestCases";
import TextInputFieldTestCases from "../../CommonComponents/TextInputField/TextInputFieldTestCases";
import UserProfileAnimationTestCases from "../../CommonComponents/UserProfileAnimation/UserProfileAnimationTestCases";
import DealsCardTestCases from "../../CommonComponents/DealsCard/DealsCardTestCases";

const CommonComponentStories = storiesOf("Common Components", module);

const renderTestCase = testCase =>
  CommonComponentStories.add(testCase.title, () => testCase.Component);

SimpleButtonTestCases.forEach(renderTestCase);
RatingIconTestCases.forEach(renderTestCase);
PrimaryButtonTestCases.forEach(renderTestCase);
SectionTitleTestCases.forEach(renderTestCase);
PortraitImageTestCases.forEach(renderTestCase);
SelectablePortraitImageTestCases.forEach(renderTestCase);
CustomCheckBoxTestCases.forEach(renderTestCase);
ActionSheetTestCases.forEach(renderTestCase);
BlogCardTestCases.forEach(renderTestCase);
TestimonialCardTestCases.forEach(renderTestCase);
PromoCarousalTestCases.forEach(renderTestCase);
PromoCardTestCases.forEach(renderTestCase);
TrustIconsTestCases.forEach(renderTestCase);
SecurePartnerTestCases.forEach(renderTestCase);
FeaturedCardTestCases.forEach(renderTestCase);
ItineraryCardTestCases.forEach(renderTestCase);
DealCardTestCases.forEach(renderTestCase);
DismissKeyboardViewTestCases.forEach(renderTestCase);
ModalContentTestCases.forEach(renderTestCase);
RouteListTestCases.forEach(renderTestCase);
AnimatedLoopToEndTestCases.forEach(renderTestCase);
ParallaxScrollViewTestCases.forEach(renderTestCase);
CustomRadioButtonTestCases.forEach(renderTestCase);
SavedItineraryCardTestCases.forEach(renderTestCase);
ExploreSectionTitleTestCases.forEach(renderTestCase);
ExploreHeaderTestCases.forEach(renderTestCase);
TextInputFieldTestCases.forEach(renderTestCase);
UserProfileAnimationTestCases.forEach(renderTestCase);
DealsCardTestCases.forEach(renderTestCase);