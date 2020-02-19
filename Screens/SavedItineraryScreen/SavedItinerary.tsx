import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SmartImageV2 from "../../CommonComponents/SmartImage/SmartImageV2";
import RouteList from "../../CommonComponents/RouteList/RouteList";
import {
  CONSTANT_shade5,
  CONSTANT_shade1,
  CONSTANT_black1
} from "../../constants/colorPallete";
import {
  CONSTANT_primarySemiBold,
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";

const SavedItinerary = () => {
  return (
    <View>
      <View style={styles.savedItineraryCard}>
        <SmartImageV2
          source={{
            uri: "https://pyt-images.imgix.net/images/city/2400xh/rome.jpg"
          }}
          fallbackSource={{
            uri: "https://pyt-images.imgix.net/images/city/2400xh/rome.jpg"
          }}
          style={[styles.savedItineraryImage]}
          resizeMode="cover"
        />

        <View style={styles.rightColumn}>
          <Text style={styles.createdText}>CREATED ON 22 JULY 2019</Text>
          <Text style={styles.titleText}>12 nights to Swizerland</Text>

          <RouteList
            containerStyle={styles.routeListContainerStyle}
            routeListTextStyle={styles.routeListTextStyle}
            cities={[
              { cityName: "Interlaken" },
              { cityName: "Zerma" },
              { cityName: "Lucerne" },
              { cityName: "Lorem Ipsum" },
              { cityName: "Lorem Ipsum" }
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  savedItineraryCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: CONSTANT_shade5
  },
  savedItineraryImage: {
    width: 70,
    height: 70,
    borderRadius: 50
  },
  rightColumn: {
    paddingLeft: 16
  },
  createdText: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 11, 14),
    textTransform: "uppercase",
    marginBottom: 4
  },
  titleText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16, 20),
    marginBottom: 8
  },
  routeListContainerStyle: {
    marginBottom: 0
  },
  routeListTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12, 15),
    marginHorizontal: 6
  }
});

export default SavedItinerary;
