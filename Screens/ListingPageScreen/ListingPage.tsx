import React from "react";

import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";

import Icon from "../../CommonComponents/Icon/Icon";
import { CONSTANT_listIcon } from "../../constants/imageAssets";
import {
  CONSTANT_white,
  CONSTANT_firstColor
} from "../../constants/colorPallete";
import ItineraryCard from "../../CommonComponents/ItineraryCard/ItineraryCard";
import ParallaxScrollView from "../../CommonComponents/ParallaxScrollView/ParallaxScrollView";

const ListingPage = () => {
  return (
    <View style={styles.listingPageContainer}>
      <ParallaxScrollView
        bannerImage={
          "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg"
        }
        smallText={"18 CUSTOMIZABLE OPTIONS"}
        titleText={"Romantic holidays for you and your better half."}
        backAction={() => {}}
      >
        <ItineraryCard
          images={[
            "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg",
            "https://pyt-images.imgix.net/images/product_blog/itinerary-box/europe-small.jpeg"
          ]}
          tripType={`❤️ Romance`}
          action={() => Alert.alert("Click Itinerary Card")}
          title={
            "An epic 16 night Europe itinerary to rekindle the wonder in your eyes."
          }
          activities={[
            "3 star accomodations",
            "Airport Transfers",
            "5 activities"
          ]}
          itineraryCost={1002214}
          cities={[
            { cityName: "Interlaken" },
            { cityName: "Zerma" },
            { cityName: "Lucerne" }
          ]}
        />
      </ParallaxScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Alert.alert("Click filter")}
        style={styles.filterIcon}
      >
        <Icon name={CONSTANT_listIcon} size={20} color={CONSTANT_white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listingPageContainer: {
    flex: 1
  },
  filterIcon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 16,
    bottom: 24,
    width: 62,
    height: 62,
    borderRadius: 50,
    backgroundColor: CONSTANT_firstColor
  }
});

export default ListingPage;
