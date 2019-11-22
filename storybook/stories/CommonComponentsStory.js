import React from "react";
import { storiesOf } from "@storybook/react-native";
import SimpleButtonTestCases from "../../CommonComponents/SimpleButton/SimpleButtonTestCases";
// import SplitSectionTestCases from "../../CommonComponents/SplitSection/SplitSectionTestCases";
// import CarouselTestCases from "../../CommonComponents/Carousel/CarouselTestCases";
// import CustomScrollViewTestCases from "../../CommonComponents/CustomScrollView/CustomScrollViewTestCases";

const CommonComponentStories = storiesOf("Common Components", module);

const renderTestCase = testCase =>
  CommonComponentStories.add(testCase.title, () => testCase.Component);

SimpleButtonTestCases.forEach(renderTestCase);

// SplitSectionTestCases.forEach(renderTestCase);

// CarouselTestCases.forEach(renderTestCase);

// CustomScrollViewTestCases.forEach(renderTestCase);
