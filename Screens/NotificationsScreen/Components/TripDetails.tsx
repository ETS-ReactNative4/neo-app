import React from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import ItineraryDetail from "./ItineraryDetail/ItineraryDetail";
import ItineraryTimeline from "./ItineraryTimeline/ItineraryTimeline";

import ParallaxScrollView from "../../../CommonComponents/ParallaxScrollView/ParallaxScrollView";
import Icon from "../../../CommonComponents/Icon/Icon";
import {
  CONSTANT_firstColor,
  CONSTANT_white
} from "../../../constants/colorPallete";
import { CONSTANT_callStartIcon } from "../../../constants/imageAssets";
import BlankSpacer from "../../../CommonComponents/BlankSpacer/BlankSpacer";
import BottomButtonBar from "../../../CommonComponents/BottomButtonBar.js/BottomButtonBar";

const TripDetails = () => {
  return (
    <View style={styles.tripDetailsContainer}>
      <ParallaxScrollView
        bannerImage={
          "https://pyt-images.imgix.net/images/product_blog/itinerary-box/australia-small.jpeg"
        }
        backAction={() => Alert.alert("Click back arrow")}
        smallText={"CREATED ON 12 JULY 2019"}
        titleText={"4 nights to Kuta and Ubud"}
      >
        <View style={styles.detailsContainer}>
          <ItineraryDetail />
          <ItineraryTimeline />
          <BlankSpacer height={76} />
        </View>
      </ParallaxScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Alert.alert("Click phone icon")}
        style={styles.phoneIcon}
      >
        <Icon name={CONSTANT_callStartIcon} size={32} color={CONSTANT_white} />
      </TouchableOpacity>

      <BottomButtonBar
        leftButtonName={"Support"}
        leftButtonAction={() => Alert.alert("Click Support")}
        rightButtonName={"View itinerary"}
        rightButtonAction={() => Alert.alert("View itinerary")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tripDetailsContainer: {
    flex: 1
  },
  detailsContainer: {
    padding: 24
  },
  phoneIcon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 16,
    bottom: 84,
    width: 62,
    height: 62,
    borderRadius: 50,
    backgroundColor: CONSTANT_firstColor
  }
});

export default TripDetails;
