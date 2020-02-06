import React from "react";
import { StyleSheet } from "react-native";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import SectionTitle from "./SectionTitle";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";

const styles = StyleSheet.create({
  smallWelcomeTitle: {
    color: "black",
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 10)
  },
  welcomeTitle: {
    color: "black",
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 30, 36)
  },
  descriptionText: {
    color: "black"
  }
});

const SectionTitleTestCases: ITestCase[] = [
  {
    title: "Section Title",
    Component: <SectionTitle title={"Live on-trip support"} />
  },
  {
    title: "Section Title With Short Description",
    Component: (
      <SectionTitle
        title={"Live on-trip support"}
        description={
          "We’ll use your preference info to make better and more relevant recommendations."
        }
      />
    )
  },
  {
    title: "Section Title With Longer Description",
    Component: (
      <SectionTitle
        title={"Live on-trip support"}
        description={
          "We’ll use your preference info to make better and more relevant recommendations. We’ll use your preference info to make better and more relevant recommendations."
        }
      />
    )
  },
  {
    title: "Section Title with custom text styles",
    Component: (
      <SectionTitle
        title={"Live on-trip support"}
        description={
          "We’ll use your preference info to make better and more relevant recommendations. We’ll use your preference info to make better and more relevant recommendations."
        }
        smallTitleTextStyle={styles.smallWelcomeTitle}
        titleTextStyle={styles.welcomeTitle}
        descriptionTextStyle={styles.descriptionText}
      />
    )
  }
];

export default SectionTitleTestCases;
