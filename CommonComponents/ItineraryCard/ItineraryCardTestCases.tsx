import React from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import { Alert } from "react-native";

import ItineraryCard from "../ItineraryCard/ItineraryCard";

const FeaturedCardTestCases: ITestCase[] = [
  {
    title: "Itinerary Card",
    Component: (
      <ItineraryCard
        image={{
          uri:
            "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg"
        }}
        fallbackImage={{
          uri:
            "https://pyt-images.imgix.net/images/product_blog/operahouse.jpeg"
        }}
        action={() => Alert.alert("Click")}
      />
    )
  }
];

export default FeaturedCardTestCases;
