import React, { Fragment } from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import { Alert } from "react-native";

import ItineraryCard from "../ItineraryCard/ItineraryCard";

import ActivityList from "./Components/ActivityList";
import { IRouteCitiesDetails } from "../../CommonComponents/RouteList/RouteList";
import ItineraryCardCarouselImage from "./Components/ItineraryCardCarouselImage";

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
    activities: [
      "Chain Bridge",
      "Miskolc City Pass",
      "Budapest Retro Design Centre Museum",
      "Sunshine Booze Cruise",
      "Ruin Pub Crawl - Your Keys to the nightlife of Budapest"
    ],
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
    ]
  }
];

interface ICardData {
  images: string[];
  title: string;
  activities: string[];
  itineraryCost: number;
  cityHotelStay: IRouteCitiesDetails[];
  tripType: string;
}

interface ItineraryCardWrapperProps {
  cardData: ICardData[];
}

const ItineraryCardWrapper = ({ cardData }: ItineraryCardWrapperProps) => {
  return (
    <Fragment>
      {cardData.map((dataObj, index) => {
        return (
          <ItineraryCard
            key={index}
            images={dataObj.images}
            tripType={`❤️ ${dataObj.tripType}`}
            action={() => Alert.alert("Click")}
            title={dataObj.title}
            activities={dataObj.activities}
            itineraryCost={dataObj.itineraryCost}
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
    title: "Itinerary Card Activity List",
    Component: (
      <ActivityList
        activities={[
          "3 star accomodations",
          "Airport Transfers",
          "5 activities"
        ]}
      />
    )
  },
  {
    title: "Itinerary Card",
    Component: <ItineraryCardWrapper cardData={data} />
  }
];

export default FeaturedCardTestCases;
