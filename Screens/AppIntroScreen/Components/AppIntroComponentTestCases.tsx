import React from "react";
import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import IntroCoverImage from "./IntroCoverImage";
import { StyleSheet, Alert } from "react-native";
import {
  responsiveWidth,
  responsiveHeight
  // @ts-ignore
} from "react-native-responsive-dimensions";
import IntroCarouselActionBar from "./IntroCarouselActionBar";
import AppIntro, { IAppIntroData } from "../AppIntro";

const appIntroData: IAppIntroData[] = [
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

const AppIntroComponentTestCases: ITestCase[] = [
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
  },
  {
    title: "App Intro Screen",
    Component: <AppIntro appIntroData={appIntroData} />
  }
];

export default AppIntroComponentTestCases;
