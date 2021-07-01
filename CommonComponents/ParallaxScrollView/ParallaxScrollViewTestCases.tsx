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
        smallText={
          "Discover stunning beaches and the world largest coral reef in Australia"
        }
        titleText={"Australia"}
        backAction={() => Alert.alert("Click Back Arrow")}
      >
        {Array.from({ length: 100 }, (v, i) => i).map((item, index) => (
          <View key={index} style={styles.wrapper}>
            <Text>Dummy Text</Text>
          </View>
        ))}
      </ParallaxScrollView>
    )
  }
];

export default ParallaxScrollViewTestCases;
