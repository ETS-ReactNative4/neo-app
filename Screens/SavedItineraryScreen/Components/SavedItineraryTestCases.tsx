import React from "react";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import { Alert, View } from "react-native";

import SavedItineraryHeader from "./SavedItineraryHeader";
import SavedItineraryCard from "../../../CommonComponents/SavedItineraryCard/SavedItineraryCard";
import { IRouteCitiesDetails } from "../../../CommonComponents/RouteList/RouteList";

const savedItinerariesData = [
  {
    image: "https://d3lf10b5gahyby.cloudfront.net/city/hiroshima.jpg",
    cities: [
      {
        cityName: "Osaka"
      },
      {
        cityName: "Kyoto"
      },
      {
        cityName: "Tokyo"
      }
    ],
    lastEdited: "EDITED 16 DAYS AGO",
    url: "https://pickyourtrail.com/view/5e424ad6a2a49567b074886d",
    title: "Suhail's Vacation to Japan"
  },
  {
    image: "https://d3lf10b5gahyby.cloudfront.net/city/hiroshima.jpg",
    cities: [
      {
        cityName: "Osaka"
      },
      {
        cityName: "Kyoto"
      },
      {
        cityName: "Tokyo"
      }
    ],
    lastEdited: "EDITED 16 DAYS AGO",
    url: "https://pickyourtrail.com/view/5e424ae189832e7f4ce7f94c",
    title: "Suhail's Vacation to Japan"
  },
  {
    image: "https://d3lf10b5gahyby.cloudfront.net/city/2400xh/male.jpg",
    cities: [
      {
        cityName: "Maldives"
      }
    ],
    lastEdited: "EDITED 17 DAYS AGO",
    url: "https://pickyourtrail.com/view/5e184295a2a4955ccea6a41d",
    title: "Suhail's 4 Nights Vacation to Maldives"
  }
];

interface ISavedItineraries {
  image: string;
  cities: IRouteCitiesDetails[];
  lastEdited: string;
  url: string;
  title: string;
}

interface SavedItineraryWrapperProps {
  savedItineraries: ISavedItineraries[];
}

const SavedItineraryWrapper = ({
  savedItineraries
}: SavedItineraryWrapperProps) => {
  return (
    <View>
      <SavedItineraryHeader
        title={"Saved Itineraries"}
        action={() => Alert.alert("Click back arrow")}
      />

      {savedItineraries.map((item, itemIndex) => {
        return (
          <SavedItineraryCard
            key={itemIndex}
            image={item.image}
            title={item.title}
            lastEdited={item.lastEdited}
            cities={item.cities}
            action={() => Alert.alert(item.url)}
          />
        );
      })}
    </View>
  );
};

const SavedItineraryTestCases: ITestCase[] = [
  {
    title: "Saved Itinerary Header",
    Component: (
      <SavedItineraryHeader
        title={"Saved Itineraries"}
        action={() => Alert.alert("Click back arrow")}
      />
    )
  },
  {
    title: "Saved Itinerary",
    Component: <SavedItineraryWrapper savedItineraries={savedItinerariesData} />
  }
];

export default SavedItineraryTestCases;
