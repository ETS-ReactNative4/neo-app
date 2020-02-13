import React from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import { StyleSheet, View, Alert } from "react-native";
import FeaturedCardTypeOne from "./FeaturedCardTypeOne";
import FeaturedCardTypeTwo from "./FeaturedCardTypeTwo";

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 80
  }
});

const FeaturedCardTestCases: ITestCase[] = [
  {
    title: "Featured Card Type One",
    Component: (
      <View style={styles.containerStyle}>
        <FeaturedCardTypeOne
          image={{
            uri:
              "https://pyt-images.imgix.net/images/product_blog/operahouse.jpeg"
          }}
          fallbackImage={{
            uri:
              "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg"
          }}
          blurRadius={50}
          price={"₹45,450"}
          action={() => Alert.alert("Click")}
        />
      </View>
    )
  },
  {
    title: "Featured Card Type Two",
    Component: (
      <View style={styles.containerStyle}>
        <FeaturedCardTypeTwo
          image={{
            uri:
              "https://d3lf10b5gahyby.cloudfront.net/web_app/dawn/testimonials/mobile/harshal_manvatkar.jpg"
          }}
          fallbackImage={{
            uri:
              "https://d3lf10b5gahyby.cloudfront.net/web_app/dawn/testimonials/harshal_manvatkar.jpg"
          }}
          blurRadius={50}
          name={"Harshal Manvatkar"}
          nights={"7 nights"}
          region={"Greece"}
          description={
            "Our honeymoon trip to Greece was awesome! Customisation and real time costing is the biggest advantage of planning your trip Pickyourtrail."
          }
          action={() => Alert.alert("Click Harshal Manvatkar")}
        />
      </View>
    )
  }
];

export default FeaturedCardTestCases;
