import React, { Fragment } from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import { Alert } from "react-native";

import ItineraryCard from "../ItineraryCard/ItineraryCard";

import { IRouteCitiesDetails } from "../../CommonComponents/RouteList/RouteList";
import ItineraryCardCarouselImage from "./Components/ItineraryCardCarouselImage";
import generateInclusions from "../../Screens/ExploreScreen/services/generateInclusions";
import getPriceWithoutSymbol from "../../Screens/ExploreScreen/services/getPriceWithoutSymbol";

const data: ICardData[] = [
  {
    images: [
      "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg",
      "https://pyt-images.imgix.net/images/product_blog/itinerary-box/bali-small.jpeg",
      "https://pyt-images.imgix.net/images/product_blog/itinerary-box/europe-small.jpeg",
      "https://pyt-images.imgix.net/images/product_blog/seychelles.jpeg",
      "https://pyt-images.imgix.net/images/product_blog/south-africa.jpeg"
    ],
    title: "The 7 night Hungary vacation itinerary for fun lovers",
    itineraryCost: 88832,
    tripType: "Honeymoon",
    cityHotelStay: [
      {
        cityName: "Budapest"
      },
      {
        cityName: "Miskolc"
      },
      {
        cityName: "Pecs"
      },
      {
        cityName: "Budapest"
      }
    ],
    flightsIncluded: true,
    hotelsIncluded: true,
    transferIncluded: true,
    visaIncluded: false,
    visaType: "SCHENGEN",
    hotelStarRating: 3,
    activities: [
      "Jardin des Tuileries",
      "Explore Montmartre",
      "Mundolingua Museum Admission Ticket",
      "Val d'Europe VIP Shopping and Gourmet Break"
    ]
  }
];

interface ICardData {
  images: string[];
  title: string;
  itineraryCost: number;
  cityHotelStay: IRouteCitiesDetails[];
  tripType: string;
  flightsIncluded: boolean;
  hotelsIncluded: boolean;
  hotelStarRating: number;
  visaType: string;
  visaIncluded: boolean;
  transferIncluded: boolean;
  activities: string[];
}

interface ItineraryCardWrapperProps {
  cardData: ICardData[];
}

const ItineraryCardWrapper = ({ cardData }: ItineraryCardWrapperProps) => {
  return (
    <Fragment>
      {cardData.map((dataObj, index) => {
        const amount = getPriceWithoutSymbol(dataObj.itineraryCost);
        const inclusionList = generateInclusions(dataObj);

        return (
          <ItineraryCard
            key={index}
            images={dataObj.images}
            tripType={`❤️ ${dataObj.tripType}`}
            action={() => Alert.alert("Click")}
            title={dataObj.title}
            inclusionList={inclusionList}
            itineraryCost={amount}
            cities={dataObj.cityHotelStay}
          />
        );
      })}
    </Fragment>
  );
};

const FeaturedCardTestCases: ITestCase[] = [
  {
    title: "Itinerary Card Carousel Image",
    Component: (
      <ItineraryCardCarouselImage
        images={[
          "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg",
          "https://pyt-images.imgix.net/images/product_blog/itinerary-box/europe-small.jpeg"
        ]}
        tripType={`❤️ Romance`}
      />
    )
  },
  {
    title: "Itinerary Card",
    Component: <ItineraryCardWrapper cardData={data} />
  }
];

export default FeaturedCardTestCases;
