import React, { Fragment } from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import { Alert, StyleSheet, Text } from "react-native";
import { IRouteCitiesDetails } from "../../CommonComponents/RouteList/RouteList";
import SavedItineraryCard from "./SavedItineraryCard";
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
  }
];

interface ISavedItineraries {
  image: string;
  cities: IRouteCitiesDetails[];
  lastEdited: string;
  url: string;
  title: string;
}

interface SavedItineraryCardWrapperProps {
  savedItineraries: ISavedItineraries[];
}

const SavedItineraryCardWrapper = ({
  savedItineraries
}: SavedItineraryCardWrapperProps) => {
  return (
    <Fragment>
      <Text style={styles.textStyle}>Default saved itinerary card</Text>
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

      <Text style={styles.textStyle}>
        Saved Itinerary card with new notification color
      </Text>

      {savedItineraries.map((item, itemIndex) => {
        return (
          <SavedItineraryCard
            key={itemIndex}
            image={item.image}
            isUnread={true}
            title={item.title}
            lastEdited={item.lastEdited}
            cities={item.cities}
            action={() => Alert.alert(item.url)}
          />
        );
      })}

      <Text style={styles.textStyle}>
        Saved Itinerary card with more Options
      </Text>

      {savedItineraries.map((item, itemIndex) => {
        return (
          <SavedItineraryCard
            key={itemIndex}
            image={item.image}
            title={item.title}
            lastEdited={item.lastEdited}
            cities={item.cities}
            action={() => Alert.alert(item.url)}
            moreOptions
            moreOptionsAction={() => Alert.alert("Click more options")}
          />
        );
      })}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    marginVertical: 16
  }
});

const SavedItineraryCardTestCases: ITestCase[] = [
  {
    title: "Saved Itinerary Card",
    Component: (
      <SavedItineraryCardWrapper savedItineraries={savedItinerariesData} />
    )
  }
];

export default SavedItineraryCardTestCases;
