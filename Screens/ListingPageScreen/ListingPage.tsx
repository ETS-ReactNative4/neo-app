import React from "react";

import {
  StyleSheet,
  View,
  ViewStyle,
  Alert,
  TouchableOpacity
} from "react-native";

import Icon from "../../CommonComponents/Icon/Icon";
import { CONSTANT_listIcon } from "../../constants/imageAssets";
import {
  CONSTANT_white,
  CONSTANT_firstColor
} from "../../constants/colorPallete";
import ItineraryCard from "../../CommonComponents/ItineraryCard/ItineraryCard";
import ParallaxScrollView from "../../CommonComponents/ParallaxScrollView/ParallaxScrollView";

interface ListingPageProps {
  containerStyle?: ViewStyle;
}

const ListingPage = ({ containerStyle }: ListingPageProps) => {
  return (
    <View style={containerStyle}>
      <ParallaxScrollView
        bannerImage={
          "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg"
        }
        smallText={"18 CUSTOMIZABLE OPTIONS"}
        titleText={"Romantic holidays for you and your better half."}
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

      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Alert.alert("Click filter")}
        >
          <View style={styles.filterIcon}>
            <Icon name={CONSTANT_listIcon} size={20} color={CONSTANT_white} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
