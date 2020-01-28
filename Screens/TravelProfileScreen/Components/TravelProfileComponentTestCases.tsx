import React from "react";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import ProfileHeader from "./ProfileHeader";
import { Alert, StyleSheet } from "react-native";

import { CONSTANT_firstColor } from "../../../constants/colorPallete";

const styles = StyleSheet.create({
  greenColor: {
    color: CONSTANT_firstColor
  }
});

const TravelProfileComponentTestCases: ITestCase[] = [
  {
    title: "Profile Header",
    Component: (
      <ProfileHeader
        rightLinkText={"Skip Question"}
        clickRightLink={() => Alert.alert("Click Right Link")}
      />
    )
  },
  {
    title: "Profile Header With LeftSide Link",
    Component: (
      <ProfileHeader
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
      <ProfileHeader
        leftLinkText={"PART 1 OF 5"}
        clickLeftLink={() => Alert.alert("Click Left Link")}
        rightLinkText={"Skip Question"}
        clickRightLink={() => Alert.alert("Click Right Link")}
        enableLeftLink
        rightTextColorStyle={styles.greenColor}
      />
    )
  }
];

export default TravelProfileComponentTestCases;
