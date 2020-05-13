import React from "react";
import { Alert, StyleSheet } from "react-native";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";

import TravelProfileHeader from "./TravelProfileHeader";
import TravelProfileIntro from "./TravelProfileIntro";

import { CONSTANT_firstColor } from "../../../constants/colorPallete";

const styles = StyleSheet.create({
  greenColor: {
    color: CONSTANT_firstColor
  }
});

const TravelProfileWelcomeComponentTestCases: ITestCase[] = [
  {
    title: "Profile Header",
    Component: (
      <TravelProfileHeader
        rightLinkText={"Skip Question"}
        clickRightLink={() => Alert.alert("Click Right Link")}
      />
    )
  },
  {
    title: "Profile Header With LeftSide Link",
    Component: (
      <TravelProfileHeader
        leftLinkText={"PART 1 OF 5"}
        clickLeftLink={() => Alert.alert("Click Left Link")}
        rightLinkText={"Skip Question"}
        clickRightLink={() => Alert.alert("Click Right Link")}
        enableLeftLink
      />
    )
  },
  {
    title: "Profile Header With Different Right Text Color",
    Component: (
      <TravelProfileHeader
        leftLinkText={"PART 1 OF 5"}
        clickLeftLink={() => Alert.alert("Click Left Link")}
        rightLinkText={"Skip Question"}
        clickRightLink={() => Alert.alert("Click Right Link")}
        enableLeftLink
        rightTextColorStyle={styles.greenColor}
      />
    )
  },
  {
    title: "Profile Intro Component",
    Component: <TravelProfileIntro />
  }
];

export default TravelProfileWelcomeComponentTestCases;
