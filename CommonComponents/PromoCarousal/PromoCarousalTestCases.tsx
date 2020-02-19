import React from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import PromoCarousal from "./PromoCarousal";
import PromoCarousalImage from "./Components/PromoCarousalImage";

const data = [
  "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg",
  "https://pyt-images.imgix.net/images/product_blog/itinerary-box/bali-small.jpeg",
  "https://pyt-images.imgix.net/images/product_blog/itinerary-box/europe-small.jpeg"
];

const PromoCarousalTestCases: ITestCase[] = [
  {
    title: "Promo Carousal",
    Component: (
      <PromoCarousalImage
        image={{
          uri:
            "https://pyt-images.imgix.net/images/product_blog/itinerary-box/bali-small.jpeg"
        }}
        fallbackImage={{
          uri:
            "https://pyt-images.imgix.net/images/product_blog/operahouse.jpeg"
        }}
      />
    )
  },
  {
    title: "Multiple Promo Carousal",
    Component: <PromoCarousal images={data} />
  }
];

export default PromoCarousalTestCases;
