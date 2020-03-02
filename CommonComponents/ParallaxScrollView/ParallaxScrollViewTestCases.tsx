import React from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import ParallaxScrollView from "./ParallaxScrollView";
import { Alert, Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    padding: 24
  }
});

const ParallaxScrollViewTestCases: ITestCase[] = [
  {
    title: "Parallax Scroll View",
    Component: (
      <ParallaxScrollView
        bannerImage={
          "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg"
        }
        smallText={"18 CUSTOMIZABLE OPTIONS"}
        titleText={"Romantic holidays for you and your better half."}
        backAction={() => Alert.alert("Click Back Arrow")}
      >
        <View style={styles.wrapper}>
          <Text>Dummy Text</Text>
        </View>
      </ParallaxScrollView>
    )
  }
];

export default ParallaxScrollViewTestCases;
