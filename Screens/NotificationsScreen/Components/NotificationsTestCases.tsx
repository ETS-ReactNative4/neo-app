import React from "react";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import NotificationsActionSheet from "./NotificationsActionSheet";
import TripDetails from "./TripDetails";
import { ScrollView, Alert, StyleSheet } from "react-native";
import { IRouteCitiesDetails } from "../../../CommonComponents/RouteList/RouteList";
import { CONSTANT_eighteenthColor } from "../../../constants/colorPallete";

import HeadingText from "./HeadingText";
import SavedItineraryCard from "../../../CommonComponents/SavedItineraryCard/SavedItineraryCard";

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

interface NotificationViewProps {
  savedItineraries: ISavedItineraries[];
}

const NotificationsSavedItineraryView = ({
  savedItineraries
}: NotificationViewProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HeadingText title={"New"} />

      {savedItineraries.map((item, itemIndex) => {
        return (
          <SavedItineraryCard
            key={itemIndex}
            containerStyle={styles.newSavedItineraryBgColor}
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

      <HeadingText title={"Earlier"} />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  newSavedItineraryBgColor: {
    backgroundColor: CONSTANT_eighteenthColor
  }
});

const NotificationsTestCases: ITestCase[] = [
  {
    title: "Notification Action Sheet",
    Component: <NotificationsActionSheet />
  },
  {
    title: "Notification Itinerary Details",
    Component: <TripDetails />
  },
  {
    title: "Notifications Saved Itinerary View",
    Component: (
      <NotificationsSavedItineraryView
        savedItineraries={savedItinerariesData}
      />
    )
  }
];

export default NotificationsTestCases;
