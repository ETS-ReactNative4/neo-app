import React from "react";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import {
  StyleSheet,
  View,
  ViewStyle,
  ScrollView,
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
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";

import ListingPageImage from "../ListingPageScreen/Components/ListingPageImage";

interface ListingPageProps {
  containerStyle?: ViewStyle;
}

const BANNER_WIDTH = responsiveWidth(100);
const BANNER_HEIGHT = ratioCalculator(3, 2, BANNER_WIDTH);

const ListingPage = ({ containerStyle }: ListingPageProps) => {
  return (
    <View style={[styles.promoLandingWrapper, containerStyle]}>
      <ListingPageImage />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentOffset={{ x: 0, y: -BANNER_HEIGHT + 20 }}
        contentInset={{ top: BANNER_HEIGHT - 20 }}
      >
        <View style={styles.itineraryContentWrapper}>
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
        </View>
      </ScrollView>

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
  },
  promoLandingWrapper: {
    flex: 1
  },
  itineraryContentWrapper: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: CONSTANT_white,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 20
  }
});

export default ListingPage;
