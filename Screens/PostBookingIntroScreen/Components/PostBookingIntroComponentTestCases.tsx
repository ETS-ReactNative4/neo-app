import React from "react";
import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import IntroTextSection from "./IntroTextSection";
import IntroCoverImage from "./IntroCoverImage";
import { StyleSheet, Alert } from "react-native";
import {
  responsiveWidth,
  responsiveHeight
  // @ts-ignore
} from "react-native-responsive-dimensions";
import IntroCarouselActionBar from "./IntroCarouselActionBar";
import { IPostBookingIntroData } from "../PostBookingIntro";

const appIntroData: IPostBookingIntroData[] = [
  {
    title: "Hello Prabu,",
    description:
      "We’ll use your preference info to make better and more relevant recommendations.",
    image: "https://i.imgur.com/YtdsUbs.png"
  },
  {
    title: "Live on-trip support",
    description:
      "We’ll use your preference info to make better and more relevant recommendations.",
    image: "https://i.imgur.com/sYzOl65.png"
  },
  {
    title: "Visa assistance",
    description:
      "We’ll use your preference info to make better and more relevant recommendations.",
    image: "https://i.imgur.com/hm0u6k6.png"
  },
  {
    title: "Access to travel vouchers",
    description:
      "We’ll use your preference info to make better and more relevant recommendations.",
    image: "https://i.imgur.com/cd7irIa.png"
  }
];

const styles = StyleSheet.create({
  coverImageStyle: {
    width: responsiveWidth(100),
    height: responsiveHeight(50)
  },
  carouselContainerStyle: {
    marginVertical: 40
  }
});

const PostBookingIntroComponentTestCases: ITestCase[] = [
  {
    title: "Intro Text Section",
    Component: (
      <IntroTextSection
        title={"Hello Prabu,"}
        description={
          "We’ll use your preference info to make better and more relevant recommendations."
        }
      />
    )
  },
  {
    title: "Intro Text Section with longer description",
    Component: (
      <IntroTextSection
        title={"Visa assistance"}
        description={
          "We’ll use your preference info to make better and more relevant recommendations. We’ll use your preference info to make better and more relevant recommendations."
        }
      />
    )
  },
  {
    title: "Intro cover image",
    Component: (
      <IntroCoverImage
        containerStyle={styles.coverImageStyle}
        appIntroData={appIntroData}
      />
    )
  },
  {
    title: "Intro Carousel action bar with back button",
    Component: (
      <IntroCarouselActionBar
        containerStyle={styles.carouselContainerStyle}
        hideBackButton
        appIntroData={appIntroData}
        clickNextButton={() => Alert.alert("Click Next")}
      />
    )
  },
  {
    title: "Intro Carousel action bar without back button",
    Component: (
      <IntroCarouselActionBar
        appIntroData={appIntroData}
        containerStyle={styles.carouselContainerStyle}
        clickBackButton={() => Alert.alert("Click Back")}
        clickNextButton={() => Alert.alert("Click Next")}
      />
    )
  }
];

export default PostBookingIntroComponentTestCases;
