import React from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import ParallaxScrollView from "./ParallaxScrollView";

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
      />
    )
  }
];

export default ParallaxScrollViewTestCases;
